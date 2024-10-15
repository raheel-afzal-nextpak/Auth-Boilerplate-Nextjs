import { E164Number } from 'libphonenumber-js/core'
import React from 'react'
import PhoneInput from 'react-phone-number-input'

interface PhoneFieldProps {
    value: E164Number
    onChange: (value: E164Number) => void
    hide?: boolean
}
const PhoneField: React.FC<PhoneFieldProps> = ({ value, onChange, hide }) => {
    return (
        <PhoneInput
            className={`border border-collapse rounded-md p-2 ${
                hide ? '!hidden' : ''
            }`}
            international
            defaultCountry='US'
            placeholder='Enter phone number'
            value={value}
            onChange={onChange}
        />
    )
}

export default PhoneField
