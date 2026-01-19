import React,{useEffect} from 'react'
import './App.css'
import AuthForm from './components/Authentication/AuthForm'
import { Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Inbox from './components/MailBox/Inbox'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth-slice'
import MailDetails from './components/MailBox/MailDetails'
import { Container } from 'react-bootstrap'
import MailBox from './components/MailBox/MailBox'


function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    if (storedEmail) {
        dispatch(authActions.login({
            email: storedEmail,
            token: localStorage.getItem("token")
        }));
    }
}, [dispatch]);

  return (
    <div className='app-root'>
      <Route path="/auth">
        {!isLoggedIn ?  <AuthForm/> : <Redirect to="/"/>}
      </Route>
      <Route path="/mailbox">
      {isLoggedIn ? <MailBox/> : <Redirect to="/auth"/>}
      </Route>
      <Route path="/" exact>
        {isLoggedIn ? <MailBox/> : <Redirect to="/auth"/>}
      </Route>

    </div>
  )
}

export default App
