// components/RadioButtonGroup.tsx
import { UseFormRegisterReturn } from 'react-hook-form'

interface RadioButtonGroupProps {
    label: string
    options: string[]
    register: UseFormRegisterReturn
}

const RadioButtonGroup = ({
    label,
    options,
    register,
}: RadioButtonGroupProps) => {
    return (
        <div className='mb-4'>
            {options.map((option, idx) => (
                <fieldset key={idx}>
                    <label>
                        <input
                            type='radio'
                            value={option}
                            {...register}
                            className='accent-primary'
                        />
                        <span className='cursor-pointer ml-2'>{option}</span>
                    </label>
                </fieldset>
            ))}
        </div>
    )
}

export default RadioButtonGroup
