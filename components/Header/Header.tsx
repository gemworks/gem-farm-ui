/** @jsxImportSource theme-ui */
import Link from "next/link"
import { Button, Container, Flex, Text } from "@theme-ui/components"

import WalletManager from "@/components/WalletManager/WalletManager"
import { useState } from "react"
import { CloseIcon, MenuIcon } from "../icons"

const Header = () => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)

  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 9,
        background: (theme) => theme.colors?.backgroundGradient,
        borderBottom: "1px solid",
        borderColor: "background2",
      }}
    >
      <Container>
        <Flex
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          p=".8rem"
        >
          <Link href="/" passHref>
            <Flex as="a" sx={{ alignItems: "center", flexDirection: "column" }}>
              <Flex sx={{ alignItems: "center" }}>
                <Text as="h1" variant="headingSpecial" ml=".4rem">
                  GEM
                </Text>

                <img
                  sx={{
                    maxHeight: "4.8rem",
                  }}
                  src="/images/gemtransparent.gif"
                  alt="Gemworks"
                />

                <Text as="h1" variant="headingSpecial" ml=".4rem">
                  FARM
                </Text>
              </Flex>
              {/* <Text
                sx={{
                  display: "block",
                }}
                variant="small"
              >
                by Gemworks
              </Text> */}
            </Flex>
          </Link>
          <Text
            variant="small"
            sx={{
              marginRight: "auto",
            }}
          >
            &nbsp;&nbsp;&nbsp;&#8226;&nbsp;
            {process.env.NEXT_PUBLIC_CONNECTION_NETWORK}
          </Text>
          <Flex
            as="nav"
            sx={{
              gap: "1.6rem",
              display: "none",

              /** Mobile styles when the menu is active */
              ...(isMobileMenuActive && {
                display: "flex",
                position: "fixed",
                flexDirection: "column",
                alignItems: "center",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                padding: "1.6rem",
                transition:
                  "opacity 0.125s cubic-bezier(0.175, 0.885, 0.32, 1.275),visibility 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                backgroundColor: "background",
                zIndex: 99,

                "& > a": {
                  marginBottom: ".8rem",
                },

                "&.active": {
                  visibility: "visible",
                  opacity: 1,
                },
              }),

              /** Desktop styles (reset mobile) */
              "@media (min-width: 768px)": {
                display: "flex",
                flexDirection: "row",
                width: "auto",
                height: "auto",
                padding: 0,
                position: "relative",
              },
            }}
          >
            <Button
              sx={{
                alignSelf: "flex-end",
                padding: ".8rem",

                ...(!isMobileMenuActive && { display: "none" }),
              }}
              onClick={() => setIsMobileMenuActive(false)}
            >
              <CloseIcon />
            </Button>

            <WalletManager />
          </Flex>
          <Button
            sx={{
              padding: ".8rem",
              "@media(min-width: 768px)": {
                display: "none",
              },
            }}
            onClick={() => setIsMobileMenuActive(true)}
          >
            <MenuIcon />
          </Button>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Header
