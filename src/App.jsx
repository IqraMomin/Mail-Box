import React,{useEffect} from 'react'
import './App.css'
import AuthForm from './components/Authentication/AuthForm'
import MainHeader from './components/UI/MainHeader'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Welcome from './components/Welcome'
import Inbox from './components/Inbox'
import { useDispatch } from 'react-redux'
import { authActions } from './store/auth-slice'


function App() {
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
