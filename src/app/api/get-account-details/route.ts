import { NextRequest, NextResponse } from 'next/server'
import { plaidClient } from '../../../lib/plaid'
export async function POST(req: NextRequest) {
    const { access_token } = await req.json()

    try {
        const response = await plaidClient.accountsGet({
            access_token,
        })
        return NextResponse.json({ ok: true, data: response.data })
    } catch (error: any) {
        return NextResponse.json({ ok: false, error: error.message })
    }
}
