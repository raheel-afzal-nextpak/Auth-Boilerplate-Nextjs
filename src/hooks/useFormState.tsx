import { createForm, updateForm } from '@/domains/form'
import { StepFormMapping, StepName } from '@/interface'
import { formStateAtom } from '@/recoil/formState'
import { useAppSelector } from '@/store/store'
import { Draft, produce } from 'immer'
import { useRecoilState } from 'recoil'

export const useFormCollectionState = () => {
    const [formState, setFormState] = useRecoilState(formStateAtom)
    const { user } = useAppSelector((state) => state.auth)

    const updateFormStep = <K extends StepName>(
        stepName: K,
        values: StepFormMapping[K],
        formStateType: 'completed' | 'initiated' = 'completed',
    ) => {
        let formPayload: typeof formState
        let shouldCreateForm = false

        setFormState(
            produce((draft: Draft<typeof formState>) => {
                draft.steps[stepName].values = values as Draft<
                    StepFormMapping[K]
                >

                draft.steps[stepName].formState = formStateType

                // -------------- Prepare form state to be stored in the database ---------------

                formPayload = JSON.parse(JSON.stringify(draft))

                shouldCreateForm = !draft.id
            }),
        )

        // -------------- form state to the database ⤵️ ---------------
        const storeToDatabase = async () => {
            formPayload.selectedIndex = formPayload.selectedIndex + 1
            if (shouldCreateForm) {
                const userFormId = await createForm(formPayload)

                if (userFormId && user) {
                    setFormState(
                        produce((draft: Draft<typeof formState>) => {
                            draft.id = userFormId
                        }),
                    )
                }
            } else {
                if (formPayload.id) {
                    await updateForm(formPayload)
                }
            }
        }
        storeToDatabase()
    }

    return [formState, setFormState, updateFormStep] as const
}
