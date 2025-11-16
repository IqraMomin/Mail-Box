import React from 'react'
import { useSelector } from 'react-redux';
import MailItem from './MailItem';

function SentboxScreen() {
    const sentboxMessages = useSelector(state=>state.mail.sentbox);
    
    return (
        <ul>
            {sentboxMessages.map(ele => {
                return <MailItem key={ele.id}
                    id={ele.id}
                    item={ele}
                    bluedot={false} />
            })}
        </ul>
    )
}

export default SentboxScreen
