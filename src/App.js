import React, {Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//components
import Navbar from './components/Navbar'
//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography : {
    useNextVariants: true
  }
})

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
              <Route path = "/login" component={login} />
              <Route path = "/signup" component={signup} />
            </Switch>
            </div>
          </BrowserRouter>  
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
