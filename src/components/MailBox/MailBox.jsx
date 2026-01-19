import React from 'react'
import Header from '../UI/Header'
import Sidebar from './Sidebar'
import "./MailBox.css"
import InboxScreen from './InboxScreen'
import SentboxScreen from './SentboxScreen'
import { Switch,Route ,Redirect} from 'react-router-dom/cjs/react-router-dom.min'
import OpenMail from './OpenMail'

function MailBox() {
    return (
        <div className='mailbox'>
            <div className='mailbox-header'>
                <Header/>
            </div>
            <div className='mailbox-body'>
                <div className='mailbox-sidebar'>
                    <Sidebar/>
                </div>
                <div className='mailbox-content'>
                <Switch>
            <Route exact path="/mailbox">
              <Redirect to="/mailbox/inbox" />
            </Route>

            <Route exact path="/mailbox/inbox">
              <InboxScreen />
            </Route>

            <Route exact path="/mailbox/sent">
              <SentboxScreen />
            </Route>

            <Route path="/mailbox/inbox/:mailId">
              <OpenMail type="inbox" />
            </Route>

            <Route path="/mailbox/sent/:mailId">
              <OpenMail type="sent" />
            </Route>
          </Switch>

                </div>

            </div>

        </div>
        
    )
}

export default MailBox
