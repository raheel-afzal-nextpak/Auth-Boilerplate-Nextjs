import {
    collection,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    OrderByDirection,
    query,
    where,
    WhereFilterOp,
} from 'firebase/firestore'

export type QueryObject = {
    key: string
    op: WhereFilterOp
    value: any
}

export type RelationalObject = {
    key: string
    collectionName: string
    objectKey?: string
}

export type OrderObject = {
    key: string
    direction?: OrderByDirection
}

export type FetchOptions = {
    queries?: Array<QueryObject>
    orderBy?: OrderObject
    limit?: number
    queryKey?: string
    relationalCollections?: Array<RelationalObject>
    childRelationalCollections?: Array<RelationalObject>
    getRef?: boolean
}
export const fetchCollectionDocs = async <T extends DocumentData, R>(
    collectionName: string,
    dtoTransformer: (item: T, id: string) => R,
    options?: FetchOptions,
): Promise<Array<R>> => {
    const firestore = getFirestore()
    try {
        const q = options?.queries
        const wheres =
            q?.map((item) => {
                return where(item.key, item.op, item.value) as any
            }) ?? []
        const relationalCollections = options?.relationalCollections
        const childRelationalCollections = options?.childRelationalCollections
        if (options?.orderBy) {
            wheres.push(
                orderBy(options?.orderBy.key, options?.orderBy.direction),
            )
        }
        if (options?.limit) {
            wheres.push(limit(options?.limit))
        }
        const queries = query(collection(firestore, collectionName), ...wheres)

        let promiseList = []
        const querySnapshot = await getDocs(queries)
        const result = []

        for (const _doc of querySnapshot.docs) {
            const id = _doc.id
            let data = _doc.data() as T
            promiseList = []

            if (relationalCollections) {
                for (const relationalCollection of relationalCollections) {
                    const ref = data[relationalCollection.key]

                    if (!ref) {
                        promiseList.push(null)
                    } else {
                        promiseList.push(
                            getDoc(
                                doc(
                                    firestore,
                                    relationalCollection.collectionName,
                                    ref,
                                ),
                            ),
                        )
                    }
                }

                const refDocs = await Promise.all(promiseList)
                refDocs.forEach((refData, index) => {
                    if (!refData) {
                        return
                    }
                    const relationalCollection = relationalCollections[index]
                    if (relationalCollection.objectKey) {
                        data = {
                            ...data,
                            [relationalCollection.objectKey]: {
                                id: refData.id,
                                ...refData.data(),
                            },
                        }
                    } else {
                        data = {
                            ...data,
                            ...refData.data(),
                        }
                    }
                })
            }

            if (childRelationalCollections) {
                for (const relationalCollection of childRelationalCollections) {
                    const q = query(
                        collection(
                            firestore,
                            relationalCollection.collectionName,
                        ),
                        where(relationalCollection.key, '==', id),
                    )
                    const refDocs = await getDocs(q)
                    const refData = refDocs.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))

                    if (relationalCollection.objectKey) {
                        data = {
                            ...data,
                            [relationalCollection.objectKey]: refData,
                        }
                    } else {
                        data = {
                            ...data,
                            [relationalCollection.collectionName]: refData,
                        }
                    }
                }
            }
            const dto: T = { ...data }
            result.push(dtoTransformer(dto, id))
        }
        return result
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        return []
    }
}
