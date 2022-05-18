import { findFarmerPDA } from "@gemworks/gem-farm-ts"
import { SignerWalletAdapter } from "@solana/wallet-adapter-base"
import { useEffect, useState, useCallback } from "react"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import { BN } from "@project-serum/anchor"
import { PublicKey } from "@solana/web3.js"

import useWalletNFTs, { NFT } from "hooks/useWalletNFTs"
import { initGemBank } from "lib/gem-farm/common/gem-bank"
import { GemFarm, initGemFarm } from "lib/gem-farm/common/gem-farm"
import { getNFTMetadataForMany } from "utils/nfts"
import { GemBank } from "lib/gem-farm/common/gem-bank"

const useGemFarmStaking = (farmId: string) => {
  const { connection } = useConnection()
  const wallet = useAnchorWallet() as SignerWalletAdapter
  const { walletNFTs } = useWalletNFTs()

  const [farmAccount, setFarmAccount] = useState<any>(null) // @TODO add type to farmAccount
  const [farmerAccount, setFarmerAccount] = useState<any>(null) // @TODO add type to farmerAccount
  const [totalStakedCount, setTotalStakedCount] = useState<any>(null)
  const [farmerStatus, setFarmerStatus] = useState<any>(null)
  const [farmerVaultAccount, setFarmerVaultAccount] = useState<any>(null)
  const [farmerVaultNFTs, setFarmerVaultNFTs] = useState<NFT[] | null>(null)
  const [selectedWalletItems, setSelectedWalletItems] = useState<NFT[]>([])
  const [selectedVaultItems, setSelectedVaultItems] = useState<NFT[]>([])
  const [gemBankClient, setGemBankClient] = useState<GemBank | null>(null)
  const [gemFarmClient, setGemFarmClient] = useState<GemFarm | null>(null)
  const [feedbackStatus, setFeedbackStatus] = useState("")

  const fetchFarmerAccount = async (
    farmClient: GemFarm,
    bankClient: GemBank
  ) => {
    if (connection && wallet?.publicKey && farmClient && bankClient) {
      console.log("[Staking Hook] Fetching farmer account...")
      try {
        if (!farmId) throw "No farm ID has been configured."

        setFeedbackStatus("Fetching farmer account...")
        const [farmerPDA] = await findFarmerPDA(
          new PublicKey(farmId!),
          wallet?.publicKey
        )

        const farmerAcc = await farmClient.fetchFarmerAcc(farmerPDA)
        setFarmerAccount(farmerAcc)

        const vaultAcc = await bankClient.fetchVaultAcc(farmerAcc.vault)
        setFarmerVaultAccount(vaultAcc)

        const farmerState = farmClient.parseFarmerState(farmerAcc)
        setFarmerStatus(farmerState)

        setFeedbackStatus("")
      } catch (e) {
        /**
         * Couldn't fetch farmer; so set it as an empty object
         * For the user to init their farmer account
         */
        console.error(e)
        setFarmerAccount({})
      }
    }
  }

  /**
   * Init clients, farm and farmer account on mount
   */
  useEffect(() => {
    ;(async () => {
      if (connection && wallet?.publicKey) {
        try {
          if (!farmId) throw "No farm ID has been configured."

          console.log("[Staking Hook] Initializing clients...")
          const bankClient = await initGemBank(connection, wallet)
          setGemBankClient(bankClient)

          const farmClient = await initGemFarm(connection, wallet)
          setGemFarmClient(farmClient)

          const farmAcc = await farmClient.fetchFarmAcc(new PublicKey(farmId))
          setFarmAccount(farmAcc as any)
          console.log(farmAcc)
          setTotalStakedCount(farmAcc as any)
          await fetchFarmerAccount(farmClient, bankClient)
        } catch (e) {
          setTotalStakedCount(null)
          setFarmAccount(null)
          setFarmerAccount(null)
          console.error(e)
        }
      }
    })()
  }, [connection, wallet?.publicKey, farmId])

  /**
   * Set Farmer Vault NFTs state
   *
   * Depends on @var farmerAccount
   */
  useEffect(() => {
    const fetchVaultNFTs = async () => {
      if (
        gemBankClient &&
        farmerAccount &&
        farmerAccount?.identity &&
        wallet?.publicKey
      ) {
        try {
          console.log("[Staking Hook] Fetching farmer vault...")

          /**
           * Fetch GDR (Gem Deposit Receipts) from the farmer vault
           */
          const foundGDRs = await gemBankClient.fetchAllGdrPDAs(
            farmerAccount.vault
          )

          const mints = foundGDRs.map((gdr: any) => {
            return { mint: gdr.account.gemMint }
          })

          /** Fetch metadatas for Vault NFTs */
          const currentVaultNFTs = await getNFTMetadataForMany(
            mints,
            connection
          )

          /** Transform to use on the UI */

          console.log(currentVaultNFTs)
          /**
           * Set Vault NFTs state
           */
          setFarmerVaultNFTs(currentVaultNFTs)
        } catch (e) {
          console.log(e)
        }
      }
    }

    if (gemBankClient && farmerAccount && wallet?.publicKey) {
      fetchVaultNFTs()
    }
  }, [wallet?.publicKey, gemBankClient, farmerAccount, farmId])

  /**
   * Handles selected items.
   */
  const handleWalletItemClick = (item: NFT) => {
    setSelectedWalletItems((prev) => {
      const exists = prev.find(
        (NFT) => NFT.onchainMetadata.mint === item.onchainMetadata.mint
      )

      /** Remove if exists */
      if (exists) {
        return prev.filter(
          (NFT) => NFT.onchainMetadata.mint !== item.onchainMetadata.mint
        )
      }

      return prev?.concat(item)
    })
  }

  const handleVaultItemClick = (item: NFT) => {
    setSelectedVaultItems((prev) => {
      const exists = prev.find(
        (NFT) => NFT.onchainMetadata.mint === item.onchainMetadata.mint
      )

      /** Remove if exists */
      if (exists) {
        return prev.filter(
          (NFT) => NFT.onchainMetadata.mint !== item.onchainMetadata.mint
        )
      }

      return prev?.concat(item)
    })
  }

  const depositGem = async (
    mint: PublicKey,
    creator: PublicKey,
    source: PublicKey
  ) => {
    if (!gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    const { txSig } = await gemBankClient.depositGemWallet(
      new PublicKey(farmAccount.bank),
      new PublicKey(farmerAccount.vault),
      new BN(1),
      mint,
      source,
      creator
    )

    await connection.confirmTransaction(txSig)
    console.log("[Staking Hook] deposit done", txSig)

    return txSig
  }

  const withdrawGem = async (mint: PublicKey) => {
    if (!gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    const { txSig } = await gemBankClient.withdrawGemWallet(
      farmAccount.bank,
      farmerAccount.vault,
      new BN(1),
      mint
    )

    await connection.confirmTransaction(txSig)
    console.log("[Staking Hook] withdrawal done", txSig)

    return txSig
  }

  const handleMoveToVaultButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    setFeedbackStatus("Depositing Apes to the vault...")
    for (const nft of selectedWalletItems) {
      const creator = new PublicKey(
        nft.onchainMetadata.data.creators?.[0].address || ""
      )

      await depositGem(
        new PublicKey(nft.onchainMetadata.mint),
        creator,
        nft.pubkey
      )
    }

    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")

    setSelectedVaultItems([])
    setSelectedWalletItems([])
    window.location.reload();
  }

  const handleMoveToWalletButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    setFeedbackStatus("Withdrawing Gems...")
    for (const nft of selectedVaultItems) {
      await withdrawGem(new PublicKey(nft.onchainMetadata.mint))
    }

    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")

    setSelectedVaultItems([])
    setSelectedWalletItems([])
    window.location.reload(); //temp until another solution to refreshNFT loads
  }

  const handleStakeButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    setFeedbackStatus("Staking...")
    const { txSig } = await gemFarmClient.stakeWallet(new PublicKey(farmId!))

    await connection.confirmTransaction(txSig)

    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")
    // selectedNFTs.value = [];
  }

  const handleUnstakeButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    setFeedbackStatus("Unstaking wallet...")
    const { txSig } = await gemFarmClient.unstakeWallet(new PublicKey(farmId!))

    await connection.confirmTransaction(txSig)

    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")
    // selectedNFTs.value = [];

    setFeedbackStatus("Ending Cooldown...")
    await gemFarmClient.unstakeWallet(new PublicKey(farmId!))

  

    await fetchFarmerAccount(gemFarmClient, gemBankClient)



  }

  const handleClaimButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    setFeedbackStatus("Claiming rewards...")
    const { txSig } = await gemFarmClient.claimWallet(
      new PublicKey(farmId),
      new PublicKey(farmAccount.rewardA.rewardMint!),
      new PublicKey(farmAccount.rewardB.rewardMint!)
    )

    await connection.confirmTransaction(txSig)

    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")
    // await fetchFarmer();
  }

  const handleInitStakingButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient)
      throw new Error("No Gem Bank client has been initialized.")

    setFeedbackStatus("Initializing farmer...")
    const { txSig } = await gemFarmClient.initFarmerWallet(
      new PublicKey(farmId)
    )

    await connection.confirmTransaction(txSig)
    // await fetchFarmer();
    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")
  }

  const handleRefreshRewardsButtonClick = async () => {
    if (!gemFarmClient || !gemBankClient || !farmerAccount.identity) return true

    console.log("[Staking Hook] Refreshing farmer...")
    setFeedbackStatus("Refreshing rewards...")
    const { txSig } = await gemFarmClient.refreshFarmerWallet(
      new PublicKey(farmId),
      farmerAccount.identity
    )

    await connection.confirmTransaction(txSig)

    await fetchFarmerAccount(gemFarmClient, gemBankClient)
    // await refetchNFTs()

    setFeedbackStatus("")

    return { walletNFTs }
  }

  const isLocked = farmerVaultAccount?.locked

  const availableA = farmerAccount?.rewardA
    ? farmerAccount.rewardA.accruedReward
        .sub(farmerAccount.rewardA.paidOutReward)
        .toString()
    : null

  return {
    walletNFTs,
    farmerAccount,
    farmerVaultAccount,
    farmerStatus,
    totalStakedCount,
    selectedWalletItems,
    isLocked,
    availableA,
    feedbackStatus,
    handleStakeButtonClick,
    handleUnstakeButtonClick,
    handleClaimButtonClick,
    handleWalletItemClick,
    handleMoveToVaultButtonClick,
    handleInitStakingButtonClick,
    farmerVaultNFTs,
    selectedVaultItems,
    handleMoveToWalletButtonClick,
    handleVaultItemClick,
    handleRefreshRewardsButtonClick,
  }
}

export default useGemFarmStaking
