'use client'
import { GoogleButton, PasswordValidation } from '@/components/auth-components'
import DotSpinner from '@/components/common/DotSpinner'
import { FormMessage } from '@/components/common/FormMessage'
import OrDivider from '@/components/common/OrDivider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useAppForm from '@/hooks/useAppForm'
import { SignupSchemaType } from '@/interface'
import { AppRoutes } from '@/lib/routes'
import { signUpWithEmail } from '@/repository/firestore/utils/FireAuth'
import { SignupSchema } from '@/schema/authSchema'
import Link from 'next/link'
import { useTransition } from 'react'
import { auth_constant, auth_fields_const } from '../constants'
import '../auth.css'

export default function Signup() {
    const [isPending, startTransition] = useTransition()

    const onSubmit = (data: SignupSchemaType) => {
        startTransition(async () => {
            await signUpWithEmail(data.email, data.password)
        })
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useAppForm<SignupSchemaType>({
        schema: SignupSchema,
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Card className='auth_card'>
                <CardHeader className='auth_header'>
                    <CardTitle>{auth_constant.sign_up.form_title}</CardTitle>
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

                        <PasswordValidation password={watch('password')} />

                        <div>
                            <Button
                                type='submit'
                                className='auth_submit'
                                disabled={isPending}
                            >
                                {isPending ? (
                                    <DotSpinner />
                                ) : (
                                    auth_constant.sign_up.submit_btn
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className='flex gap-3 items-center justify-center mb-4'>
                        <p>{auth_constant.sign_up.already_account}</p>
                        <Link
                            className='font-semibold text-blue-500'
                            href={AppRoutes.LOGIN}
                        >
                            {' '}
                            {auth_constant.sign_up.redirect_to_login}
                        </Link>
                    </div>
                    <OrDivider text='or' />
                    <GoogleButton text={auth_constant.sign_up.google} />
                </CardContent>
            </Card>
        </div>
    )
}

interface SignUpFields {
    label: string
    name: keyof SignupSchemaType
    placeholder: string
}
const fields: SignUpFields[] = [
    {
        label: auth_fields_const.signup.emailLabel,
        name: auth_fields_const.signup.emailName as keyof SignupSchemaType,
        placeholder: auth_fields_const.signup.emailPlaceholder,
    },
    {
        label: auth_fields_const.signup.passwordLabel,
        name: auth_fields_const.signup.passwordName as keyof SignupSchemaType,
        placeholder: auth_fields_const.signup.passwordPlaceholder,
    },
]
