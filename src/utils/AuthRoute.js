import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const AuthRoute = (props) => {
  const {component:Component,authenticated,path,...rest} = props;
  console.log(authenticated)
  return (
    <Route {...rest} render={()=>authenticated === true ? <Redirect to='/' /> : <Component /> } />
  )
}

export default AuthRoute