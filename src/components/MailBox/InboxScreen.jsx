import React from 'react'
import "./InboxScreen.css"
import { useSelector } from 'react-redux';
import MailItem from './MailItem';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function InboxScreen() {
    const inboxMessages = useSelector(state => state.mail.inbox);
    const searchText = useSelector(state=>state.mail.searchText);

    const filteredInbox = inboxMessages.filter(mail=>
        mail.subject.toLowerCase().includes(searchText.toLowerCase())||
        mail.from.toLowerCase().includes(searchText.toLowerCase())||
        mail.body.toLowerCase().includes(searchText.toLowerCase())
        )

    const history = useHistory();
    
    return (
        <div className="inbox-mails">
        {filteredInbox.length > 0 ? (
          filteredInbox.map(ele => (
            <MailItem
              key={ele.id}
              id={ele.id}
              item={ele}
              bluedot={true}
              onClick={() => history.push(`/mailbox/inbox/${ele.id}`)}
            />
          ))
        ) : (
          <p>No emails found</p>
        )}
      </div>
    )
}

export default InboxScreen
