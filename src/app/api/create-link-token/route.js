import { NextResponse } from 'next/server'
import { plaidClient } from '../../../lib/plaid'

export async function POST() {
  const tokenResponse = await plaidClient.linkTokenCreate({
    user: { client_user_id: process.env.PLAID_CLIENT_ID },
    client_name: "Plaid's Tiny Quickstart",
    language: 'en',
    products: ['auth'],
    country_codes: ['US'],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  })

  return NextResponse.json(tokenResponse.data)
}
