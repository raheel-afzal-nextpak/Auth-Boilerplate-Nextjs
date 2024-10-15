import { doc, getFirestore, setDoc } from 'firebase/firestore'

// return with created id
export const setCollectionDoc = async <T extends { [x: string]: any }>(
    data: T,
    uid: string,
    collectionName: string,
): Promise<string> => {
    const firestore = getFirestore()
    await setDoc(doc(firestore, collectionName, uid), data)
    return uid
}
