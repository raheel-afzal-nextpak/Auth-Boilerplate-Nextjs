import { setCookie } from 'cookies-next'
import { NextResponse } from 'next/server'
import { plaidClient } from '../../../lib/plaid'

export async function POST(req:any) {
  try {
    const { public_token } = await req.json()

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    })

    const access_token = exchangeResponse.data.access_token
    setCookie('access_token', access_token)

    return NextResponse.json({ ok: true, access_token })
  } catch (error) {
    console.log('error: ', error)
  }
}
