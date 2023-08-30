import { createAsyncThunk } from "@reduxjs/toolkit";
import { IWorkCreate, TWork } from "../../../types/TypeWork";
import { IDataFetchWorks, IUpdateWorkParams } from "./actionsInterface";
import { TFilter } from "../../../types/TypeFilter";
import axios from '../../../axios'; 




const getWorks = async (params:TFilter) => {
    const {limit, page, search} = params;
    
    let url = '/works/'+params.userId; 
    // if(params.userId) {
        // url = url+`/user/${params.userId}`; 
    // }
    url = url+`?limit=${limit}&page=${page}&search=${search}`;
    const {data} = await axios.get(url);
    console.log(data)
    return data;
}

export const fetchWorks = createAsyncThunk<IDataFetchWorks, TFilter>(
    'works/fetchWorks', 
    getWorks
)

export const fetchWorksByLimit = createAsyncThunk<IDataFetchWorks, TFilter>(
    'works/fetchWorksByLimit',
    getWorks
)

export const postWork = createAsyncThunk<TWork, IWorkCreate>(
    'works/postWork', 
    async (params) => {
        const { data } = await axios.post('/works', params);
        return  data
    }
)

export const deleteWork = createAsyncThunk<TWork, string>(
    'works/deleteWork',
    async (id) => {
        const { data } = await axios.delete(`/works/${id}`);
        return data
    }
)

export type TWorkUpdate = {
    title: string,
    text: string,
    tags: string[],
    imageUrl?: string,
}

export const updateWork = createAsyncThunk<TWork, IUpdateWorkParams>(
    'works/updateWork',
    async (params) => {
        const {data} = await axios.patch(`/works/${params.id}`, params.work);
        return data
    }
)
