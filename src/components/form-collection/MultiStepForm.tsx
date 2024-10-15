import { formSteps } from '@/app/dashboard/constants'
import { useFormCollectionState } from '@/hooks/useFormState'
import { StepName } from '@/interface'
import { Tab } from '@headlessui/react'
import { produce } from 'immer'
import { useCallback, useState } from 'react'
import { Step } from './Step'
import { StepperItem } from './StepperItem'
import ThanksMessage from './ThanksMessage'
const MultiStepForm = () => {
    const [form, setForm] = useFormCollectionState()
    const [formStepsState, setFormStepsState] = useState(formSteps)

    const next = useCallback(() => {
        setForm(
            produce((form) => {
                form.selectedIndex += 1
            }),
        )
    }, [setForm])

    const prev = useCallback(() => {
        setForm(
            produce((form) => {
                form.selectedIndex -= 1
            }),
        )
    }, [setForm])

    const setSelectedIndex = useCallback(
        (index: number) => {
            setForm(
                produce((form) => {
                    form.selectedIndex = index
                }),
            )
        },
        [setForm],
    )

    const selectedIndex = form.selectedIndex

    return form.isFormCompleted ? (
        <ThanksMessage />
    ) : (
        <div>
            <Tab.Group selectedIndex={selectedIndex}>
                <div className=' lg:flex '>
                    <div className='mr-4 lg:border-r p-6 w-full lg:w-2/5  overflow-auto border-b'>
                        <Tab.List className={'flex lg:block mb-6 '}>
                            {formStepsState.map((step, index) => {
                                const formKey = Object.keys(form.steps).find(
                                    (stepName) => stepName === step.stepName,
                                )

                                const formState =
                                    form.steps[formKey as StepName].formState

                                return (
                                    <Tab
                                        key={index}
                                        className={
                                            'flex flex-col outline-none min-w-max'
                                        }
                                    >
                                        <StepperItem
                                            key={index}
                                            selectedIndex={selectedIndex}
                                            isCompleted={
                                                formState === 'completed'
                                            }
                                            step={index}
                                            onSelect={() =>
                                                setSelectedIndex(index)
                                            }
                                            Icon={step.icon}
                                        >
                                            {step.stepName}
                                        </StepperItem>
                                    </Tab>
                                )
                            })}
                        </Tab.List>
                    </div>
                    <div className='py-10 px-6 w-full lg:w-3/5'>
                        <Tab.Panels>
                            {formStepsState.map((step, index) => (
                                <Tab.Panel key={index}>
                                    <div className='border-b pb-3 mb-5'>
                                        <h2 className='text-2xl text-center font-semibold '>
                                            {step.title}
                                        </h2>
                                        <small className='font-medium text-red-400 '>
                                            {step.subTitle || ''}
                                        </small>
                                    </div>

                                    <Step
                                        key={index}
                                        indexNo={index}
                                        fields={step.fields}
                                        schema={step.schema}
                                        stepName={step.stepName}
                                        onNext={next}
                                        onPrev={prev}
                                        setFormStepsState={setFormStepsState}
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </div>
                </div>
            </Tab.Group>
        </div>
    )
}

export default MultiStepForm
