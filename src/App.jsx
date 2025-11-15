import React, { useEffect } from 'react'
import './App.css'
import AuthForm from './components/Authentication/AuthForm'
import MainHeader from './components/UI/MainHeader'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Welcome from './components/Welcome'
import Inbox from './components/Inbox'
import { authActions } from './store/auth-slice'
import { useDispatch } from 'react-redux'



function App() {
  const dispatch =useDispatch();

  useEffect(()=>{
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    dispatch(authActions.login({
      token:storedToken,
      email:storedEmail
    }));
  
  },[]);
  
  return (
    <React.Fragment>
      <MainHeader/>
      <div className="auth-wrapper">
      <Switch>
      
      <Route path="/" exact><AuthForm/></Route>
      <Route path="/inbox"><Inbox/></Route>
     
          
      <Route path="/welcome"><Welcome/></Route>
      </Switch>
      </div>
      </React.Fragment>
  )
}

export default App
