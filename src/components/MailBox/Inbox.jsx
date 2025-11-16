import React, { useEffect, useState } from 'react'
import "./Inbox.css"
//import { fetchEmail } from '../store/mailAction';
import {useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { mailActions } from '../store/mail-slice';
import MailItem from './MailItem';
import EmailBox from '../EmailBox';
import { fetchMessages } from '../../store/mailAction';
import InboxScreen from './InboxScreen';
import SentboxScreen from './SentboxScreen';
import OpenMail from './OpenMail';



function Inbox() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [openEditor,setOpenEditor] = useState(false);
    const unReadTotal = useSelector(state=>state.mail.unReadTotal);
    const [screen,setScreen] = useState("inbox");

    useEffect(() => {
        if (email && email.trim().length > 0) {
            dispatch(fetchMessages());
        }

    }, [email,dispatch]);

    const showEditorHandler = ()=>{setOpenEditor(prev=>!prev)}

    return (
        <div className='container'>
            <div className="toolbar-div">
                <div className="toolbar-content">
                    <h2>React!Mail</h2>
                    <input placeholder='Find messages...' />
                    <button><i className="fas fa-search"></i></button>
                </div>
            </div>

            <div className='menu-div-content'>
                <div className='menu-div'>
                    <button onClick={showEditorHandler} className='compose-btn'>Compose Email</button>
                    <div className='inbox-div'>
                        <div className={`message ${screen==="inbox" ? "active-btn":""}`} onClick={()=>{setScreen("inbox")}}>
                        <div>Inbox</div>
                        <div>{unReadTotal}</div>
                        </div>
                        <div className={`message ${screen==="sentbox" ? "active-btn":""}`} onClick={()=>{setScreen("sentbox")}}>
                        <div>Sent</div>
                        <div></div>
                        </div>
                        
                    </div>
                   
                </div>
                {openEditor && <EmailBox onCancel={showEditorHandler}/>}
                <div className='mail-div'>
                    {screen==="inbox" && <InboxScreen/>}
                    {screen==="sentbox" && <SentboxScreen/>}
                    {screen==="message" && <OpenMail/>}
                    
                </div>
            </div>

        </div>
    )
}

export default Inbox
