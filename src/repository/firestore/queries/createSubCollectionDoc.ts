import { addDoc, collection, doc, getFirestore } from 'firebase/firestore'

// return with created id
export const createSubCollectionDoc = async (
    data: any,
    parentCollectionName: string,
    parentDocId: string,
    collectionName: string,
): Promise<string> => {
    const firestore = getFirestore()
    const parentDocRef = doc(
        firestore,
        `${parentCollectionName}/${parentDocId}`,
    )
    const subCollectionRef = collection(parentDocRef, collectionName)
    const docRef = await addDoc(subCollectionRef, data)
    return docRef.id
}
