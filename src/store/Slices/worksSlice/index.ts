import { createSlice } from "@reduxjs/toolkit";
import { deleteWork, fetchWorks, fetchWorksByLimit, postWork, updateWork } from "./asyncAction";

import { TWork } from '../../../types/TypeWork';
import { Status } from "../../../types/Status";


interface IState {
    works: TWork[],
    status: Status,
    page: number,
    pages: number,   
}

const initialState:IState = {
    works: [],
    page: 1,
    pages: 3,   
    status: Status.LOADING,
}

const worksSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        clearWorksState: (state) => {
            state.works = [];
            state.page = 1;
            state.status = Status.LOADING;
        }
    },

    extraReducers: (builder) => {

        //fetch
        builder.addCase(fetchWorks.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(fetchWorks.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.works = action.payload.works;
            state.page = action.payload.page;
            state.pages = action.payload.pages 
        });
        builder.addCase(fetchWorks.rejected, (state) => {
            state.status = Status.ERROR
        });


        //fetch by scroll 
        builder.addCase(fetchWorksByLimit.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(fetchWorksByLimit.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.works = [...state.works, ...action.payload.works];
            state.page = action.payload.page;
            state.pages = action.payload.pages 
        });
        builder.addCase(fetchWorksByLimit.rejected, (state) => {
            state.status = Status.ERROR
        });



        //posts
        builder.addCase(postWork.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(postWork.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.works = [action.payload, ...state.works]; 
        });
        builder.addCase(postWork.rejected, (state) => {
            state.status = Status.ERROR
        });

        
        //delete
        builder.addCase(deleteWork.pending, (state) => {
            state.status = Status.LOADING
        });
        builder.addCase(deleteWork.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.works = state.works.filter(post => post._id !== action.payload._id); 
        });
        builder.addCase(deleteWork.rejected, (state) => {
            state.status = Status.ERROR
        });


    }
});

export const {clearWorksState} = worksSlice.actions;

export default worksSlice.reducer;