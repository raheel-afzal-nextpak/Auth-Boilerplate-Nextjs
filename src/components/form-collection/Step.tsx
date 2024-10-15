// Step.tsx
'use client'

import { dashboard_constant, formSteps } from '@/app/dashboard/constants'
import useAppForm from '@/hooks/useAppForm'
import { useFormCollectionState } from '@/hooks/useFormState'
import {
    FieldType,
    FormField,
    FormStep,
    StepName,
    UnifiedFormTypes,
} from '@/interface'
import { produce } from 'immer'
import { E164Number } from 'libphonenumber-js/core'
import { SubmitHandler } from 'react-hook-form'
import 'react-phone-number-input/style.css'
import { ZodSchema } from 'zod'
import AutoComplete from '../common/AutoComplete'
import { FormMessage } from '../common/FormMessage'
import LinkAccount from '../plaid/GetAccountDetails'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import LocationField from './LocationField'
import PhoneField from './PhoneField'
import RadioButtonGroup from './RadioButton'

interface StepProp {
    fields: FormField[]
    indexNo: number
    stepName: StepName
    onNext: () => void
    onPrev: () => void
    setFormStepsState: React.Dispatch<React.SetStateAction<FormStep<any>[]>>
    schema: ZodSchema
}

export const Step = ({
    fields,
    indexNo,
    stepName,
    onNext,
    onPrev,
    setFormStepsState,
    schema,
}: StepProp) => {
    const { form_content } = dashboard_constant

    const [formState, setFormState, updateFormStep] = useFormCollectionState()
    const currentValues = formState.steps[stepName].values
    const isLastStep = indexNo === formSteps.length - 1
    const isFormCompleted = Object.values(formState.steps).every(
        (step) => step.formState === 'completed',
    )

    const handleFormComplete = () => {
        setFormState(
            produce((draft) => {
                draft.isFormCompleted = true
            }),
        )
    }

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useAppForm<UnifiedFormTypes>({
        schema: schema,
        defaultValues: currentValues as UnifiedFormTypes,
    })

    const onSubmit: SubmitHandler<UnifiedFormTypes> = async (data) => {
        updateFormStep(stepName, data, 'completed')

        if (!isLastStep) {
            onNext()
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map((field, index) => (
                <div
                    key={index}
                    className='mb-4'
                >
                    <div className='mb-4'>
                        <div className='flex items-center gap-5'>
                            <label className='block mb-1'>{field.label} </label>
                            {field.sameAsBusiness == 'no' && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        setFormStepsState(
                                            produce((draft) => {
                                                draft[indexNo].fields[
                                                    index
                                                ].sameAsBusiness = 'yes'
                                            }),
                                        )
                                        setFormState(
                                            produce((draft) => {
                                                draft.steps[stepName].values = {
                                                    ...draft.steps[stepName]
                                                        .values,
                                                    [field.name]: '',
                                                }
                                            }),
                                        )
                                        setValue(field.name, '')
                                    }}
                                >
                                    <p className='text-xs font-semibold underline hover:text-blue-500'>
                                        {form_content.sameAsBusiness}?
                                    </p>
                                </button>
                            )}
                        </div>
                        {(field.type === FieldType.TEXT ||
                            field.type === FieldType.NUMBER) && (
                            <small className='block mb-1'>
                                {field.helpingText}
                            </small>
                        )}
                        {field.sameAsBusiness === 'yes' &&
                        !watch(field.name) ? (
                            <div className='border-2 flex  justify-between items-center border-dashed px-4 py-2 bg-gray-100 rounded'>
                                <p className='text-sm'>
                                    {' '}
                                    {form_content.sameAsBusiness}
                                </p>
                                <button
                                    onClick={() =>
                                        setFormStepsState(
                                            produce((draft) => {
                                                draft[indexNo].fields[
                                                    index
                                                ].sameAsBusiness = 'no'
                                            }),
                                        )
                                    }
                                    type='button'
                                    className=' mt-2 bg-blue-100 border border-blue-400 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 text-sm font-semibold rounded'
                                >
                                    {form_content.separateField(field.label)}
                                </button>
                            </div>
                        ) : field.type === FieldType.RADIO_GROUP ? (
                            <RadioButtonGroup
                                label={field.label}
                                options={field.options || []}
                                register={register(field.name)}
                            />
                        ) : field.type === FieldType.LOCATION ? (
                            <LocationField
                                value={watch(field.name)}
                                onChange={(newLocation) =>
                                    setValue(field.name, newLocation)
                                }
                            />
                        ) : field.type === FieldType.PHONE_NUMBER ? (
                            <PhoneField
                                value={watch(field.name) as E164Number}
                                onChange={(value) =>
                                    setValue(field.name, value as E164Number)
                                }
                            />
                        ) : field.type === FieldType.AUTO_COMPLETE ? (
                            <AutoComplete
                                list={field.options}
                                value={watch(field.name) as string}
                                onChange={(e) => {
                                    setValue(field.name, e.value)
                                }}
                            />
                        ) : (
                            <div className=' gap-2'>
                                {field.name === 'businessAccountNo' ||
                                field.name === 'personalAccountNo' ? (
                                    <LinkAccount bankAccountKey={field.name} />
                                ) : (
                                    <Input
                                        type={field.type}
                                        {...register(field.name, {
                                            valueAsNumber:
                                                field.type === FieldType.NUMBER
                                                    ? true
                                                    : false,
                                        })}
                                        placeholder={`Enter the ${field.label}`}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <FormMessage fieldError={errors[field.name]} />
                </div>
            ))}
            <div className='flex mt-5 justify-between'>
                {indexNo > 0 && (
                    <Button
                        type='button'
                        onClick={onPrev}
                    >
                        {form_content.backBtn}
                    </Button>
                )}
                <Button type='submit'>
                    {isLastStep
                        ? form_content.saveBtn
                        : form_content.saveAndNext}
                </Button>
            </div>
            <div className='mt-16 flex justify-center'>
                {isLastStep && isFormCompleted && (
                    <Button
                        onClick={handleFormComplete}
                        type='button'
                    >
                        {form_content.finishBtn}
                    </Button>
                )}
            </div>
        </form>
    )
}
