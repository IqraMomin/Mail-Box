import React from 'react'
import "./InboxScreen.css"
import { useSelector } from 'react-redux';
import MailItem from './MailItem';

function InboxScreen() {
    const inboxMessages = useSelector(state => state.mail.inbox);
    
    return (
        <ul>
            {inboxMessages.map(ele => {
                return <MailItem
                    key={ele.id}
                    id={ele.id}
                    item={ele}
                    bluedot={true} />
            })}
        </ul>
    )
}

export default InboxScreen
