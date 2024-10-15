import { DocumentData, doc, getFirestore } from 'firebase/firestore'

export const fetchCollectionDocRef = async (
    collectionName: string,
    id: string,
): Promise<DocumentData | undefined> => {
    try {
        const firestore = getFirestore()
        const docSnaphot = await doc(firestore, collectionName, id)
        return docSnaphot
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        return undefined
    }
}
