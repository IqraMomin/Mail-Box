import React from 'react'
import "./OpenMail.css"

function OpenMail({item}) {
    return (
        <div className='open-mail-div'>
            <div className='message-toolbar'>
            </div>
            <div className='subject'>
            {item.subject}
            </div>
            <div className='message-nme-div'>
                {item.from}
                {item.to}
                <div>
                    {item.date}
                </div>
            </div>
            <div className='body-div'>
                {item.body}

            </div>
            
        </div>
    )
}

export default OpenMail
