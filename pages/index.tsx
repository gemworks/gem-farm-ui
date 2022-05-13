/** @jsxImportSource theme-ui */
import { Flex, Text, Heading, Spinner, Button, Container } from "theme-ui"

import CollectionItem from "@/components/CollectionItem/CollectionItem"
import useGemFarmStaking from "hooks/useGemFarmStaking"
import { useWallet } from "@solana/wallet-adapter-react"
// import { LoadingIcon } from "@/components/icons/LoadingIcon"

import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Header from "@/components/Header/Header"
import { LoadingIcon } from "@/components/icons/LoadingIcon"
import { useState } from "react"

const StakePage = () => {
  const [farmId, setFarmId] = useState(process.env.NEXT_PUBLIC_GEMFARM_ID || "")

  const {
    walletNFTs,
    farmerAccount,
    farmerVaultAccount,
    farmerStatus,
    selectedWalletItems,
    isLocked,
    availableA,
    feedbackStatus,
    handleStakeButtonClick,
    handleUnstakeButtonClick,
    handleClaimButtonClick,
    handleWalletItemClick,
    handleMoveToVaultButtonClick,
    farmerVaultNFTs,
    selectedVaultItems,
    handleMoveToWalletButtonClick,
    handleVaultItemClick,
    handleInitStakingButtonClick,
    handleRefreshRewardsButtonClick,
  } = useGemFarmStaking(farmId)

  const { publicKey } = useWallet()

  return (
    <Container>
      <Header farmId={farmId} setFarmId={setFarmId} />

      <Flex
        sx={{
          flexDirection: "column",
          marginTop: "3.2rem",
          alignItems: "center",
          padding: "0 1.6rem",
        }}
      >
        <Heading>Your staking account</Heading>
        <Text>Below you can stake, unstake and collect rewards.</Text>
        <Text>1. Deposit Tojis from Your Wallet to The Factory</Text>
        <Text>2. /work to Stake your Tojis</Text>
        <Text>3. Come back to claim your $Ijot</Text>
        <Text>Refresh the page if things are not updating</Text>
        <Text>Unstake and End cooldown to move Tojis back to your wallet when done</Text>

        {!publicKey ? (
          /** Render nothing if there is no wallet connected. */
          <Text
            sx={{
              textAlign: "center",
              margin: "3.2rem 0",
            }}
          >
            Connect your wallet first.
          </Text>
        ) : !farmerAccount ? (
          // <LoadingIcon
          //   size={"3.2rem"}
          //   sx={{
          //     margin: "3.2rem 0"
          //   }}
          // />
          <Text mt="1.6rem">Farm ID is not configured.</Text>
        ) : /** If there is farmerAccount variable, but no address, it means account isn't initialized */
        farmerAccount && !farmerAccount?.identity ? (
          <Button
            sx={{
              margin: "3.2rem 0",
            }}
            onClick={handleInitStakingButtonClick}
          >
            Init staking account
          </Button>
        ) : (
          <>
            {/** Render everything, since there is wallet and farmer account */}
            {/** Farmer account info section */}
            {farmerAccount?.identity ? (
              <>
                <Flex
                  sx={{
                    flexDirection: "column",
                    margin: "1.6rem 0",
                  }}
                >
                  <Flex
                    sx={{
                      gap: ".4rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      sx={{
                        maxHeight: "2.4rem",
                      }}
                      src="images/grey.png"
                    />
                    <Text>
                      Tojis staked:&nbsp;
                      {farmerAccount?.gemsStaked.toNumber()}
                    </Text>
                  </Flex>
                  <Text
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Factory state: <b>{isLocked ? "locked" : "unlocked"}</b>
                    <br />
                  </Text>
                  <Text
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    Account status: <b>{farmerStatus}</b>
                    <br />
                  </Text>
                </Flex>

                <Flex
                  sx={{
                    gap: "1.6rem",
                    margin: "1.6rem 0",
                    flexWrap: "wrap",
                    alignItems: "center",
                    alignSelf: "stretch",
                    justifyContent: "center",

                    "@media (min-width: 768px": {
                      flexDirection: "row",
                    },
                  }}
                >
                  <Button
                    onClick={handleStakeButtonClick}
                    disabled={
                      !(farmerStatus === "unstaked" && farmerVaultNFTs?.length)
                    }
                  >
                    /work
                  </Button>
                  <Button
                    onClick={handleUnstakeButtonClick}
                    disabled={
                      !(
                        farmerStatus === "staked" ||
                        farmerStatus === "pendingCooldown"
                      )
                    }
                  >
                    {farmerStatus === "pendingCooldown"
                      ? "End cooldown"
                      : "Unstake"}
                  </Button>
                  <Button
                    onClick={handleClaimButtonClick}
                    disabled={!Number(availableA)}
                  >
                    Claim{" "}
                    <img
                      sx={{
                        margin: "0 .4rem 0 .8rem",
                        maxHeight: "2.4rem",
                      }}
                      src="images/ijot.png"
                    />
                    {availableA ? (
                      <b>{(availableA / 1).toFixed(2)}</b>
                    ) : (
                      0
                    )}
                  </Button>
                  <Button onClick={handleRefreshRewardsButtonClick}>
                    Refresh Balance
                  </Button>
                </Flex>
                <Flex
                  sx={{
                    alignItems: "center",
                    gap: ".8rem",
                    margin: ".8rem 0",
                  }}
                >
                  {feedbackStatus ? (
                    <>
                      <LoadingIcon size="1.6rem" />
                      {"  "} <Text variant="small">{feedbackStatus}</Text>
                    </>
                  ) : (
                    ""
                  )}
                  &nbsp;
                </Flex>
              </>
            ) : null}

            <Tabs
              sx={{
                margin: "3.2rem 0",
                alignSelf: "stretch",
                minHeight: "48rem",
              }}
            >
              <TabList>
                <Tab>Your wallet</Tab>
                <Tab>The Factory</Tab>
              </TabList>

              <TabPanel>
                {walletNFTs ? (
                  walletNFTs.length ? (
                    <Flex
                      sx={{
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            walletNFTs.length > 1 ? "1fr 1fr" : "1fr",
                          gap: "1.6rem",
                          alignItems: "center",

                          "@media (min-width: 768px)": {
                            gridTemplateColumns:
                              walletNFTs.length > 9
                                ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                : walletNFTs.length > 4
                                ? "1fr 1fr 1fr 1fr 1fr"
                                : walletNFTs.map(() => "1fr").join(" "),
                          },
                        }}
                      >
                        {walletNFTs.map((item) => {
                          const isSelected = selectedWalletItems.find(
                            (NFT) =>
                              NFT.onchainMetadata.mint ===
                              item.onchainMetadata.mint
                          )

                          return (
                            <CollectionItem
                              key={item.onchainMetadata.mint}
                              item={item}
                              onClick={
                                !isLocked ? handleWalletItemClick : () => true
                              }
                              sx={{
                                maxWidth: "16rem",
                                "> img": {
                                  border: "3px solid transparent",
                                  borderColor: isSelected
                                    ? "primary"
                                    : "transparent",
                                },
                              }}
                            />
                          )
                        })}
                      </div>
                      {walletNFTs.length && !isLocked ? (
                        <Text
                          sx={{
                            margin: "3.2rem 0 .8rem 0",
                          }}
                          variant="small"
                        >
                          Select NFTs to move them to your Vault.
                        </Text>
                      ) : null}
                      <Text>
                        {/* Selected:{" "}
                    {selectedWalletItems && selectedWalletItems.length
                      ? selectedWalletItems
                          .map((NFT) => NFT.onchainMetadata.metaData.data.name)
                          .join(", ")
                      : null} */}
                        {selectedWalletItems?.length && !isLocked ? (
                          <Button onClick={handleMoveToVaultButtonClick}>
                            Deposit selected
                          </Button>
                        ) : null}
                      </Text>
                    </Flex>
                  ) : (
                    /** walletNFTs fetched but array is empty, means current wallet has no NFT. */
                    <Flex
                      sx={{
                        justifyContent: "center",
                        alignSelf: "stretch",
                      }}
                    >
                      <Text>There are no NFTs on your wallet.</Text>
                    </Flex>
                  )
                ) : /** No walletNFTs and public key, means it is loading */
                publicKey ? (
                  <Flex
                    sx={{
                      justifyContent: "center",
                      alignSelf: "stretch",
                    }}
                  >
                    <Spinner variant="styles.spinnerLarge" />
                  </Flex>
                ) : null}
              </TabPanel>
              <TabPanel>
                {farmerVaultAccount ? (
                  <>
                    {/** Vault UI section */}
                    {/* <ThemeHeading
                  variant="heading3"
                  sx={{
                    marginTop: "3.2rem",
                    textAlign: "center"
                  }}
                >
                  Your Vault
                </ThemeHeading> */}

                    {farmerVaultNFTs ? (
                      farmerVaultNFTs.length ? (
                        <Flex
                          sx={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignSelf: "stretch",
                            alignItems: "center",
                          }}
                        >
                          <div
                            sx={{
                              display: "grid",
                              gridTemplateColumns:
                                farmerVaultNFTs.length > 1 ? "1fr 1fr" : "1fr",
                              gap: "1.6rem",

                              "@media (min-width: 768px)": {
                                gridTemplateColumns:
                                  farmerVaultNFTs.length > 9
                                    ? "1fr 1fr 1fr 1fr 1fr 1fr 1fr"
                                    : farmerVaultNFTs.length > 4
                                    ? "1fr 1fr 1fr 1fr 1fr"
                                    : farmerVaultNFTs
                                        .map(() => "1fr")
                                        .join(" "),
                              },
                            }}
                          >
                            {farmerVaultNFTs.map((item) => {
                              const isSelected = selectedVaultItems.find(
                                (NFT) =>
                                  NFT.onchainMetadata.mint ===
                                  item.onchainMetadata.mint
                              )

                              return (
                                <CollectionItem
                                  key={item.onchainMetadata.mint}
                                  item={item}
                                  onClick={
                                    !isLocked
                                      ? handleVaultItemClick
                                      : () => true
                                  }
                                  sx={{
                                    maxWidth: "16rem",
                                    "> img": {
                                      border: "3px solid transparent",
                                      borderColor: isSelected
                                        ? "primary"
                                        : "transparent",
                                    },
                                  }}
                                />
                              )
                            })}
                          </div>
                          {farmerVaultNFTs.length && !isLocked ? (
                            <Text
                              sx={{
                                margin: "3.2rem 0 .8rem 0",
                              }}
                              variant="small"
                            >
                              Select NFTs to withdraw them to your wallet.
                            </Text>
                          ) : null}

                          {selectedVaultItems && selectedVaultItems.length ? (
                            <>
                              {/* Selected:{" "}
                          {selectedVaultItems
                            .map((NFT) => NFT.onchainMetadata.metaData.data.name)
                            .join(", ")} */}
                              {!isLocked ? (
                                <Button onClick={handleMoveToWalletButtonClick}>
                                  Withdraw selected
                                </Button>
                              ) : null}
                            </>
                          ) : null}
                        </Flex>
                      ) : (
                        /** vaultNFTs fetched but array is empty, means current wallet has no NFT. */
                        <Flex
                          sx={{
                            justifyContent: "center",
                            alignSelf: "stretch",
                          }}
                        >
                          <Text>There are no NFTs on your vault.</Text>
                        </Flex>
                      )
                    ) : /** No vaultNFTs and public key, means it is loading */
                    publicKey ? (
                      <Flex
                        sx={{
                          justifyContent: "center",
                          alignSelf: "stretch",
                        }}
                      >
                        <Spinner variant="styles.spinnerLarge" />
                      </Flex>
                    ) : null}
                  </>
                ) : null}
              </TabPanel>
            </Tabs>
          </>
        )}
      </Flex>
    </Container>
  )
}

export default StakePage
