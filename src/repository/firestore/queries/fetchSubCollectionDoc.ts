/* eslint-disable no-param-reassign */
import {
    doc,
    DocumentData,
    DocumentReference,
    Firestore,
    getDoc,
    getFirestore,
} from 'firebase/firestore'
import { get, set, update } from 'lodash'

type DocumentFetchOptions = {
    relationalCollections?: Array<{
        collectionName: string
        keyPath: string
        overrideKeyPathValue?: boolean
        key?: string
        mapKey?: string
    }>
}

export const fetchSubCollectionDoc = async <T extends DocumentData, R>(
    parentCollectionName: string,
    parentDocId: string,
    collectionName: string,
    dtoTransformer: (item: T, id: string) => R,
    id: string,
    options?: DocumentFetchOptions,
): Promise<R | undefined> => {
    try {
        const firestore = getFirestore()
        const parentDocRef = doc(
            firestore,
            `${parentCollectionName}/${parentDocId}`,
        )
        const subCollectionRef = doc(parentDocRef, collectionName, id)
        const docSnaphot = await getDoc(subCollectionRef)
        const data = docSnaphot.data() as T
        const dto: T = { ...data }

        if (options?.relationalCollections) {
            const relationalCollections = options?.relationalCollections

            const promiseList = relationalCollections.map(
                async ({
                    key,
                    keyPath,
                    mapKey,
                    collectionName,
                    overrideKeyPathValue,
                }) => {
                    const keyPathValue = get(dto, keyPath)

                    if (Array.isArray(keyPathValue)) {
                        const isStringArray =
                            typeof keyPathValue[0] === 'string'

                        if (isStringArray) {
                            await getSetStringArrayData(
                                keyPathValue,
                                keyPath,
                                firestore,
                                collectionName,
                                dto,
                            )
                        } else {
                            const promiseList = keyPathValue.map(
                                async (item: DocumentData, index: number) => {
                                    const foreignKey = get(item, key as string)
                                    await getSetForeignData(
                                        foreignKey,
                                        `${keyPath}[${index}]`,
                                        firestore,
                                        collectionName,
                                        dto,
                                        overrideKeyPathValue,
                                        mapKey,
                                    )
                                },
                            )
                            await Promise.all(promiseList)
                        }
                    } else {
                        await getSetForeignData(
                            keyPathValue,
                            keyPath,
                            firestore,
                            collectionName,
                            dto,
                            overrideKeyPathValue,
                            mapKey,
                        )
                    }
                },
            )

            await Promise.all(promiseList)
        }

        return dtoTransformer(dto, id)
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        return undefined
    }
}

const getSetStringArrayData = async <T extends DocumentData>(
    keys: string[],
    keyPath: string,
    firestore: Firestore,
    collectionName: string,
    dto: T,
) => {
    const promiseList = keys.map(async (foreignKey: string, index: number) => {
        const foreignDoc = await getDoc(
            doc(firestore, collectionName, foreignKey),
        )

        const foreignData = foreignDoc.data()
        if (foreignData && !foreignData['id']) {
            foreignData['id'] = foreignDoc.id
        }
        set(dto, `${keyPath}[${index}]`, foreignData)
    })
    await Promise.all(promiseList)
}

const getSetForeignData = async <T extends DocumentData>(
    foreignKey: string | DocumentReference,
    keyPath: string | undefined | null,
    firestore: Firestore,
    collectionName: string,
    dto: T,
    overrideKeyPathValue?: boolean,
    mapKey?: string,
) => {
    let foreignDoc = null

    if (foreignKey instanceof DocumentReference) {
        foreignDoc = await getDoc(foreignKey)
    } else {
        foreignDoc = await getDoc(doc(firestore, collectionName, foreignKey))
    }

    const foreignData = foreignDoc.data()
    if (foreignData && !foreignData['id']) {
        foreignData['id'] = foreignDoc.id
    }
    const path = [keyPath, mapKey].filter(Boolean).join('.')

    if (mapKey || overrideKeyPathValue) {
        set(dto, path, foreignData)
    } else {
        update(dto, path, (value) => {
            return {
                ...value,
                ...foreignData,
            }
        })
    }
}
