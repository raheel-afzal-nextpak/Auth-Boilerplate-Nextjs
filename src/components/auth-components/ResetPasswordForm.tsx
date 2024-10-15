'use client'
import { auth_constant } from '@/app/auth/constants'
import useAppForm from '@/hooks/useAppForm'
import { ResetPasswordSchemaType } from '@/interface'
import { AppRoutes } from '@/lib/routes'
import { resetPassword } from '@/repository/firestore/utils/FireAuth'
import { ResetPasswordSchema } from '@/schema/authSchema'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import DotSpinner from '../common/DotSpinner'
import { FormMessage } from '../common/FormMessage'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
export function ResetPasswordForm() {
    const { reset_password } = auth_constant
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const onSubmit = (data: ResetPasswordSchemaType) => {
        startTransition(async () => {
            const { isSent } = await resetPassword(data.email)
            if (isSent) {
                router.push(AppRoutes.LOGIN)
            }
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useAppForm<ResetPasswordSchemaType>({
        schema: ResetPasswordSchema,
        defaultValues: {
            email: '',
        },
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Label>{reset_password.email_label}</Label>
            <Input
                className='my-2'
                type='email'
                {...register('email')}
            />
            <FormMessage fieldError={errors.email} />

            <Button
                disabled={isPending}
                type='submit'
                className='my-4 w-full'
            >
                {isPending ? <DotSpinner /> : 'Submit'}
            </Button>
        </form>
    )
}
