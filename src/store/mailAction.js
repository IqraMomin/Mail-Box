import { useSelector } from "react-redux";
import { mailActions } from "./mail-slice";


export const fetchEmail=()=>{
    return async(dispatch)=>{
        const emailId = useSelector(state=>state.auth.email);
        const safeEmail = emailId.replace(/[@.]/g,"");
        console.log(emailId);
        try{
            const response = await axios.get(`https://client-mail-box-5ac6c-default-rtdb.firebaseio.com/inbox/${safeEmail}.json`);
            console.log("getting Data");

        }catch(error){

        }
    }
}