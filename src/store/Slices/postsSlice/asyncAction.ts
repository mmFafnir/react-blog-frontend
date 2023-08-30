import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPostCreate, TPost } from "../../../types/TypePost";
import { IDataFetchPost } from "./actionsInterface";
import { TFilter } from "../../../types/TypeFilter";
import axios from '../../../axios'; 



const getPosts = async (params:TFilter) => {
    const {limit='', page='', search=''} = params;
    
    let url = '/posts'; 
    if(params.userId) {
        url = url+`/user/${params.userId}`; 
    }
    url = url+`?limit=${limit}&page=${page}&search=${search}`;
    const {data} = await axios.get(url);
    return data
}


export const fetchPost = createAsyncThunk<IDataFetchPost, TFilter>(
    'posts/fetchPost', 
    getPosts
)

export const fetchPostByLimit = createAsyncThunk<IDataFetchPost, TFilter>(
    'posts/fetchPostByLimit',
    getPosts
)

export const postPost = createAsyncThunk<TPost, IPostCreate>(
    'posts/postPost', 
    async (params) => {
        const { data } = await axios.post('/posts', params);
        return  data
    }
)

export const deletePost = createAsyncThunk<TPost, string>(
    'posts/deletePost',
    async (id) => {
        const { data } = await axios.delete(`/posts/${id}`);
        return data
    }
)

export type TPostUpdate = {
    title: string,
    text: string,
    tags: string[],
    imageUrl?: string,
}

interface IUpdatePostParams {
    post: TPostUpdate
    id: string,
}

export const updatePost = createAsyncThunk<TPost, IUpdatePostParams>(
    'posts/updatePost',
    async (params) => {
        const {data} = await axios.patch(`/posts/${params.id}`, params.post);
        return data
    }
)
