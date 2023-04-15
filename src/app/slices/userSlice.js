import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            localStorage.setItem('token', action.payload.token);        
            localStorage.setItem('email', action.payload.email);                 
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;    
            localStorage.removeItem('token');        
            localStorage.removeItem('email');     
        }
    }

});

export const {setUser,removeUser} = userSlice.actions;

export default userSlice.reducer;