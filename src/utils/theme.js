export default {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  pageStyles: {
    form: {
      textAlign: "center"
    },
    image: {
      margin: "10px auto 10px auto"
    },
    pageTitle: {
      margin: "20px auto 20px auto"
    },
    textField: {
      margin: "10px auto 10px auto"
    },
    button: {
      marginTop: 20,
      postion: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem"
    },
    progress: {
      position: "absolute"
    }
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator: {
    width: "90%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  dialogCard: {
    boxShadow: "none",
    marginRight: 30
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  cardHead: {
    paddingBottom: 0
  }
};
