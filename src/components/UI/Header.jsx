import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef,useState } from "react";
import React from 'react'
import "./Header.css"
import { mailActions } from "../../store/mail-slice";
import { authActions } from "../../store/auth-slice";

function Header() {
    const email = useSelector(state => state.auth.email);

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const initial = email ? email.trim()[0].toUpperCase() : "U";
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const logoutHandler = () => {
        dispatch(authActions.logout());
        setOpen(false);
    };

    const searchHandler = (e) => {
        dispatch(mailActions.setSearch(e.target.value));
    }

    return (
        <div className="toolbar-div">
            <div className="toolbar-content">
                <h2>React!Mail</h2>
                <div className='toolbar-search'>
                    <input placeholder='Find messages...' onChange={searchHandler} />
                    <button ><i className="fas fa-search"></i></button>
                </div>
                <div className="profile-wrapper" ref={dropdownRef}>
          <div
            className="profile-icon"
            onClick={() => setOpen(prev => !prev)}
          >
            {initial}
          </div>

          {open && (
            <div className="profile-dropdown">
              <div className="profile-email">{email}</div>
              <hr /> 
              <div className="d-flex align-items-center px-3 logout-div">
              <i className="bi bi-box-arrow-right"></i>
                <button onClick={logoutHandler}>Logout</button>            
                </div>             
            </div>
          )}
        </div>
        </div>
        </div>
    )
}

export default Header
