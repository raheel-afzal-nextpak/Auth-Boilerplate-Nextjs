import { FieldError } from 'react-hook-form'

export const FormMessage = ({
    fieldError,
}: {
    fieldError: FieldError | undefined
}) => {
    return (
        fieldError && (
            <p className='text-red-500 font-semibold  text-xs'>
                {fieldError.message}
            </p>
        )
    )
}
