import { TPost } from "../../../types/TypePost";




export interface IDataFetchPost {
    pages: number,
    page: number,
    posts: TPost[]
}