import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";
import { TComment } from "../../../types/TypeComment";
import { IParamsFetchComments, IParamsPostAnswer, IParamsPostComment, IParamsUpdateComment } from "./actionsInterface";
import { IStateComments } from ".";


// Actions Comments
export const fetchComments = createAsyncThunk<Omit<IStateComments, 'status'>, IParamsFetchComments>(
    'comments/fetchComments',
    async (params) => {
        const {id, limit, page} = params
        try {
            const data = await axios.get(`/posts/${id}/comments?limit=${limit}&page=${page}`);
            console.log(data)
            return data.data;

        } catch (error) {
            console.warn(error)
            alert('Не удалось загрузить комментарии')
        }
    }
)

export const postComments = createAsyncThunk<TComment, IParamsPostComment>(
    'comments/postComments',
    async (params) => {
        try {
            const {data} = await axios.post(`/posts/${params.id}/comments`, params.comment);
            return data

        } catch (error) {
            console.warn(error)
            alert('Не удалось загрузить комментарий')
        }
    }
)


export const updateComment = createAsyncThunk<TComment, IParamsUpdateComment>(
    'comments/updateComment',
    async (params) => {
        try {
            const {data} = await axios.patch(`/posts/comments/${params.id}`, params.comment);
            return data

        } catch (error) {
            console.warn(error)
            alert('Не удалось изменить комментарий')
        }
    }
)



// Actions Answer
export const postAnswer = createAsyncThunk<TComment, IParamsPostAnswer>(
    'comments/postAnswer',
    async (params) => {
        try {
            const {data} = await axios.post(`/posts/comments/answers/${params.id}`, params.answer);
            console.log(data)
            return data

        } catch (error) {
            console.warn(error)
            alert('Не удалось загрузить комментарий')
        }
    }
)

