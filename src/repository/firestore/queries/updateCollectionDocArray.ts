import { Timestamp, doc, getFirestore, updateDoc } from 'firebase/firestore'
type DailyWorkSchedule = {
    start: Timestamp
    end: Timestamp
}
type Data = { id: string; weeklyWorkSchedule: DailyWorkSchedule[] }

export const updateCollectionDocArray = async <TData extends Data>(
    data: TData,
    collectionName: string,
) => {
    const firestore = getFirestore()
    const docRef = doc(firestore, collectionName, data.id)
    await updateDoc(docRef, {
        weeklyWorkSchedule: data.weeklyWorkSchedule,
    })
}
