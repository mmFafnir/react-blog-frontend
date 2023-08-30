import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {TPost} from '../../../types/TypePost';
import { Status } from "../../../types/Status";
import { deletePost, fetchPost, fetchPostByLimit, postPost, updatePost } from "./asyncAction";


interface IState {
    posts: TPost[],
    postElement: TPost|null,
    status: Status,
    statusElement: Status,
    page: number,
    pages: number,   
}

const initialState:IState = {
    posts: [],
    page: 1,
    pages: 3,   
    postElement: null,
    status: Status.LOADING,
    statusElement: Status.SUCCESS,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPostElement: (state, action:PayloadAction<TPost|null>) => {
            state.postElement = action.payload;
        },
        clearPostsState: (state) => {
            state.posts = [];
            state.page = 1;
            state.status = Status.LOADING;
            state.statusElement = Status.SUCCESS;

        }
    },

    extraReducers: (builder) => {
        
        //fetch
        builder.addCase(fetchPost.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.posts = action.payload.posts;
            state.page = action.payload.page;
            state.pages = action.payload.pages 
        });
        builder.addCase(fetchPost.rejected, (state) => {
            state.status = Status.ERROR
        });


        //fetch by scroll
        builder.addCase(fetchPostByLimit.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(fetchPostByLimit.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.posts = [...state.posts, ...action.payload.posts];
            state.page = action.payload.page;
            state.pages = action.payload.pages 
        });
        builder.addCase(fetchPostByLimit.rejected, (state) => {
            state.status = Status.ERROR
        });



        //post
        builder.addCase(postPost.pending, (state) => {
            // state.status = Status.LOADING
        });
        builder.addCase(postPost.fulfilled, (state, action) => {
            // state.status = Status.SUCCESS;
            state.posts = [action.payload, ...state.posts]; 
        });
        builder.addCase(postPost.rejected, (state) => {
            // state.status = Status.ERROR
        });

        
        //delete
        builder.addCase(deletePost.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.posts = state.posts.filter(post => post._id !== action.payload._id); 
        });
        builder.addCase(deletePost.rejected, (state) => {
            state.status = Status.ERROR
        });


        //update 
        builder.addCase(updatePost.pending, (state) => {
            state.statusElement = Status.LOADING
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.statusElement = Status.SUCCESS;
            state.postElement = action.payload; 
        });
        builder.addCase(updatePost.rejected, (state) => {
            state.statusElement = Status.ERROR
        });
    }
});


export const { setPostElement, clearPostsState } = postsSlice.actions;
export default postsSlice.reducer;