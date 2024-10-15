import { ResetPasswordForm } from '@/components/auth-components'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AppRoutes } from '@/lib/routes'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { auth_constant } from '../constants'
export default function ResetPassword() {
    const { reset_password } = auth_constant
    return (
        <Card className='w-[28rem]'>
            <CardHeader>
                <CardTitle className='text-center'>
                    <div className='flex  items-center justify-between max-w-[18rem]'>
                        <Link href={AppRoutes.LOGIN}>
                            <ArrowLeftIcon />
                        </Link>
                        {reset_password.form_title}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResetPasswordForm />
            </CardContent>
        </Card>
    )
}
