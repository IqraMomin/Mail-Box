import { mailActions } from "./mail-slice";
import axios from "axios";


export const fetchMessages =  () => {
    return async(dispatch,getState)=>{
        try {
            const emailId = getState().auth.email;
            const safeEmail = emailId.replace(/[.]/g, "_");   // FIXED
            const response = await axios.get(
                `https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/${safeEmail}.json`
            );
            const data = response.data;
            const inbox = data.inbox ? Object.keys(data.inbox).map(id=>({id,...data.inbox[id]})):[];
            const sentbox = data.sentbox ? Object.keys(data.sentbox).map(id=>({id,...data.sentbox[id]})):[];

            dispatch(mailActions.fetchMessages({
                inbox,sentbox
            })); 
            
    
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    }
    
};

export const sendMail = (sender,receiver,subject,body)=>{
    return async(dispatch)=>{
        try{
            
            const safeSender = sender.replace(/[.]/g,"_");
            const safeReceiver = receiver.replace(/[.]/g,"_");
            const fullDate = new Date();
            const date = `${fullDate.getDate()} ${fullDate.toLocaleString('en-US', { month: 'short' })}`;
            const emailData={
                from:safeSender,
                to:safeReceiver,
                subject,
                body,
                date,
                isRead:false
            }
            const inbox = await axios.post(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/${safeReceiver}/inbox.json`, emailData);
            const sentResponse = await axios.post(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/${safeSender}/sentbox.json`, emailData);
            dispatch(mailActions.sentMail({
                id:sentResponse.data.name,...emailData
            }))

            if(safeSender===safeReceiver){
                dispatch(mailActions.receivedMail({id:inbox.data.name,emailData}));
            }
        //    dispatch(fetchMessages());

            return {success:true}

        }catch(error){
            console.log(error);
        }
    }
}
export const updateReadStatus = (id)=>{
    return async(dispatch,getState)=>{
        try{
            const sender = getState().auth.email;
            const safeSender = sender.replace(/[.]/g,"_")
            await axios.patch(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/${safeSender}/inbox/${id}.json`,{isRead:true})
            dispatch(mailActions.markAsRead(id));
        }catch(error){

        }
    }
}

export const deleteFromDatabase = (id)=>{
    return async(dispatch,getState)=>{
        try{
            const email = getState().auth.email;
            const safeEmail = email.replace(/[.]/g,"_");
            const response = await axios.delete(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/${safeEmail}/inbox/${id}.json`)
            console.log(response);
            dispatch(mailActions.deleteMail(id));
        }catch(error){
            console.log(error);
        }
    }
}