'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { FSCollection } from '@/interface'
import { fetchUser } from '@/domains/user'

export default function Page() {
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        const db = getFirestore()
        const querySnapshot = await getDocs(
            collection(db, FSCollection.FORM_COLLECTION),
        )
        const temp: any = []
        for (const doc of querySnapshot.docs) {
            const userId = doc.data().uid
            const userData = await fetchUser(userId)
            const bankingDetails = doc.data().steps['Banking Detail'].values

            //business
            const bussinessBankName = bankingDetails?.businessAccountNo
                ? `${bankingDetails?.businessAccountNo?.name} - ${bankingDetails?.businessAccountNo?.mask}`
                : ''
            const bussinessBankType = bankingDetails?.businessAccountNo?.type
                ? `${bankingDetails?.businessAccountNo?.type} - ${bankingDetails?.businessAccountNo?.subtype}`
                : ''
            const bussinessAvailablebalance =
                bankingDetails.businessAccountNo?.balances?.available || ''
            const bussinessCurrentbalance =
                bankingDetails.businessAccountNo?.balances?.current || ''

            //personal
            const personalBankName = bankingDetails?.personalAccountNo?.name
                ? `${bankingDetails?.personalAccountNo?.name} - ${bankingDetails?.personalAccountNo?.mask}`
                : ''
            const personalBankType = bankingDetails?.personalAccountNo?.type
                ? `${bankingDetails?.personalAccountNo?.type} - ${bankingDetails?.personalAccountNo?.subtype}`
                : ''
            const personalAvailablebalance =
                bankingDetails.personalAccountNo?.balances?.available || ''
            const personalCurrentbalance =
                bankingDetails.personalAccountNo?.balances?.current || ''

            const obj = {
                id: doc.id,
                ...userData,
                bussinessBankName,
                bussinessBankType,
                bussinessAvailablebalance,
                bussinessCurrentbalance,
                personalBankName,
                personalBankType,
                personalAvailablebalance,
                personalCurrentbalance,
            }
            temp.push(obj)
        }
        setFormData(temp)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return loading == false ? (
        <div className='w-screen h-screen flex items-center justify-center'>
            <Card
                className='auth_card'
                style={{ maxWidth: '1400px', overflowX: 'auto' }}
            >
                <CardHeader className='auth_header'>
                    <CardTitle>Payment Detail</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='table-container'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className=''>
                                        B.BankName
                                    </TableHead>
                                    <TableHead className=''>
                                        B.BankType
                                    </TableHead>
                                    <TableHead className=' whitespace-nowrap'>
                                        B.Available Balance
                                    </TableHead>
                                    <TableHead className='whitespace-nowrap'>
                                        B.Current Balance
                                    </TableHead>
                                    <TableHead className=' whitespace-nowrap'>
                                        P.BankName
                                    </TableHead>
                                    <TableHead className=' whitespace-nowrap'>
                                        P.BankType
                                    </TableHead>
                                    <TableHead className='whitespace-nowrap'>
                                        P.Available Balance
                                    </TableHead>
                                    <TableHead className=' whitespace-nowrap'>
                                        P.Current Balance
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {formData?.map((invoice: any, index) => (
                                    <TableRow
                                        key={index}
                                        className={
                                            index % 2 === 0 ? 'bg-gray-300' : ''
                                        }
                                    >
                                        <TableCell className='font-medium whitespace-nowrap'>
                                            {invoice.name}
                                        </TableCell>
                                        <TableCell className='whitespace-nowrap'>
                                            {invoice.email}
                                        </TableCell>
                                        <TableCell className='whitespace-nowrap'>
                                            {invoice.bussinessBankName}
                                        </TableCell>
                                        <TableCell className=' whitespace-nowrap'>
                                            {invoice.bussinessBankType}
                                        </TableCell>
                                        <TableCell className=' whitespace-nowrap'>
                                            {invoice.bussinessAvailablebalance}
                                        </TableCell>
                                        <TableCell className=' whitespace-nowrap'>
                                            {invoice.bussinessCurrentbalance}
                                        </TableCell>
                                        <TableCell className='whitespace-nowrap'>
                                            {invoice.personalBankName}
                                        </TableCell>
                                        <TableCell className=' whitespace-nowrap'>
                                            {invoice.personalBankType}
                                        </TableCell>
                                        <TableCell className=' whitespace-nowrap'>
                                            {invoice.personalAvailablebalance}
                                        </TableCell>
                                        <TableCell className=' whitespace-nowrap'>
                                            {invoice.personalCurrentbalance}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    ) : (
        ''
    )
}
