import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IState {
    search: string,
    page: number
}

const initialState:IState = {
    search: '',
    page: 1
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilterSearch: (state, action:PayloadAction<string>) => {
            state.search = action.payload;
        },
        setFilterPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setFilter: (state, action:PayloadAction<IState>) => {
            state.page = action.payload.page;
            state.search = action.payload.search;
        }
    }
})


export const {setFilterSearch, setFilterPage, setFilter} = filterSlice.actions;
export default filterSlice.reducer;