import { TUser } from "./TypeUser"


export type TAnswer = {
    _id: string,
    text: string,
    user: TUser,
    createdAt: string,
    updatedAt: string,
    userAnswer?: string,
}


export type TComment = {
    _id: string,
    answers?: TAnswer[],
    postId: string,
    text: string,
    user: TUser,
    createdAt: string,
    updatedAt: string,
}