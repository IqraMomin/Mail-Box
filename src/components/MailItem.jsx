import React from 'react'
import "./MailItem.css"
import { updateReadStatus } from '../store/mailAction';
import { useDispatch } from 'react-redux';
import { deleteFromDatabase } from '../store/mailAction';

function MailItem({item}) {
    const dispatch = useDispatch();
    const openMailHandler = ()=>{
        dispatch(updateReadStatus(item.id));
    }
    const deleteMailHandler = (e)=>{
        e.stopPropagation();
        dispatch(deleteFromDatabase(item.id));
    }
    return (
        <li className='mail-item' onClick={openMailHandler}>
            {!item.isRead && <div className='blue-dot'></div>}
            <div className='from-div'>{item.from}</div>
            <div className='subject-div'>{item.subject}</div>
            <div className='delete-div'>
            <button className='delete-btn' onClick={deleteMailHandler}>Delete Mail</button>
          </div>
          <div className='date-div'>
            {item.date}
          </div>
        </li>
    )
}

export default MailItem
