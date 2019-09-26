import React, {Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import themeFile from './utils/theme'
import jwtDecode from 'jwt-decode'
//components
import Navbar from './components/Navbar'
import AuthRoute from './utils/AuthRoute'
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(themeFile)

let authenticated;
const token = localStorage.FBIdToken;
console.log(token)
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <BrowserRouter>
            <Route path='/' component={Navbar} />
            <div className='container'>
            <Switch>
              <Route exact path = "/" component={home} />
              <AuthRoute Route exact path = "/login" component={login} authenticated={authenticated}/>
              <AuthRoute exact path = "/signup" component={signup} authenticated={authenticated}/>
            </Switch>
            </div>
          </BrowserRouter>  
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
