import { auth_constant } from '@/app/auth/constants'
import { useEmailCooldown } from '@/hooks/useEmailCooldown'
import { AppRoutes } from '@/lib/routes'
import { sendVerificationEmail } from '@/repository/firestore/utils/FireAuth'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useTransition } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const EmailVerification = ({ email }: { email: string }) => {
    const { email_verification } = auth_constant
    const [isPending, startTransition] = useTransition()
    const { countdown, resetCooldown } = useEmailCooldown(60000)

    const handleSendMagicLink = () => {
        if (countdown > 0) {
            return
        }
        startTransition(async () => {
            await sendVerificationEmail()
            resetCooldown()
        })
    }

    return (
        <div className='h-screen w-screen bg-gray-50 flex items-center justify-center'>
            <Card className='max-w-[30rem] mx-2 p-6'>
                <CardHeader>
                    <CardTitle className='mx-auto'>
                        {email_verification.platform_name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col justify-center text-center'>
                        <CheckCircle
                            className='mx-auto text-green-500'
                            size={60}
                        />

                        <p className='my-2 text-xl font-bold text-gray-700'>
                            {email_verification.title}
                        </p>

                        <p className='font-medium text-gray-700 my-2'>
                            {email_verification.desc(email)}
                        </p>

                        <Button
                            disabled={isPending || countdown > 0}
                            onClick={handleSendMagicLink}
                            className='my-2 max-w-fit mx-auto'
                        >
                            {countdown > 0
                                ? email_verification.email_again_countdown(
                                      countdown,
                                  )
                                : email_verification.email_again}
                        </Button>

                        <Link
                            href={AppRoutes.SIGNUP}
                            className='text-blue-500 font-semibold my-2 text-lg'
                        >
                            {email_verification.redirect_to_sign_up}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default EmailVerification
