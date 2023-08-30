import { createAsyncThunk } from "@reduxjs/toolkit";
import { TUser, TUserLogin, TUserRegister } from "../../../types/TypeUser";

import axios from '../../../axios'; 


export const postUserAuthLogin = createAsyncThunk<TUser, TUserLogin>(
    'auth/postUserAuthLogin',
    async (params) => {
        const { data } = await axios.post('/auth/login', params);
        return data;
    }
)

export const postUserAuthRegister = createAsyncThunk<TUser, TUserRegister>(
    'auth/postUserAuthRegister',
    async (params) => {
        const { data } = await axios.post('/auth/register', params);
        return data;
    }
)

export const getUserAuthMe = createAsyncThunk<TUser>(
    'auth/getUserAuthMe',
    async () => {
        const { data } = await axios.get('/auth/me');
        return data;
    }
)


export type TUserUpdate = Omit<TUserRegister, 'password'|'email'>

export const updateUserAuthMe = createAsyncThunk<TUser, TUserUpdate>(   
    'auth/updateMe',
    async (newUser) => {
        const { data } = await axios.patch('/auth/me', newUser);
        return data
    }
)
