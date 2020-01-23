import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import themeFile from "./utils/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./utils/AuthRoute";
//pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

let theme = createMuiTheme(themeFile);
theme = responsiveFontSizes(theme);

theme.typography.body1 = {
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem"
  },
  [theme.breakpoints.down("s")]: {
    fontSize: "1rem"
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "1rem"
  }
};

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Route path="/" component={Navbar} />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
