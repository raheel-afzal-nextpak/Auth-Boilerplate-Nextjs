import { toast } from '@/components/ui/use-toast'
import { auth } from '@/config/firebase'
import { fetchUsers } from '@/domains/user'
import { setCookie } from 'cookies-next'
import { FirebaseError } from 'firebase/app'
import {
    GoogleAuthProvider,
    OAuthProvider,
    UserCredential,
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth'
import { firestore_constants } from '../constants'
import { firebaseAuthErrorCodes } from './firebaseCodes'

interface AuthResponse {
    response: string
    uid?: string | null
}

const authenticate = async (
    authenticationMethod: () => Promise<UserCredential>,
): Promise<{ error: string | null; emailVerified: boolean }> => {
    try {
        const { user } = await authenticationMethod()

        if (user.emailVerified) {
            setCookie('auth-token', user.uid)
        }

        return { error: null, emailVerified: user.emailVerified }
    } catch (error) {
        const { code } = error as FirebaseError
        const errorResponse =
            firebaseAuthErrorCodes[code] || 'Something went wrong! Try again.'
        toast({
            title: 'Error',
            description: errorResponse,
            variant: 'destructive',
        })
        return { error: errorResponse, emailVerified: false }
    }
}

export const signUpWithEmail = (
    email: string,
    password: string,
): Promise<{ error: string | null }> =>
    authenticate(() => createUserWithEmailAndPassword(auth, email, password))

export const signInWithEmail = (
    email: string,
    password: string,
): Promise<{ error: string | null; emailVerified: boolean }> =>
    authenticate(() => signInWithEmailAndPassword(auth, email, password))

export const googleAuth = (): Promise<{ error: string | null }> =>
    authenticate(() => signInWithPopup(auth, new GoogleAuthProvider()))

export const appleAuth = (): Promise<{ error: string | null }> => {
    const provider = new OAuthProvider('apple.com')
    provider.addScope('email')
    provider.addScope('name')
    provider.setCustomParameters({ locale: 'en' })
    return authenticate(() => signInWithPopup(auth, provider))
}

// Refactor to use a standardized response interface
export const userLogout = async (): Promise<AuthResponse> => {
    try {
        await signOut(auth)
        return {
            response: 'Logout successful',
            uid: null,
        }
    } catch (error) {
        const { code } = error as FirebaseError
        return {
            response:
                firebaseAuthErrorCodes[code] ||
                firestore_constants.fireAuth.AuthErrorCodes,
            uid: null,
        }
    }
}

export const resetPassword = async (
    email: string,
): Promise<{ isSent: boolean }> => {
    try {
        const user = await fetchUsers({
            queries: [{ key: 'email', op: '==', value: email }],
        })

        if (!user.length) {
            toast({
                duration: 1000,
                variant: 'destructive',
                title: firestore_constants.fireAuth.noAccountFound,
            })
            return { isSent: false }
        }

        await sendPasswordResetEmail(auth, email)
        toast({
            title: firestore_constants.fireAuth.sentPwReset,
        })
        return { isSent: true }
    } catch (error) {
        const { code } = error as FirebaseError
        const response =
            firebaseAuthErrorCodes[code] ||
            firestore_constants.fireAuth.failedSentPwReset
        toast({
            title: response,
        })
        return { isSent: false }
    }
}

// Function to send an email verification to the signed-in user
export const sendVerificationEmail = async () => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
        try {
            const actionCodeSettings = {
                url:
                    process.env.NODE_ENV === 'production'
                        ? firestore_constants.prod_domain
                        : firestore_constants.local_domain,
                handleCodeInApp: true,
                expiresIn: 60 * 60 * 2, // 2 hours
            }

            await sendEmailVerification(user, actionCodeSettings)
            toast({
                title: firestore_constants.fireAuth.sentEmailVerificationTitle,
                description: firestore_constants.fireAuth.sentEmailVerification,
            })
        } catch (error: any) {
            toast({
                title: firestore_constants.fireAuth.anyError,
                description: `Failed to send verification email: ${error.message}`,
            })
        }
    } else {
        toast({
            title: firestore_constants.fireAuth.noUserSignedInTitle,
            description: firestore_constants.fireAuth.noUserSignedIn,
        })
    }
}
