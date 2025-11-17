import React, { useState } from 'react'
import "./AuthForm.css"
import { authActions } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { startTimer } from '../../store/mailAction';
import useApi from '../../hooks/useApi';


function AuthForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {post} = useApi();
    const errorMessage = {
        email: "", password: "", confirmPassword: ""
    }
    const [error, setError] = useState(errorMessage);
    const [isLogin, setIsLogin] = useState(false);

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
        setError(prev => ({ ...prev, email: "" }));
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
        setError(prev => ({ ...prev, password: "" }));
    }
    const confirmPassChangeHandler = (event) => {
        setConfirmPassword(event.target.value ||"");
        setError(prev => ({ ...prev, confirmPassword: "" }));
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        if (email.length === 0) {
            setError(prev => ({ ...prev, email: "Email is required" }));
            return;
        }
        if (password.length === 0) {
            setError(prev => ({ ...prev, password: "Password is required" }));
            return;
        }
        if (!isLogin && confirmPassword.length === 0) {
            setError(prev => ({ ...prev, confirmPassword: "Confirm your password" }));
        }
        if (!isLogin && password !== confirmPassword) {
            setError(prev => ({ ...prev, confirmPassword: "Password Mismatch" }));
            return;
        }
        const userData = {
            email, password, returnSecureToken: true
        }
        if (isLogin) {
                const response = await post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxYa4WhYcCJqoiFw3CpL04EubFKy52IO4",userData);
                dispatch(authActions.login({
                    token:response.idToken,
                    email
                }));
                localStorage.setItem("token",response.idToken);
                localStorage.setItem("email",email);  
                dispatch(startTimer());  
               history.replace("/inbox");


        } else {
                await post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxYa4WhYcCJqoiFw3CpL04EubFKy52IO4", userData);
                console.log("User registered successfully");

        }
    }


    return (
        <div className='auth-wrapper'>
        <div className='auth-div'>
            <form className='form-input' onSubmit={formSubmitHandler}>
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                {error.email && <p>{error.email}</p>}
                <input placeholder='Email' type="email" value={email} onChange={emailChangeHandler} />
                {error.password && <p>{error.password}</p>}
                <input placeholder='Password' type='password' value={password} onChange={passwordChangeHandler} />
                {error.confirmPassword && <p>{error.confirmPassword}</p>}
                {!isLogin && <input placeholder='Confirm Password' type='password' value={confirmPassword} onChange={confirmPassChangeHandler} />}               
                <div className='form-btn'>
                    <button className='btn btn-primary'>{isLogin? "Login" : "SignUp"}</button>
                </div>
            </form>
            <div className='login-signup'><button onClick={() => { setIsLogin(prev=> !prev) }} className='btn'>{isLogin ? "Create new account? SignUp":"Have an account? Login"}</button></div>
        </div>
        </div>
    )
}

export default AuthForm
