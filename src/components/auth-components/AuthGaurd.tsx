'use client'
import { auth } from '@/config/firebase'
import { createUser, fetchUser, updateUser } from '@/domains/user'
import { AppRoutes } from '@/lib/routes'
import { constructFallBackUrl } from '@/lib/utils'
import { sendVerificationEmail } from '@/repository/firestore/utils/FireAuth'
import { authActions } from '@/store/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setCookie } from 'cookies-next'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, ReactElement, ReactNode, useEffect } from 'react'
import disposableEmailDomains from '../../app/auth/disposable-emails/list.json'
interface AuthProps {
    children: ReactNode
}

export const AuthGuard: FC<AuthProps> = ({ children }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { user } = useAppSelector((state) => state.auth)

    const searchParams = useSearchParams()
    const hasFallback = searchParams.get('fallback')

    const handleRedirection = async () => {
        if (user?.role === 'admin') {
            router.push(AppRoutes.PAYMENT_DETAILS)
        } else if (hasFallback) {
            const redirectUrl = constructFallBackUrl(searchParams)
            router.push(redirectUrl)
        }
    }
    const checkDisposableEmail = (email: any) => {
        const domain = email.split('@')[1]
        return disposableEmailDomains.list.includes(domain)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                let userData = await fetchUser(firebaseUser.uid)

                if (!userData) {
                    const isDisposable = checkDisposableEmail(
                        firebaseUser.email,
                    )
                    userData = {
                        name: firebaseUser.displayName || '',
                        email: firebaseUser.email || '',
                        photoURL: firebaseUser.photoURL || '',
                        id: firebaseUser.uid,
                        disposable: isDisposable,
                        emailVerified: firebaseUser.emailVerified,
                    }
                    if (!userData.emailVerified) {
                        await sendVerificationEmail()
                    }

                    await createUser(userData, firebaseUser.uid)
                }

                if (firebaseUser.emailVerified && !userData?.emailVerified) {
                    userData = { ...userData, emailVerified: true }
                    await updateUser(userData)
                }

                dispatch(authActions.setUserInfo(userData))
            }
        })

        return () => unsubscribe()
    }, [dispatch])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!user || (user && !user.emailVerified)) {
            router.push(AppRoutes.LOGIN)
        } else {
            setCookie('auth-token', user.uid)
            handleRedirection()
        }
    }, [router, user])

    return <div>{children as ReactElement}</div>
}
