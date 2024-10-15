'use client'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'

export default function Home() {
    const [token, setToken] = useState(null)

    useEffect(() => {
        const createLinkToken = async () => {
            const response = await fetch('/api/create-link-token', {
                method: 'POST',
            })
            const { link_token } = await response.json()
            setToken(link_token)
        }
        createLinkToken()
    }, [])

    const onSuccess = useCallback(async (publicToken: string) => {
        const res = await fetch('/api/exchange-public-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token: publicToken }),
        })
        const { access_token } = await res.json()
        const accountDetails = await getAccountDetails(access_token)
        console.log('accountDetails: ', accountDetails)

        // const transactions = await getTransactions(
        //     access_token,
        //     '2023-01-01',
        //     '2023-12-31',
        // )

        // console.log('>>>transactions: ', transactions)
        console.log('>>>res: /api/exchange-public-token', res)
    }, [])

    const { open, ready } = usePlaidLink({
        token,
        onSuccess,
    })
    console.log('>>>token: ', token)
    console.log('>>>ready: ', ready)

    return (
        <Button
            onClick={() => open()}
            disabled={!ready}
        >
            <strong>Link account</strong>
        </Button>
    )
}

const getAccountDetails = async (accessToken: string) => {
    const response = await fetch('/api/get-account-details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
    })
    const result = await response.json()
    return result
}

const getTransactions = async (
    accessToken: string,
    startDate: string,
    endDate: string,
) => {
    const maxRetries = 5
    const retryDelay = 30000 // 30 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const response = await fetch('/api/get-transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                access_token: accessToken,
                start_date: startDate,
                end_date: endDate,
            }),
        })

        const data = await response.json()
        if (response.ok) {
            return data
        }

        if (
            data.error &&
            data.error.message.includes('transactions data could be extracted')
        ) {
            console.log(
                `Attempt ${attempt} failed. Retrying in ${
                    retryDelay / 1000
                } seconds...`,
            )
            await new Promise((resolve) => setTimeout(resolve, retryDelay))
        } else {
            throw new Error(data.error.message)
        }
    }

    throw new Error('Failed to fetch transactions after multiple attempts.')
}
