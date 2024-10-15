'use client'
import { GoogleButton } from '@/components/auth-components'
import DotSpinner from '@/components/common/DotSpinner'
import { FormMessage } from '@/components/common/FormMessage'
import OrDivider from '@/components/common/OrDivider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import EmailVerification from '@/components/auth-components/EmailVerification'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAppForm from '@/hooks/useAppForm'
import { LoginSchemaType } from '@/interface'
import { AppRoutes } from '@/lib/routes'
import { signInWithEmail } from '@/repository/firestore/utils/FireAuth'
import { LoginSchema } from '@/schema/authSchema'
import { useAppSelector } from '@/store/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { auth_constant, auth_fields_const } from '../constants'
import '../auth.css'

export default function Login() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const { user } = useAppSelector((state) => state.auth)

    const onSubmit = (data: LoginSchemaType) => {
        startTransition(async () => {
            const { error, emailVerified } = await signInWithEmail(
                data.email,
                data.password,
            )
            if (!error && emailVerified) {
                router.push(AppRoutes.DASHBOARD)
            }
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<LoginSchemaType>({
        schema: LoginSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    })

    useEffect(() => {
        if (user && user.emailVerified) {
            router.push(AppRoutes.DASHBOARD)
        }
    }, [router, user])

    if (user && !user?.emailVerified) {
        return <EmailVerification email={user?.email} />
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card className='auth_card'>
                <CardHeader className='auth_header'>
                    <CardTitle>{auth_constant.login.form_title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map(({ label, name, placeholder }, index) => (
                            <div key={index}>
                                <Label>{label}:</Label>
                                <Input
                                    placeholder={placeholder}
                                    className='my-2'
                                    {...register(name)}
                                />
                                <FormMessage fieldError={errors[name]} />
                            </div>
                        ))}

                        <div>
                            <Button
                                type='submit'
                                className='auth_submit'
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <DotSpinner />
                                ) : (
                                    auth_constant.login.submit_btn
                                )}
                            </Button>
                        </div>
                        <div className='flex gap-3 items-center justify-center mb-4'>
                            <p>{auth_constant.login.forget_password}</p>
                            <button
                                type='button'
                                className='font-semibold'
                                onClick={() =>
                                    router.push(AppRoutes.RESET_PASSWORD)
                                }
                            >
                                {auth_constant.login.reset_btn}
                            </button>
                        </div>
                    </form>

                    <OrDivider text="" />
                    <div className='flex gap-3 items-center justify-center mb-4'>
                        <p>{auth_constant.login.no_account}</p>
                        <Link
                            href={AppRoutes.SIGNUP}
                            className='font-semibold text-blue-500'
                        >
                            {' '}
                            {auth_constant.login.redirect_to_sign_up}
                        </Link>
                    </div>

                    <OrDivider text='or' />
                    <GoogleButton text={auth_constant.login.google} />
                </CardContent>
            </Card>
        </div>
    )
}

interface LoginFields {
    label: string
    name: keyof LoginSchemaType
    placeholder: string
}

const fields: LoginFields[] = [
    {
        label: auth_fields_const.login.emailLabel,
        name: auth_fields_const.login.emailName as keyof LoginSchemaType,
        placeholder: auth_fields_const.login.emailPlaceholder,
    },
    {
        label: auth_fields_const.login.passwordLabel,
        name: auth_fields_const.login.passwordName as keyof LoginSchemaType,
        placeholder: auth_fields_const.login.passwordPlaceholder,
    },
]
