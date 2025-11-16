import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    token:localStorage.getItem("token")||"",
    email:localStorage.getItem("email")||"",
    isLoggedIn:!!(localStorage.getItem("token")),
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.email = action.payload.email;
        },
        logout:(state)=>{
            state.email = null;
            state.token = null;
            state.isLoggedIn = null;
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;