import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IState {
    tags: string[]
}

const initialState:IState = {
    tags: []
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action:PayloadAction<string[]>) => {
            state.tags = action.payload 
        },
        setOneTag: (state, action:PayloadAction<string>) => {
            state.tags = [action.payload, ...state.tags]
        },
        
        deleteOneTag: (state, action:PayloadAction<string>) => {
            state.tags = state.tags.filter(tag => tag !== action.payload);
        },
        deleteTags: (state) => {
            state.tags = [];
        } 
    }
})


export const {setOneTag, setTags, deleteOneTag, deleteTags} = tagsSlice.actions;
export default tagsSlice.reducer;