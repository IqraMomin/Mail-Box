import React, { useRef, useState } from 'react'
import "./AuthForm.css"
import axios from 'axios';

function AuthForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const errorMessage={
        email:"",password:"",confirmPassword:""
    }
    const [error,setError] = useState(errorMessage);

    const emailChangeHandler = (event)=>{
        setEmail(event.target.value);
        setError(prev=>({...prev,email:""}));
    }
    const passwordChangeHandler = (event)=>{
        setPassword(event.target.value);
        setError(prev=>({...prev,password:""}));
    }
    const confirmPassChangeHandler = (event)=>{
        setConfirmPassword(event.target.value);
        setError(prev=>({...prev,confirmPassword:""}));
    }
    
    const formSubmitHandler = async(event)=>{
        event.preventDefault();
        
        if(email.length===0){
            setError(prev=>({...prev,email:"Email is required"}));
            return;
        }
        if(password.length===0){
            setError(prev=>({...prev,password:"Password is required"}));
            return;
        }
        if(confirmPassword.length===0){
            setError(prev=>({...prev,confirmPassword:"Confirm your password"}));
        }
        if(password!==confirmPassword){
            setError(prev=>({...prev,confirmPassword:"Password Mismatch"}));
            return;
        }
        const userData = {
            email,password,returnSecureToken:true
        }
        try{
            await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxYa4WhYcCJqoiFw3CpL04EubFKy52IO4",userData);
            console.log("User registered successfully");

        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className='container'>           
            <form className='form-input' onSubmit={formSubmitHandler}>
            <h2>Sign Up</h2>
            {error.email && <p>{error.email}</p>}
            <input placeholder='Email'type="email" value={email} onChange={emailChangeHandler}/>
            {error.password && <p>{error.password}</p>}
            <input placeholder='Password' type='password' value={password} onChange={passwordChangeHandler}/>
            {error.confirmPassword && <p>{error.confirmPassword}</p>}
            <input placeholder='Confirm Password' type='password' value={confirmPassword} onChange={confirmPassChangeHandler}/>           
            <div className='form-btn'>
            <button className='btn btn-primary'>SignUp</button>
            </div>
            </form>
            <div className='login-signup'><button className='btn'>Have an account? Login</button></div>
        </div>
    )
}

export default AuthForm
