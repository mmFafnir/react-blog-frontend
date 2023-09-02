import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../../types/Status";
import { TComment } from "../../../types/TypeComment";
import { fetchComments, postAnswer, postComments } from "./asyncActions";


export interface IStateComments {
    comments: TComment[],
    page: number,
    pages: number,
    status: Status
}

const initialState:IStateComments = {
    comments: [],
    page: 0,
    pages: 0,
    status: Status.LOADING,
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = [];
            state.page = 0;
            state.pages = 0;
            state.status = Status.LOADING;
        }
    },
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchComments.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.comments = action.payload.comments;
            state.page = action.payload.page;
            state.pages = action.payload.pages;
        });
        builder.addCase(fetchComments.rejected, (state) => {
            state.status = Status.ERROR;
        });

        //post
        builder.addCase(postComments.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(postComments.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.comments = [action.payload, ...state.comments];
        });
        builder.addCase(postComments.rejected, (state) => {
            state.status = Status.ERROR;
        });



        //post Answer
        builder.addCase(postAnswer.pending, (state) => {
            state.status = Status.LOADING;
        });
        builder.addCase(postAnswer.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.comments = state.comments.map(comment => {
                if(comment._id === action.payload._id) {
                    return action.payload
                } 
                return comment
            });
        });
        builder.addCase(postAnswer.rejected, (state) => {
            state.status = Status.ERROR;
        });


    }
})


export const { clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;