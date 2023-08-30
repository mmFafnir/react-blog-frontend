export type TWork = {
    _id: string,
    title: string,
    imageUrl?: string|null,
    tags: string[],
    text: string,
    userId: string,
    url?: string,
    updatedAt: string,
    createdAt: string

}


export type OmitTWorkId = Omit<TWork, "_id">;

export interface IWorkCreate {
    userId: string,
    title: string,
    imageUrl?: string|null,
    tags?: string[],
    url?: string,
    text: string,
}
