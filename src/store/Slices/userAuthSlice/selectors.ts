import { RootState } from "../..";


export const selectAuth = (state:RootState) => state.user.data ? true : false;
export const selectUserId = (state:RootState) => state.user.data?._id;