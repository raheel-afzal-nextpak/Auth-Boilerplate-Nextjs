import { User } from '@/interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface AuthState {
    user: User | null
    authenticating: boolean
}

const name = 'auth'
const initialState: AuthState = {
    user: null,
    authenticating: true,
}

const authSlice = createSlice({
    name,
    initialState,

    reducers: {
        setUserInfo: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        setAuthenticating: (state, action) => {
            state.authenticating = action.payload
        },
        setState: (state, action) => {
            return {
                ...state,
                ...action.payload,
            } as AuthState
        },
    },
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer

export default authSlice
