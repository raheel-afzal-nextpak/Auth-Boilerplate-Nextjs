import {
    LoginSchemaType,
    ResetPasswordSchemaType,
    SignupSchemaType,
} from '@/interface'
import * as z from 'zod'

export const LoginSchema: z.ZodSchema<LoginSchemaType> = z.object({
    email: z.string().email({
        message: 'Email must be valid',
    }),
    password: z.string(),
})

export const SignupSchema: z.ZodSchema<SignupSchemaType> = z.object({
    name: z.string(),
    email: z.string().email({
        message: 'Email must be valid',
    }),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .regex(/^(?=.*[0-9]).*$/, 'Password must include at least one number.')
        .regex(
            /^(?=.*[A-Z]).*$/,
            'Password must include at least one uppercase letter.',
        )
        .regex(
            /^(?=.*[a-z]).*$/,
            'Password must include at least one lowercase letter.',
        )
        .regex(
            /^(?=.*[!@#$%^&*()]).*$/,
            'Password must include at least one special character.',
        ),
})

export const ResetPasswordSchema: z.ZodSchema<ResetPasswordSchemaType> =
    z.object({
        email: z.string().email({
            message: 'Email must be valid',
        }),
    })
