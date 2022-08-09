/** @jsxImportSource theme-ui */
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button, Flex, Text } from "theme-ui"
import { SettingsIcon } from "../icons"

const WalletManager = () => {
  const wallet = useWallet()

  return (
    <Flex
      sx={{
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        ".wallet-adapter-button:not([disabled]):hover": {
          backgroundColor: "#c7748e"
        },
        ".wallet-adapter-dropdown": {
          display: "flex",
          justifyContent: "center"
        },
        ".wallet-adapter-dropdown-list": {
          backgroundColor: "#c7748e"
        },
        ".wallet-adapter-dropdown-list-item:not([disabled]):hover": {
          backgroundColor: "#836594"
      }
      }}
    >
      <Flex
        sx={{
          justifyContent: "center"
        }}
      >
        {wallet?.publicKey ? (
          <WalletMultiButton
            sx={{
              backgroundColor: "unset",
              transition: "all .3s linear",
              color: "heading",
              lineHeight: "body",
              fontSize: "1.4rem",
              padding: "0",
              height: "unset",
              alignSelf: "flex-end",

              "&:hover": {
                background: "unset",
                backgroundImage: "unset!important",
                color: "primary",
                cursor: "pointer"
              }
            }}
            startIcon={null as any}
          >
            <SettingsIcon
              sx={{
                transition: "all .125s linear",
                "&:hover": {
                  stroke: "primary"
                }
              }}
            />
          </WalletMultiButton>
        ) : (
          <WalletMultiButton
            startIcon={null as any}
            sx={{
              backgroundColor: "unset",
              color: "heading",
              lineHeight: "body",
              fontSize: "1.4rem",
              padding: ".8rem 1.6rem",
              height: "unset",
              alignSelf: "flex-end",
              display: "flex",
              background: (theme) => theme.colors?.primaryGradient,
              border: ".2rem solid transparent",
              transition: "all .125s linear",
              alignItems: "center",
              borderColor: "primary",
              opacity: 1,
              fontWeight: 500,

              "&:not(:disabled):hover": {
                bg: "background",
                cursor: "pointer",
                borderWidth: ".2rem",
                opacity: 0.7
              },

              "&:disabled": {
                bg: "background",
                cursor: "not-allowed",
                opacity: 0.3
              }
            }}
          ></WalletMultiButton>
        )}
      </Flex>
    </Flex>
  )
}

export default WalletManager