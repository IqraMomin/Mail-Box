import React, { useState } from 'react'
import EmailBox from './EmailBox';

function Welcome() {   
    const [sendEmail, setSendEmail] = useState(false);
    

    return (
        <div className='welcome-div'>
            <h1 style={{ textAlign: 'left' }}>Welcome to your mail box</h1>
            <button className='btn-primary' onClick={()=>{setSendEmail(prev=>!prev)}}>Send Email</button>
            {sendEmail && <EmailBox onCancel={()=>{setSendEmail(false)}}/>}

        </div>
    )
}

export default Welcome
