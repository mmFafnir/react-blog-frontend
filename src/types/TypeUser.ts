

export type TUser = {
    _id: string,    
    fullName: string,
    email: string,
    avatarUrl?: string,
    professions?: string,
    description?: string,
    createdAt: Date,
    updatedAt: Date,
    token: string
}

export type TUserLogin = {
    email: string,
    password: string
}

export type TUserRegister = {
    fullName: string,
    email: string,
    password: string,
    professions?: string,
    description?: string,
    avatarUrl?: string
}