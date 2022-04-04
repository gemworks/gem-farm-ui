/** @jsxImportSource theme-ui */
import Link from "next/link"
import { Container, Flex, Text } from "@theme-ui/components"

import WalletManager from "@/components/WalletManager/WalletManager"

const Header = () => {
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
          p="1.6rem"
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
            <WalletManager />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Header
