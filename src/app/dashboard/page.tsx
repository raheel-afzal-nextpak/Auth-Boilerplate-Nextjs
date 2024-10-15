'use client'
import AppLoader from '@/components/common/AppLoader'
import MultiForm from '@/components/form-collection/MultiStepForm'
import { Card, CardContent } from '@/components/ui/card'
import { fetchForm } from '@/domains/form/data/fetchForm'
import { useFormCollectionState } from '@/hooks/useFormState'
import { useAppSelector } from '@/store/store'
import { useEffect, useState } from 'react'

export default function page() {
    const { user } = useAppSelector((state) => state.auth)
    const [_, setFormState] = useFormCollectionState()
    const [loading, setLoading] = useState(false)

    const preFilledForm = async () => {
        setLoading(true)
        if (user) {
            const formData = await fetchForm({
                queries: [{ key: 'uid', op: '==', value: user?.id }],
            })
            if (formData.length > 0) {
                setFormState({ ...formData[0] })
            }
        }
        setLoading(false)
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        preFilledForm()
    }, [user])
    return loading ? (
        <AppLoader />
    ) : (
        <div className='container flex items-center justify-center mt-20'>
            <Card className='flex w-full max-w-3xl'>
                <CardContent className='p-0 overflow-x-auto w-full'>
                    <MultiForm />
                </CardContent>
            </Card>
        </div>
    )
}
