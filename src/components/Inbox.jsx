import React, { useEffect, useState } from 'react'
import "./Inbox.css"
//import { fetchEmail } from '../store/mailAction';
import {useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { mailActions } from '../store/mail-slice';
import MailItem from './MailItem';
import EmailBox from './EmailBox';
import { fetchMessages } from '../store/mailAction';



function Inbox() {
    const dispatch = useDispatch();
    //const emailId = useSelector(state => state.auth.email);
    const [openEditor,setOpenEditor] = useState(false);

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    const showEditorHandler = ()=>{setOpenEditor(prev=>!prev)}

    const inboxMessages = useSelector(state => state.mail.inbox);
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
                </div>
                {openEditor && <EmailBox onCancel={showEditorHandler}/>}
                <div className='mail-div'>
                    <ul>
                        {inboxMessages.map(ele => {
                            return <MailItem
                                key={ele.id}
                                id={ele.id}
                                item={ele} />
                        })}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Inbox
