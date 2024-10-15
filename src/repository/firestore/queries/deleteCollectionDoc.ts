import { deleteDoc, doc, getFirestore, writeBatch } from 'firebase/firestore'

// return with created id
export const deleteCollectionDoc = async (
    id: string,
    collectionName: string,
): Promise<void> => {
    const firestore = getFirestore()
    return await deleteDoc(doc(firestore, collectionName, id))
}

export const deleteCollectionDocs = async (
    ids: Array<string>,
    collectionName: string,
): Promise<void> => {
    const firestore = getFirestore()
    const batch = writeBatch(firestore)
    ids.forEach((id) => {
        const docRef = doc(firestore, collectionName, id)
        batch.delete(docRef)
    })
    await batch.commit()
}
