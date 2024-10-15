import { FSCollection } from '@/interface'
import { deleteCollectionDoc } from '@/repository/firestore/queries/deleteCollectionDoc'

// return with created id
export const deleteUser = (id: string) =>
    deleteCollectionDoc(id, FSCollection.USERS)
