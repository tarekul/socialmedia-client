export default {
  palette: {
    primary: {
      light: "#90caf9",
      main: "#38A1F3",
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
  },
  paper: {
    padding: 20
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: "#00bcd4"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};
