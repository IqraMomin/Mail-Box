import React from 'react'
import './App.css'
import AuthForm from './components/Authentication/AuthForm'
import MainHeader from './components/UI/MainHeader'

function App() {
  return (
    <div className='container'>
      <MainHeader/>
      <AuthForm/>
    </div>
  )
}

export default App
