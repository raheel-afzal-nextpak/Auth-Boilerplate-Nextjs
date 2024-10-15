import { FSCollection, StepFormMapping } from '@/interface'
import { FormState } from '@/recoil/formState'
import { updateCollectionDocFields } from '@/repository/firestore/queries/updateCollectionDocFields'
import { toDto } from '../transformer/toDto'

export const updateForm = (data: FormState<StepFormMapping>) => {
    updateCollectionDocFields(data, FSCollection.FORM_COLLECTION, toDto)
}
