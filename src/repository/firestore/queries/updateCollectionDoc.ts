import { doc, DocumentData, getFirestore, setDoc } from 'firebase/firestore'

type Data = { id: string }

export const updateCollectionDoc = async <
    TData extends Data,
    R extends DocumentData,
>(
    data: TData,
    collectionName: string,
    transformToDto: (item: TData) => R,
    merge = true,
) => {
    const firestore = getFirestore()
    const dto = transformToDto(data)
    const docRef = doc(firestore, collectionName, data.id)
    await setDoc(docRef, dto, { merge })
}
