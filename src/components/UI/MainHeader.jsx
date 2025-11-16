import React from 'react'
import "./MainHeader.css"
import { useDispatch, useSelector } from 'react-redux'
import {authActions} from "../../store/auth-slice"
import { mailActions } from '../../store/mail-slice'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

function MainHeader() {
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = ()=>{
        dispatch(authActions.logout());
        dispatch(mailActions.resetMail());
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        history.replace("/");
    }
    return (
        <nav>
            <ul className='navbar'>
            <h3>MyWebLink</h3>
                <li>Home</li>
                <li>Products</li>
                <li>About Us</li>
               {isLoggedIn && <button onClick={logoutHandler}>Logout</button>} 
                
            </ul>
        </nav>
    )
}

export default MainHeader
