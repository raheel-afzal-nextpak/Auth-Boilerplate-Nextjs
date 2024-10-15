import { doc, getFirestore, updateDoc } from 'firebase/firestore'
import { removeUndefinedAndGetNew } from '../utils/dataCleaning'

type Data = { id: string }

export const updateCollectionDocFields = async <TData extends Data>(
    data: TData,
    collectionName: string,
    transformToDto?: (item: TData) => TData,
) => {
    const firestore = getFirestore()

    let dto = data
    if (transformToDto) {
        dto = transformToDto(data)
    }

    const docRef = doc(firestore, collectionName, data.id)
    const cleanedData = removeUndefinedAndGetNew(dto)
    await updateDoc(docRef, cleanedData)
}
