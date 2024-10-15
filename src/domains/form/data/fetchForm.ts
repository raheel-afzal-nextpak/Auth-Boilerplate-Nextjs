import { FSCollection, StepFormMapping } from '@/interface'
import { FormState } from '@/recoil/formState'
import {
    FetchOptions,
    fetchCollectionDocs,
} from '@/repository/firestore/queries/fetchCollectionDocs'
import { fromDto } from '../transformer/fromDto'

type FormType = FormState<StepFormMapping>
export const fetchForm = (options?: FetchOptions) => {
    const result = fetchCollectionDocs<FormType, FormType>(
        FSCollection.FORM_COLLECTION,
        fromDto,
        options,
    )
    return result
}
