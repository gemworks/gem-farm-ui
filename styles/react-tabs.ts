export const reactTabsStyles = {
  ".react-tabs": { WebkitTapHighlightColor: "transparent" },
  ".react-tabs__tab-list": {
    //borderBottom: "1px solid ",
    borderColor: "rgb(136 103 151)",
    margin: "0 0 10px",
    padding: "0",
    marginBottom: "1.6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".react-tabs__tab": {
    display: "inline-block",
    //border: "1px solid transparent",
    borderBottom: "none",
    bottom: "-1px",
    position: "relative",
    listStyle: "none",
    padding: "6px 12px",
    cursor: "pointer"
  } as any,
  ".react-tabs__tab--selected": {
    backgroundColor: "primary",
    borderColor: "rgb(136 103 151)",
    color: "text",
    borderRadius: "15px 15px 15px 15px"
  },
  ".react-tabs__tab--disabled": { color: "GrayText", cursor: "default" },
  ".react-tabs__tab:focus": {
    boxShadow: "none", //"0 0 3px hsl(270, 99%, 50%)", //208
    borderColor: "rgb(101 78 129)",
    outline: "none",
    
  },
  ".react-tabs__tab:focus:after": {
    content: '""',
    position: "absolute",
    height: "5px",
    left: "-4px",
    right: "-4px",
    bottom: "-5px",
    backgroundColor: "" // remove underline on focus
  } as any,
  ".react-tabs__tab-panel": { display: "none" },
  ".react-tabs__tab-panel--selected": { display: "block" }
}