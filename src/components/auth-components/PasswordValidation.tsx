"use client"
import { CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export const PasswordValidation: React.FC<{ password: string }> = ({
    password,
}) => {
    const [passedValidations, setPassedValidations] = useState<string[]>([])

    useEffect(() => {
        if (password) {
            const newPassedValidations = passValidation.filter(
                (validation: string): boolean => {
                    switch (validation) {
                        case 'One number required.':
                            return /[0-9]/.test(password)
                        case 'One uppercase letter required.':
                            return /[A-Z]/.test(password)
                        case 'One lowercase letter required.':
                            return /[a-z]/.test(password)
                        case 'One special character required.':
                            return /[!@#$%^&*()]/.test(password)
                        case '8 characters minimum.':
                            return password.length >= 8
                        default:
                            return false
                    }
                },
            )
            setPassedValidations(newPassedValidations)
        } else {
            setPassedValidations([])
        }
    }, [password])

    return (
        <div className='ml-2 pt-1'>
            {passValidation.map(
                (validation: string): JSX.Element => (
                    <div
                        key={validation}
                        className='flex gap-3 my-2 items-center'
                    >
                        {passedValidations.includes(validation) ? (
                            <CheckCircle
                                size={18}
                                className='text-green-500'
                            />
                        ) : (
                            <CheckCircle
                                size={18}
                                className='text-gray-500'
                            />
                        )}
                        <p
                            className={`text-sm ${
                                passedValidations.includes(validation)
                                    ? 'text-green-500'
                                    : 'text-gray-500'
                            }`}
                        >
                            {validation}
                        </p>
                    </div>
                ),
            )}
        </div>
    )
}

const passValidation = [
    'One number required.',
    'One uppercase letter required.',
    'One lowercase letter required.',
    'One special character required.',
    '8 characters minimum.',
]
