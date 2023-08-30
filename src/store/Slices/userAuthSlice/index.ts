
import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../../types/Status';
import {TUser} from '../../../types/TypeUser';
import { getUserAuthMe, postUserAuthLogin, postUserAuthRegister, updateUserAuthMe } from './asyncActions';
import { getFromLS, setToLS } from '../../../assets/scripts/localStorage';



interface IState {
    data: TUser|null,
    status: Status
}

const initialState:IState = {
    data: getFromLS('user'),
    status: Status.DEFAULT
}


const userAuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthStatusDefault: (state) => {
            state.status = Status.DEFAULT
        },

        logout: (state) => {
            state.data = null;
            window.localStorage.removeItem('token');
        }

    },

    extraReducers: (builder) => {
        //Login
        builder.addCase(postUserAuthLogin.pending, (state) => {
            state.status = Status.LOADING
        }) 
        builder.addCase(postUserAuthLogin.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.data = action.payload;
            window.localStorage.setItem('token', action.payload.token);
        }) 
        builder.addCase(postUserAuthLogin.rejected, (state) => {
            state.status = Status.ERROR;
            alert('Не удалось авторизоваться');
        }) 


        //Register
        builder.addCase(postUserAuthRegister.pending, (state) => {
            state.status = Status.LOADING
        }) 
        builder.addCase(postUserAuthRegister.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.data = action.payload;
            window.localStorage.setItem('token', action.payload.token);
        }) 
        builder.addCase(postUserAuthRegister.rejected, (state) => {
            state.status = Status.ERROR;
            alert('Не удалось авторизоваться');
        }) 

        //Get me
        builder.addCase(getUserAuthMe.pending, (state) => {
            state.status = Status.LOADING
        }) 
        builder.addCase(getUserAuthMe.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.data = action.payload;
        }) 
        builder.addCase(getUserAuthMe.rejected, (state) => {
            state.status = Status.ERROR;
            state.data = null
        }) 

        //Update me
        builder.addCase(updateUserAuthMe.pending, (state) => {
            state.status = Status.LOADING
        }) 
        builder.addCase(updateUserAuthMe.fulfilled, (state, action) => {
            state.status = Status.SUCCESS
            state.data = action.payload;
        }) 
        builder.addCase(updateUserAuthMe.rejected, (state) => {
            state.status = Status.ERROR;
            state.data = null
        }) 
    }
});


export const {setAuthStatusDefault, logout} = userAuthSlice.actions;

export default userAuthSlice.reducer;