import { createSlice } from "@reduxjs/toolkit";

export const adminAuth = createSlice({
    name:'admin',
    initialState:{
        Token:null,
        Id: null,
    },
    reducers:{
        adminLogin(state,action){
            state.Token = action.payload.token;
        },
        adminLogout(state,action){
            state.Token = ''
            state.Id = ''
        },
        AdminId(state, action) {
            state.Id = action.payload.id;
          },
    }
})


export const {adminLogin,adminLogout,AdminId} = adminAuth.actions
export default adminAuth.reducer