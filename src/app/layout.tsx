'use client'
import { AuthGuard } from '@/components/auth-components'
import AppLoader from '@/components/common/AppLoader'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import Providers from '@/store/Providers'
import { Inter as FontSans } from 'next/font/google'
import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'

import { LoadScriptNext } from '@react-google-maps/api'
import '../styles/globals.css'

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable,
                )}
            >
                <Providers>
                    <RecoilRoot>
                        <Suspense fallback={<AppLoader />}>
                            <AuthGuard>
                                <LoadScriptNext
                                    googleMapsApiKey={
                                        process.env
                                            .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
                                    }
                                    libraries={['places']}
                                    loadingElement={<AppLoader />}
                                >
                                    <>{children}</>
                                </LoadScriptNext>
                            </AuthGuard>
                        </Suspense>
                    </RecoilRoot>
                </Providers>
                <Toaster />
            </body>
        </html>
    )
}
