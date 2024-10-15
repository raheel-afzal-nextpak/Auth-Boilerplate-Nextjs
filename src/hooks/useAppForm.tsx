import { zodResolver } from '@hookform/resolvers/zod'
import {
    DefaultValues,
    FieldValues,
    UseFormProps,
    useForm,
} from 'react-hook-form'
import { ZodSchema } from 'zod'

interface UseCustomFormOptions<TFormValues extends FieldValues> {
    schema: ZodSchema<TFormValues>
    defaultValues: TFormValues
}

export default function useAppForm<TFormValues extends FieldValues>({
    schema,
    defaultValues,
}: UseCustomFormOptions<TFormValues>) {
    const formOptions: UseFormProps<TFormValues> = {
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: defaultValues as DefaultValues<TFormValues>,
    }

    const form = useForm<TFormValues>(formOptions)
    return form
}
