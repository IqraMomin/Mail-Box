import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
//import { fetchEmail } from '../store/mailAction';
import { useDispatch, useSelector } from 'react-redux';
import MailItem from './MailItem';
import EmailBox from '../EmailBox';
import { fetchMessages } from '../../store/mailAction';
import InboxScreen from './InboxScreen';
import SentboxScreen from './SentboxScreen';
import OpenMail from './OpenMail';
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom/cjs/react-router-dom'


function Sidebar() {
    const dispatch = useDispatch();
    const email = useSelector(state => state.auth.email);
    const [openEditor, setOpenEditor] = useState(false);
    const unReadTotal = useSelector(state => state.mail.unReadTotal);
    const history = useHistory();

    useEffect(() => {
        if (email && email.trim().length > 0) {
            dispatch(fetchMessages());
        }

    }, [email, dispatch]);

    const showEditorHandler = () => { setOpenEditor(prev => !prev) }

    return (
        <div className='sidebar'>
            <button onClick={showEditorHandler} className='compose-btn'>Compose Email</button>
            <div className='inbox-div'>
                <Navbar>
                    <Nav className="d-flex flex-column align-items-center w-100">

                        <NavLink
                            to="/mailbox/inbox"
                            className="message"
                            activeClassName="active-btn"
                        >
                            <div>
                                <div className='d-flex align-items-center'><i className='bi bi-inbox fs-5 me-2'></i>Inbox</div>
                                <div>{unReadTotal}</div>
                            </div>
                        </NavLink>

                        <NavLink
                            to="/mailbox/sent"
                            className="message"
                            activeClassName="active-btn"
                        >
                            <div>



                                <div className='d-flex align-items-center'><i className='bi bi-send fs-5 me-2'></i>Sent</div>
                            </div>
                        </NavLink>

                    </Nav>
                </Navbar>
            </div>
            {openEditor && <EmailBox onCancel={showEditorHandler} />}


        </div>
    )
}

export default Sidebar
