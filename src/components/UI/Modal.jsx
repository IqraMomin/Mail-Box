import React from 'react'
import ReactDOM from "react-dom"
import "./Modal.css";

const Backdrop=()=>{
    return <div className='backdrop'>

    </div>
}
const ModalOverlay =(props)=>{
return<div className='modal'>
<div className='content'>{props.children}</div>
</div>
}
function Modal(props) {
    const portalElement = document.getElementById("overlay");

    return (
        <React.Fragment>
            {ReactDOM.createPortal(<Backdrop/>,portalElement)}
            {ReactDOM.createPortal(<Modal>{props.children}</Modal>,portalElement)}
        </React.Fragment>
    )
}

export default Modal
