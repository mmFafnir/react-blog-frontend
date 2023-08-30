import { TUser } from "./TypeUser"


export type TPost = {
    _id: string,
    title: string,
    imageUrl?: string|null,
    tags?: string[],
    text: string,
    user: TUser,
    viewsCount: number,
    updatedAt: string,
    createdAt: string

}


export type OmitTPostId = Omit<TPost, "_id"|"user">;

export interface IPostCreate {
    userId: string,
    title: string,
    imageUrl?: string|null,
    tags?: string[],
    text: string,
}

// export type TPostCreate =