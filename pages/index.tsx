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
    totalStakedCount,
    testStakedCount,
    selectedWalletItems,
    isLocked,
    availableA,
    availableB,
    accruedReward,
    feedbackStatus,
    handleStakeButtonClick,
    handleUnstakeButtonClick,
    handleClaimButtonClick,
    handleWalletItemClick,
    handleMoveToVaultButtonClick,
    handleFlashDepositButtonClick,
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
        {/**<Heading><b>{(totalStakedCount?.gemsStaked.toNumber()/6001).toFixed(1)}</b>% Staked: <b>{totalStakedCount?.gemsStaked.toNumber()}</b>/6001</Heading>*/}
        <Text></Text>

        {!publicKey ? (
          /** Render nothing if there is no wallet connected. */
          <Text
            sx={{
              textAlign: "center",
              margin: "3.2rem 0",
              fontSize: "2rem",
            }}
          >
            Connect your wallet.
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
            Create staking account
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
                <Text
                sx={{
                  textAlign: "center",
                  fontSize: "2.5rem",
                }}
              > 
                {/**Vault state: <b>{isLocked ? "locked" : "unlocked"}</b>*/}
                <b>{(testStakedCount/6001).toFixed(2)}% Staked {testStakedCount}/6001</b>
                <br />
              </Text>
              <Text
                sx={{
                  textAlign: "center",
                  fontSize: "2rem",
                }}
              > 
                {/**Vault state: <b>{isLocked ? "locked" : "unlocked"}</b>*/}
                <b></b>
                <br />
              </Text>
                  <Flex
                    sx={{
                      gap: ".4rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      sx={{
                        maxHeight: "4rem",
                      }}
                      src="images/gemtransparent.gif"
                    />
                    <Text
                    sx={{
                      textAlign: "center",
                      fontSize: "2rem",
                    }}
                    >
                      <b>STAKED:&nbsp;
                      {farmerAccount?.gemsStaked.toNumber()}</b>
                    </Text>
                  </Flex>
                  <Text
                    sx={{
                      textAlign: "center",
                      fontSize: "2rem",
                    }}
                  >
                    {/**{(availableB / 1000000000).toFixed(9)} */}
                    <b>{(accruedReward/ 1000000000).toFixed(3)} DAZE earned</b>
                    <br />
                  </Text>
                  <Text
                    sx={{
                      textAlign: "center",
                      fontSize: "2rem",
                    }}
                  > 
                    {/**Vault state: <b>{isLocked ? "locked" : "unlocked"}</b>*/}
                    {/**Vault: <b>{isLocked ? "locked" : "unlocked"}</b>*/}
                    <br />
                  </Text>
                  <Text
                    sx={{
                      textAlign: "center",
                      fontSize: "2rem",
                    }}
                  >
                    {/**Status: <b>{farmerStatus}</b>*/}
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
                    Stake
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
                    disabled={!Number(availableB)}
                  >
                    Claim{/** {" "}
                    <img
                      sx={{
                        margin: "0 .4rem 0 .8rem",
                        maxHeight: "2.4rem",
                      }}
                      src="images/icon-list-item.png"
                    />
                    {availableA ? (
                      <b>{(availableA / 1000000000).toFixed(2)}</b>
                    ) : (
                      0
                    )}*/}
                  </Button>
                  {/**
                  <Button onClick={handleRefreshRewardsButtonClick}>
                    Refresh
                  </Button>
                  */}
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
                fontSize: "2rem",
              }}
            >
              <TabList>
                <Tab>Wallet</Tab>
                <Tab>Vault</Tab>
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
                                handleWalletItemClick
                               /*!isLocked ? handleWalletItemClick : () => true*/
                              }
                              sx={{
                                maxWidth: "16rem",
                                "> img": {
                                  border: "3px solid transparent",
                                  borderColor: isSelected
                                    ? "rgb(0 0 0 / 55%)"
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
                            fontSize: "2rem",
                          }}
                          variant="small"
                        >
                          Select Apes to deposit.
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
                      {walletNFTs.length && isLocked ? (
                        <Text
                          sx={{
                            margin: "3.2rem 0 .8rem 0",
                            fontSize: "2rem",
                          }}
                          variant="small"
                        >
                          Select Apes to flash deposit.
                        </Text>
                      ) : null}
                      <Text>
                        {/* Selected:{" "}
                    {selectedWalletItems && selectedWalletItems.length
                      ? selectedWalletItems
                          .map((NFT) => NFT.onchainMetadata.metaData.data.name)
                          .join(", ")
                      : null} */}
                        {selectedWalletItems?.length && isLocked ? (
                          <Button onClick={handleFlashDepositButtonClick}>
                            Flash deposit selected
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
                        fontSize: "2rem",
                      }}
                    >
                      <Text>There are no Apes in your wallet.</Text>
                    </Flex>
                  )
                ) : /** No walletNFTs and public key, means it is loading */
                publicKey ? (
                  <Flex
                    sx={{
                      justifyContent: "center",
                      alignSelf: "stretch",
                      fontSize: "2rem",
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
                                        ? "rgb(0 0 0 / 55%)"
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
                                fontSize: "2rem",
                              }}
                              variant="small"
                            >
                              Select Apes to withdraw them to your wallet.
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
                          <Text>You have no Apes staked.</Text>
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
