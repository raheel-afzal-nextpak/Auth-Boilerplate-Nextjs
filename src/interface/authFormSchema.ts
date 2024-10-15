export type SignupSchemaType = {
    name: string
    email: string
    password: string
}

export type LoginSchemaType = {
    email: string
    password: string
}

export type ResetPasswordSchemaType = {
    email: string
}
