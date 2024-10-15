export enum Provider {
    GOOGLE = 'google',
    APPLE = 'apple',
    Email = 'email',
}

export interface User {
    id: string
    uid?: string
    email: string
    photoURL: string
    emailVerified: boolean
    disposable: boolean
    name: string
    userFormId?: string
    role?: string
}

export type UserDto = Omit<User, 'uid'>
