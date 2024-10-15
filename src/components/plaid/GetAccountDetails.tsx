'use client'
import { Button } from '@/components/ui/button'
import { useFormCollectionState } from '@/hooks/useFormState'
import { BankingDetailType, StepName } from '@/interface'
import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'

export default function LinkAccount({
    bankAccountKey,
}: {
    bankAccountKey: 'personalAccountNo' | 'businessAccountNo'
}) {
    const [formState, setFormState, updateFormStep] = useFormCollectionState()
    const [token, setToken] = useState(null)
    const [accountDetails, setAccountDetails] = useState<any>(
        formState.steps['Banking Detail'].values[bankAccountKey],
    )

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

    // eslint-disable react-hooks/exhaustive-deps
    const onSuccess = useCallback(
        async (publicToken: string) => {
            const res = await fetch('/api/exchange-public-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_token: publicToken }),
            })
            const { access_token } = await res.json()
            const accountDetails = await getAccountDetails(access_token)
            if (accountDetails.ok) {
                console.log(
                    'accountDetails.data.accounts: ',
                    accountDetails.data.accounts,
                )
                const data: BankingDetailType = {
                    ...formState.steps['Banking Detail'].values,
                    [bankAccountKey]: accountDetails.data.accounts[0],
                }
                updateFormStep(StepName.BankingDetail, data, 'completed')
                setAccountDetails(accountDetails.data.accounts?.[0])
            }
        },
        [bankAccountKey, formState.steps, updateFormStep],
    )

    const { open, ready } = usePlaidLink({
        token,
        onSuccess,
    })

    return accountDetails ? (
        <div>
            <div className='flex my-1 rounded justify-between border p-4 shadow'>
                <p className='font-semibold'>{accountDetails?.name}</p>
                <p className='bg-gray-400 rounded p-1'>
                    {accountDetails?.mask}
                </p>
            </div>
        </div>
    ) : (
        <Button
            className='mt-1'
            type='button'
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
