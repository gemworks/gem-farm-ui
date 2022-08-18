import { PublicKey } from "@solana/web3.js"
import { programs } from "@metaplex/js"
import { useCallback, useEffect, useState } from "react"
import { getNFTsByOwner } from "utils/nfts"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"

export type NFT = {
  pubkey?: PublicKey
  mint: PublicKey
  onchainMetadata: programs.metadata.MetadataData
  externalMetadata: {
    attributes: Array<any>
    collection: any
    description: string
    edition: number
    external_url: string
    image: string
    name: string
    properties: {
      files: Array<string>
      category: string
      creators: Array<{
        pubKey: string
        address: string
      }>
    }
    seller_fee_basis_points: number
  }
}

const useWalletNFTs = (
  /** Array of Public Keys to filter the NFTs by creators. */
  creators: string[] = null
) => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [walletNFTs, setWalletNFTs] = useState<Array<NFT> | null>(null)

  const fetchNFTs = useCallback(async () => {
    const NFTs = await getNFTsByOwner(publicKey, connection)

    const filtered = creators
      ? NFTs.filter((NFT) => {
          const obj = NFT.onchainMetadata?.data?.creators?.find((value) => {
            return creators.indexOf(value.address) !== -1
          })

          return obj
        })
      : NFTs

    setWalletNFTs(filtered)
  }, [connection, publicKey])

  useEffect(() => {
    if (publicKey) {
      fetchNFTs()
    }
  }, [publicKey])

  return { walletNFTs, fetchNFTs }
}

export default useWalletNFTs
