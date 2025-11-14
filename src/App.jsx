import React from 'react'
import './App.css'
import AuthForm from './components/Authentication/AuthForm'
import MainHeader from './components/UI/MainHeader'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className='container'>
      <MainHeader/>
      <Switch>
      <Route path="/" exact><AuthForm/></Route>
      <Route path="/welcome"><Welcome/></Route>
      </Switch>
      
    </div>
  )
}

export default App
