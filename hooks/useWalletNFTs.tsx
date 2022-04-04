import { web3 } from "@project-serum/anchor"
import { Metadata } from "lib/metadata"
import { useEffect, useState } from "react"

import useMetadataAccounts from "./useMetadataAccounts"

const DEFAULT_CANDY_MACHINES = null

export type NFT = {
  onChain: { metaData: Metadata; tokenAccount: web3.PublicKey }
  offChain: {
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
      creators: Array<string>
    }
    seller_fee_basis_points: number
  }
}

/** Returns all walletNFTs a wallet is holding based on candy machine addresses */
const useWalletNFTs = (
  candyMachineAddresses: string[] | null = DEFAULT_CANDY_MACHINES
) => {
  const { metadataAccounts, fetchMetadataAccounts } = useMetadataAccounts()
  const [walletNFTs, setWalletNFTs] = useState<NFT[] | null>(null)

  const fetchNFTs = async (
    initialMetadata?: {
      metaData: Metadata
      tokenAccount: web3.PublicKey
    }[]
  ) => {
    console.log("[Wallet Hook] Fetching nfts...")

    const metadataAccs = initialMetadata ? initialMetadata : metadataAccounts
    /**
     * Filter accounts which one of the creators is a candy machine address
     * Otherwise, the NFT doesn't belong to the desired collection
     */
    const filteredMetadataAccounts = candyMachineAddresses
      ? metadataAccs?.filter((metadataAccount) => {
          const { metaData } = metadataAccount
          const address: string[] = candyMachineAddresses

          const creator = metaData.data?.creators?.find(
            (creator) => address.indexOf(creator.address) !== -1
          )

          /** Make sure it's verified to prevent exploiters */
          if (creator && creator.verified) {
            return metadataAccount
          }

          return false
        })
      : metadataAccs

    if (!filteredMetadataAccounts || !filteredMetadataAccounts.length) return []

    /**
     * Fetch JSON file for each metadata:
     *
     *
     * At this point, we have the token info and metadata from on-chain request.
     * But we also want to fetch external JSON metadata from the uri.
     */
    const metadataPromises = filteredMetadataAccounts.map(async (metadata) => {
      const {
        metaData: {
          data: { uri },
        },
      } = metadata

      try {
        const content = await (await fetch(uri)).json()

        return {
          onChain: metadata,
          offChain: content,
        }
      } catch (e) {
        return null
      }
    })

    const metadatas = await Promise.all(metadataPromises)

    const filtered = metadatas.filter(
      (
        value
      ): value is {
        onChain: { metaData: Metadata; tokenAccount: web3.PublicKey }
        offChain: any
      } => value !== null
    )

    return filtered
  }

  const refetchNFTs = async () => {
    console.log("[Wallet Hook] Refetching NFTs...")
    const metadatas = await fetchMetadataAccounts()
    if (metadatas) {
      const NFTs = await fetchNFTs(metadatas)
      setWalletNFTs(NFTs)
    }
  }

  useEffect(() => {
    if (metadataAccounts) {
      ;(async () => {
        const NFTs = await fetchNFTs()

        setWalletNFTs(NFTs)
      })()
    }
  }, [metadataAccounts])

  return { walletNFTs, refetchNFTs }
}

export default useWalletNFTs
