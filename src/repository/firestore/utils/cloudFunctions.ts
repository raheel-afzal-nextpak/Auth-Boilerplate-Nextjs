import { getFunctions, httpsCallable } from 'firebase/functions'
import htmlContent from './EmailTemplate'

export const sendEmail = async (params: {
    uid: string
    url: string
    to: string
    // password: string
    subject: string
}): Promise<any | null> => {
    try {
        const functions = getFunctions()
        const sendEmail = httpsCallable(functions, 'sendEmail')

        const result = await sendEmail({
            to: [params.to],
            subject: params.subject,
            html: htmlContent(
                params.to,
                params.url,
                params.uid,
                // params.password,
            ),
        })
        return result.data
    } catch (e) {
        return null
    }
}

export const deleteUserAuth = async (params: {
    userId: string
}): Promise<any | null> => {
    try {
        const functions = getFunctions()
        const deleteUser = httpsCallable(functions, 'deleteUser')
        // console.log('func', deleteUser)
        // // console.log('userId', userId)
        const result = await deleteUser({ userId: params.userId })
        // console.log('result', result)
        return result.data
    } catch (e) {
        return null
    }
}
