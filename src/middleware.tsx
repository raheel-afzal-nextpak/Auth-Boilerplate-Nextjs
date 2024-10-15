import type { NextMiddleware } from 'next/server'
import { NextResponse } from 'next/server'
import { AppRoutes } from './lib/routes'

const middleware: NextMiddleware = async (request) => {
    const { pathname } = request.nextUrl
    const isStaticAsset = pathname.startsWith('/_next/static/')
    const isApiRoute = pathname.startsWith('/api/')
    const isAuthenticated = Boolean(request.cookies.get('auth-token'))
    const url = request.nextUrl.clone()
    const isAuthPage = url.pathname.includes('/auth')

    if (isStaticAsset || isApiRoute) {
        return NextResponse.next()
    }

    if (!isAuthenticated && !isAuthPage) {
        url.pathname = AppRoutes.LOGIN
        return NextResponse.redirect(url)
    }

    if (isAuthenticated && isAuthPage) {
        url.pathname = AppRoutes.DASHBOARD
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export default middleware
