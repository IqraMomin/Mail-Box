import React, { useState } from 'react'
import EmailBox from './EmailBox';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Welcome() {   
    const [sendEmail, setSendEmail] = useState(false);
    const history = useHistory();
    

    return (
        <div className='welcome-div'>
            <h1 style={{ textAlign: 'left' }}>Welcome to your mail box</h1>
            <button className='btn-primary' onClick={()=>{setSendEmail(prev=>!prev)}}>Send Email</button>
            {sendEmail && <EmailBox onCancel={()=>{setSendEmail(false)}}/>}
            <button onClick={()=>{history.replace("/inbox")}}>Inbox</button>

        </div>
    )
}

export default Welcome
