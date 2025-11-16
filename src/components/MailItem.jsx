import React from 'react'
import "./MailItem.css"
import { updateReadStatus } from '../store/mailAction';
import { useDispatch } from 'react-redux';

function MailItem({item}) {
    const dispatch = useDispatch();
    const openMailHandler = ()=>{
        dispatch(updateReadStatus(item.id));
    }
    return (
        <li className='mail-item' onClick={openMailHandler}>
            {!item.isRead && <div className='blue-dot'></div>}
            <p>{item.from}</p>
            <p>{item.subject}</p>
        </li>
    )
}

export default MailItem
