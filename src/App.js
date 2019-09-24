import React, {Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

class App extends Component {
  render(){
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route exact path = "/" component={home} />
            <Route path = "/login" component={login} />
            <Route path = "/signup" component={signup} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
