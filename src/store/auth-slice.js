import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={
    token:"",
    isLoggedIn:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn = true;
            state.token = action.payload;

        },
        logout:(state)=>{

        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;