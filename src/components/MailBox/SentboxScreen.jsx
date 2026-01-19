import React from 'react'
import { useSelector } from 'react-redux';
import MailItem from './MailItem';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SentboxScreen() {
    const sentboxMessages = useSelector(state=>state.mail.sentbox);
    const searchText = useSelector(state=>state.mail.searchText);

    const filteredMessages = sentboxMessages.filter(mail=>
        mail.subject.toLowerCase().includes(searchText.toLowerCase())||
        mail.from.toLowerCase().includes(searchText.toLowerCase())||
        mail.body.toLowerCase().includes(searchText.toLowerCase())
        )

    const history = useHistory();
    
    return (
        <ul>
            {filteredMessages.length>0 ? filteredMessages.map(ele => {
                return <MailItem key={ele.id}
                    id={ele.id}
                    item={ele}
                    bluedot={false} 
                    onClick={() => history.push(`/mailbox/sent/${ele.id}`)}/>                   
            }):<p>No emails found</p>}
        </ul>
    )
}

export default SentboxScreen
