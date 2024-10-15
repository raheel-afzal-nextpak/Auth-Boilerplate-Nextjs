'use client'
import { Button } from '@/components/ui/button'
import { appleAuth } from '@/repository/firestore/utils/FireAuth'
import { useTransition } from 'react'
export function AppleButton() {
    const [isPending, startTransition] = useTransition()

    const handleAppleSignup = async (): Promise<void> => {
        startTransition(async () => {
            await appleAuth()
        })
    }
    return (
        <>
            <Button
                className='w-full flex items-center justify-center space-x-2'
                onClick={handleAppleSignup}
                disabled={isPending}
            >
                <span>Login with Apple</span>
            </Button>
        </>
    )
}
