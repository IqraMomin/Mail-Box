import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Modal from './UI/Modal';


function Welcome() {
    const [sendEmail,setSendEmail] = useState(false);
    const email = useSelector(state=>state.auth.email);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [receiver, setReceiver] = useState("");
    const [subject, setSubject] = useState("");

    const receiverHandler = (event) => {
        setReceiver(event.target.value);
    }
    const subjectHandler = (event) => {
        setSubject(event.target.value);
    }

    const formSubmitHandler = async(event)=>{
        event.preventDefault();
        const safeSender = email.replace(/[@.]/g,"");
        const safeReceiver = receiver.replace(/[@.]/g,"");
        const plainText = editorState.getCurrentContent().getPlainText();
        const emailData = {
            from:safeSender,
            to:safeReceiver,
            subject,
            body:plainText
        }
        try{
            await axios.post(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/inbox/${safeReceiver}.json`,emailData);
            await axios.post(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/sentbox/${safeSender}.json`,emailData);
            alert("Email sent successfully");
        }catch(error){
            console.log(error);
        }

    }

    return (
        <div className='welcome-div'>
            <h1 style={{ textAlign: 'left' }}>Welcome to your mail box</h1>
            <button className='btn-primary' onClick={()=>{setSendEmail(prev=>!prev)}}>Send Email</button>
            {sendEmail && <Modal>
                <form className='container' onSubmit={formSubmitHandler}>
                <input id='to' value={receiver} type='email' placeholder='to' onChange={receiverHandler} />
                <input id='subject' value={subject} type='text' placeholder='subject' onChange={subjectHandler} />

                <div className='editor-div'>
                    <button type='submit' >Send</button>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                    />

                </div>
            </form>
                </Modal>}

        </div>
    )
}

export default Welcome
