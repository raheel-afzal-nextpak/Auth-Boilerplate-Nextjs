import { auth } from '@/config/firebase'
import { FSCollection } from '@/interface'
import { createCollectionDoc } from '@/repository/firestore/queries/createCollectionDoc'
import { toDto } from '../transformer/toDto'

// return with created id
export const createForm = (data: any) => {
    const uid = auth.currentUser?.uid
    return createCollectionDoc(
        { ...data, uid },
        FSCollection.FORM_COLLECTION,
        toDto,
    )
}
