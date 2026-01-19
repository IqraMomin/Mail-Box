import React, { useEffect, useState } from 'react'
import "./Inbox.css"
//import { fetchEmail } from '../store/mailAction';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { mailActions } from '../store/mail-slice';
import MailItem from './MailItem';
import EmailBox from '../EmailBox';
import { fetchMessages } from '../../store/mailAction';
import InboxScreen from './InboxScreen';
import SentboxScreen from './SentboxScreen';
import OpenMail from './OpenMail';
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'




function Inbox() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [openEditor, setOpenEditor] = useState(false);
    const unReadTotal = useSelector(state => state.mail.unReadTotal);
    const [screen, setScreen] = useState("inbox");
    const history = useHistory();

    useEffect(() => {
        if (email && email.trim().length > 0) {
            dispatch(fetchMessages());
        }

    }, [email, dispatch]);

    const showEditorHandler = () => { setOpenEditor(prev => !prev) }

    return (
        <div className='container'>
            

            <div className='menu-div-content'>
                <div className='menu-div'>
                    <button onClick={showEditorHandler} className='compose-btn'>Compose Email</button>
                    <div className='inbox-div'>
                        <Navbar>
                            <Nav className="flex-column">

                                <NavLink
                                    to="/inboxMails"
                                    className="message"
                                    activeClassName="active-btn"
                                >
                                    <div>
                                        <div>Inbox</div>
                                        <div>{unReadTotal}</div>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/sentbox"
                                    className="message"
                                    activeClassName="active-btn"
                                >
                                    <div>Sent</div>
                                </NavLink>

                            </Nav>
                        </Navbar>
                    </div>


                    

                </div>
                {openEditor && <EmailBox onCancel={showEditorHandler} />}
                <div className='mail-div'>
                    <Route exact path="/inboxMails">
                        <InboxScreen />
                    </Route>
                  
                </div>
            </div>

        </div>
    )
}

export default Inbox
