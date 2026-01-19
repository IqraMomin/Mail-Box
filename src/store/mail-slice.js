import { createSlice } from "@reduxjs/toolkit";

const initialMailState = {
    email:"",
    inbox:[],
    sentbox:[],
    searchText:"",
    unReadTotal:0
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
            const total = state.inbox.filter(ele=>ele.isRead===false);
            state.unReadTotal = total.length;
        },
        sentMail:(state,action)=>{
            state.sentbox.push(action.payload);
        },
        receivedMail:(state,action)=>{
            const newMessage = {id:action.payload.id,...action.payload.emailData};
            state.inbox.push(newMessage);
            state.unReadTotal +=1;
       
        },
        setEmail:(state,action)=>{
            state.email = action.payload
        },
        fetchMessages:(state,action)=>{
            state.inbox = action.payload.inbox;
            state.sentbox = action.payload.sentbox;
            state.unReadTotal = action.payload.inbox.filter(ele=>!ele.isRead).length;
        },
        deleteMail:(state,action)=>{
            state.inbox = state.inbox.filter(ele=>ele.id!==action.payload);
        },
        resetMail:(state)=>{
            state.email = "";
            state.inbox = [];
            state.sentbox = [];
        },
        setSearch:(state,action)=>{
            state.searchText = action.payload;
        }
    }
})

export const mailActions = MailSlice.actions;
export default MailSlice.reducer;