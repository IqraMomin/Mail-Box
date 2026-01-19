import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './UI/Modal';
import "./EmailBox.css"
import { sendMail } from '../store/mailAction';

function EmailBox({onCancel}) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [receiver, setReceiver] = useState("");
    const [subject, setSubject] = useState("");
    const dispatch = useDispatch();
    const sender = useSelector(state=>state.auth.email);

    const receiverHandler = (event) => {
        setReceiver(event.target.value);
    }
    const subjectHandler = (event) => {
        setSubject(event.target.value);
    }

    const formSubmitHandler =  (event) => {
        event.preventDefault();
        const body = editorState.getCurrentContent().getPlainText();
        dispatch(sendMail(sender,receiver,subject,body));
        
            alert("Email sent successfully");
            setReceiver("");
            setSubject("");
            setEditorState("");
        

    }

    return (

        <Modal>
            <div className='send-email-div'>
            <button onClick={onCancel}>x</button>
            <form onSubmit={formSubmitHandler}>
                <input id='to' value={receiver} type='email' placeholder='to' onChange={receiverHandler} />
                <input id='subject' value={subject} type='text' placeholder='subject' onChange={subjectHandler} />
                   
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                    />
                    <button type='submit' >Send</button>
            </form>
            </div>
        </Modal>


    )
}

export default EmailBox
