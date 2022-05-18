/** @jsxImportSource theme-ui */
import Link from "next/link"
import { Button, Container, Flex, Input, Text } from "@theme-ui/components"

import WalletManager from "@/components/WalletManager/WalletManager"
import { Dispatch, SetStateAction, useState } from "react"
import { CloseIcon, MenuIcon } from "../icons"

type Props = {
  farmId?: string
  setFarmId?: Dispatch<SetStateAction<string>>
}
const Header = ({ farmId, setFarmId }: Props) => {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
  const [isChangingFarmId, setIsChangingFarmId] = useState(false)

  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 9,
        //background: (theme) => theme.colors?.backgroundGradient,
        //remove gradient coloring from header
        //borderBottom: "1px solid",
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
                  
                </Text> 

                <img
                  sx={{
                    maxHeight: "6.5rem", //4.8rem
                  }}
                  src="/images/gemtransparent.gif"
                  alt="Gemworks"
                />

                <Text as="h1" variant="headingSpecial" ml=".4rem">
                  BASC
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
              alignItems: "center",

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
            {isChangingFarmId && (
              <Input
                sx={{
                  fontSize: "1.1rem",
                  padding: ".4rem",
                  border: "none",
                  borderBottom: "1px solid",
                  borderRadius: 0,
                  width: "auto",
                }}
                value={farmId}
                onChange={(e) => setFarmId(e.target.value)}
              />
            )}

            <a
              tabIndex={0}
              sx={{
                margin: "0 auto",
                fontSize: "1.1rem",
                whiteSpace: "nowrap",
              }}
              onClick={() => setIsChangingFarmId((prev) => !prev)}
            >
              
            </a>

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
