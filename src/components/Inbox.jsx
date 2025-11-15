import React, { useEffect } from 'react'
import "./Inbox.css"
//import { fetchEmail } from '../store/mailAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { mailActions } from '../store/mail-slice';


function Inbox() {
    const dispatch = useDispatch();
    const emailId = useSelector(state=>state.auth.email);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                console.log("emailId =", emailId);   // DEBUG
                const safeEmail = emailId.replace(/[@.]/g, "");   // FIXED
                console.log("safeEmail =", safeEmail);   // DEBUG
                const response = await axios.get(
                    `https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/inbox/${safeEmail}.json`
                );
                const data = response.data;
                let loadedMessages = [];
                for (const key in data) {
                    loadedMessages.push({ ...data[key], id: key });
                }
                console.log(loadedMessages);
                dispatch(mailActions.receivedMail(loadedMessages));

            } catch (err) {
                console.error("Error fetching expenses:", err);
            }
        };

        fetchExpenses();
    }, [dispatch]);

    const inboxMessages = useSelector(state => state.mail.inbox);
    return (
        <div className='container'>
            <div className='toolbar-div'>
                <h2>React!Mail</h2>
                <input placeholder='Find messages, document, photos or people' type='text' />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className='menu-div-content'>
                <div className='menu-div'></div>
                <div className='mail-div'>
                    <ul>
                    {inboxMessages.map(ele=>{
                        return <li key={ele.id}>
                            <h3>{ele.body}</h3>
                            <h3>{ele.from}</h3>
                        </li>
                    })}
                </ul>
                </div>
            </div>

        </div>
    )
}

export default Inbox
