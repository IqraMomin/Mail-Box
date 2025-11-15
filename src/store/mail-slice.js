import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    email:"",
    inbox:[],
    sentbox:[]
}

const MailSlice = createSlice({
    name:'mail',
    initialState:initialMailState,
    reducers:{
        sentMail:(state,action)=>{
            state.sentbox = state.sentbox.push(action.payload);
        },
        receivedMail:(state,action)=>{
            state.inbox = action.payload;
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        }
    }
})

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;