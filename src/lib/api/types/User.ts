export interface User {
    id: number,
    username: string,
    password?: string,
    roles?: string[]
}

export interface UserKey {
    id: number,
    owner: string,
    value: string,
    dateCreated: string,
    dateExpires?: string
}

export interface UserSession {
    id: number,
    owner: string,
    userAgent: string,
    dateCreated: string,
    dateExpires: string
}
