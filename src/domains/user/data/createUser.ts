import { FSCollection, User } from '@/interface'
import { setCollectionDoc } from '@/repository/firestore/queries/setCollectionDoc'

// return with created id
export const createUser = (data: User, uid: string) =>
    setCollectionDoc<User>(data, uid, FSCollection.USERS)
