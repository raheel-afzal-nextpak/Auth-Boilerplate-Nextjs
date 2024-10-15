import { NextRequest, NextResponse } from 'next/server'
import { TransactionsGetRequest } from 'plaid'
import { plaidClient } from '../../../lib/plaid'

export async function POST(req: NextRequest) {
    const { access_token, start_date, end_date } = await req.json()

    const request: TransactionsGetRequest = {
        access_token,
        start_date,
        end_date,
    }
    try {
        const response = await plaidClient.transactionsGet(request)
        console.log('response: ', response)
        let transactions = response.data.transactions
        const total_transactions = response.data.total_transactions
        // Manipulate the offset parameter to paginate
        // transactions and retrieve all available data
        while (transactions.length < total_transactions) {
            const paginatedRequest: TransactionsGetRequest = {
                access_token: access_token,
                start_date: '2018-01-01',
                end_date: '2020-02-01',
                options: {
                    offset: transactions.length,
                },
            }
            const paginatedResponse = await plaidClient.transactionsGet(
                paginatedRequest,
            )
            transactions = transactions.concat(
                paginatedResponse.data.transactions,
            )
        }

        return NextResponse.json({ ok: true, transactions })
    } catch (error) {
        console.log('error: ', error)
        return NextResponse.json({ ok: false, error: error })
    }
}
