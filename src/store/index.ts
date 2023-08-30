import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./Slices/modalSlice";
import tagsSlice from "./Slices/tagsSlice";
import userAuthSlice from "./Slices/userAuthSlice";
import postsSlice from "./Slices/postsSlice";
import commentsSlice from "./Slices/commentsSlice";
import filterSlice from "./Slices/filterSlice";
import worksSlice from "./Slices/worksSlice";



export const store = configureStore({
    reducer: {
        modal: modalSlice,
        tags: tagsSlice,
        user: userAuthSlice,
        posts: postsSlice,
        works: worksSlice,
        comments: commentsSlice,
        filter: filterSlice
    }
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;