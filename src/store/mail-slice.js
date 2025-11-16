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
        markAsRead:(state,action)=>{
            const id = action.payload;
            const item = state.inbox.find(ele=>ele.id===id);
            if(item){
                item.isRead = true
            }
        },
        sentMail:(state,action)=>{
            state.sentbox.push(action.payload);
        },
        receivedMail:(state,action)=>{
            state.inbox.push(action.payload);
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        },
        fetchMessages:(state,action)=>{
            state.inbox = action.payload.inbox;
            state.sentbox = action.payload.sentbox;
        },
        resetMail:(state)=>{
            state.email = "";
            state.inbox = [];
            state.sentbox = [];
        }
    }
})

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;