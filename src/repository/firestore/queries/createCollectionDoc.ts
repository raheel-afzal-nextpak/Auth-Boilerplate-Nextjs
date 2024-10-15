import { addDoc, collection, getFirestore } from 'firebase/firestore'

// return with created id
export const createCollectionDoc = async (
    data: any,
    collectionName: string,
    transformToDto?: (item: any) => void,
): Promise<string> => {
    const firestore = getFirestore()
    let dto = data

    if (transformToDto) {
        dto = transformToDto(data)
    }

    const docRef = await addDoc(collection(firestore, collectionName), dto)
    return docRef.id
}
