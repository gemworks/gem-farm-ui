import { Theme } from "theme-ui"
import base from "./preset-base"
import { reactTabsStyles } from "./react-tabs"
export const getGradient = (rgb: string) => {
  /**
   * Split RGB. Example: rgb(226, 217, 211)
   * Then extract only numbers
   */
  const splitted = rgb.split(",").map((raw) => raw.replace(/\D/g, ""))

  return `linear-gradient(225deg, ${rgb} 0%, rgba(${splitted[0]}, ${splitted[1]}, ${splitted[2]}, 0.7) 50%, rgba(${splitted[0]}, ${splitted[1]}, ${splitted[2]}, 0.5) 100%)`
}

/**
 * rgb(84, 42, 147)
 * rgb(48, 114, 180, .7)
 *
 */

const theme: Theme = {
  ...base,
  colors: {
    //background: "rgb(4, 4, 3)",
    background: "#c7748ef0",
    text: "rgb(226, 217, 211)",
    primary: "rgb(157, 98, 136, .7)",
    //primary: "rgb(133 81 139, .7)",
    primaryGradient: getGradient("rgb(133, 81, 139, .7)"),
    heading: "rgb(226, 217, 211)",
    //background2: "#1E1E24",
    background2: "rgb(226, 217, 211)",
    backgroundGradient: getGradient("rgb(4, 4, 3)"),
    // modes: {
    //   light: {
    //     background: "rgb(226, 217, 211)",
    //     text: "rgb(4, 4, 3)",
    //     primary: "rgb(48, 114, 180, .7)",
    //     primaryGradient: getGradient("rgb(48, 114, 180, .7)"),
    //     heading: "#1E1E24",
    //     background2: "#1E1E24",
    //     backgroundGradient: getGradient("rgb(226, 217, 211)")
    //   }
    // }
    error: "#B00020",
    success: "#5cb85c",
  },

  sizes: {
    container: "80rem",
  },
  config: {
    useLocalStorage: true,
  },

  fonts: {
    heading:
      'AvertaStd-Bold, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  },

  buttons: {
    primary: {
      display: "flex",
      color: "heading",
      background: (theme) => theme.colors?.primaryGradient,
      border: "1px solid transparent",
      transition: "all .125s linear",
      alignItems: "center",
      borderColor: "primary",
      opacity: 1,
      fontWeight: 500,

      "&:not(:disabled):hover": {
        bg: "background",
        borderColor: "primary",
        cursor: "pointer",
        opacity: 0.7,
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
    secondary: {
      display: "flex",
      color: "heading",
      background: (theme) => theme.colors?.backgroundGradient,
      border: "1px solid transparent",
      transition: "all .125s linear",
      alignItems: "center",
      borderColor: "heading",
      opacity: 1,
      fontWeight: 500,

      "&:not(:disabled):hover": {
        bg: "background",
        cursor: "pointer",
        opacity: 0.7,
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
    special: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "heading",
      transform: "perspective(1px) translateZ(0)",
      position: "relative",
      background: "linear-gradient(45deg, rgb(48, 114, 180, .7), grey)",
      borderRadius: ".4rem",
      boxShadow: "0 0 5px 2px #00000054",
      fontSize: "1.8rem",
      padding: "1.2rem 3.2rem",
      textTransform: "capitalize",
      fontWeight: 500,
      textAlign: "center",
      transition: "all .125s linear",

      "&:not(:disabled):hover": {
        background: "linear-gradient(225deg, rgb(48, 114, 180, .7), grey)",
        cursor: "pointer",
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
    resetted: {
      display: "flex",
      background: "none" /*essential*/,
      border: "none" /*essential*/,
      padding: "0" /*essential*/,
      font: "inherit" /*important as otherwise the text will look slightly different*/,
      color:
        "inherit" /*if you want the span the same colour as the rest of the sentence*/,
      cursor:
        "pointer" /*make sure you add this, but if you really want it to behave like a span you would leave this out*/,
      transition: "all .125s linear",

      "&:not(:disabled):hover": {
        cursor: "pointer",
        opacity: 0.7,
      },

      "&:disabled": {
        cursor: "not-allowed",
        opacity: 0.3,
      },
    },
  },

  lineHeights: { body: 1.45 },

  text: {
    heading: {
      color: "heading",
      lineHeight: "body",
      fontSize: "2.2rem",
      fontFamily:
        'AvertaStd-Bold, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      fontWeight: 900,
    },
    headingSpecial: {
      color: "heading",
      lineHeight: "body",
      //fontSize: "2.2rem",
      //increase font of header font
      fontSize: "4rem",
      fontFamily:
        'PressStart2P-Regular, monospace, AvertaStd-Bold, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      fontWeight: 900,
    },
    heading2: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.9rem",
      fontFamily: "heading",
      fontWeight: 600,
    },
    heading3: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.7rem",
      fontWeight: 600,
    },
    heading4: {
      color: "heading",
      lineHeight: "body",
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    base: {
      color: "text",
      lineHeight: "body",
      fontSize: "1.4rem",
    },
    small: {
      color: "text",
      lineHeight: "body",
      fontSize: "1.4rem",
    },
    xsmall: {
      color: "text",
      lineHeight: "body",
      fontSize: "1rem",
    },
  },

  styles: {
    ...base.styles,

    root: {
      ...base.styles?.root,
      fontSize: "62.5%",
      minHeight: "100vh",

      body: {
        /** Default text styles */
        fontSize: "1.4rem",
        fontFamily:
          'AvertaStd-Regular, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        lineHeight: 1.45,
        minHeight: "100vh",
        color: "text",
        backgroundColor: "background",
        backgroundImage: `url("https://raw.githubusercontent.com/BASCDAO/basc-gem-farm-ui/main/public/images/stakingbg.png")`,
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transition: "all .125s linear",
      },

      img: {
        maxWidth: "100%",
        height: "auto",
        borderColor: "rgb(0 0 0 / 55%)",
      },

      p: {
        margin: 0,
      },

      a: {
        transition: "all .125s linear",
        color: "text",

        "&:hover": {
          cursor: "pointer",
          color: "primary",
        },

        "&:-webkit-any-link": {
          color: "heading",
          textDecoration: "none",
          transition: "all .125s linear",

          "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
            opacity: 0.8,
          },
        },
      },
      ul: {
        paddingInlineStart: 0,
      },
      ".slick-dots": {
        "li button::before": {
          color: "text",
        },
        "li.slick-active button::before": {
          color: "text",
        },
      },

      ...reactTabsStyles,
    },

    spinnerSmall: {
      size: "1.2rem!important",
    },
  },
}

export default theme
