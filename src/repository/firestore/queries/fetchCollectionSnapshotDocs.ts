import {
    collection,
    DocumentData,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    OrderByDirection,
    query,
    where,
    WhereFilterOp,
} from 'firebase/firestore'

type QueryObject = {
    key: string
    op: WhereFilterOp
    value: any
}

type RelationalObject = {
    key: string
    collectionName: string
    objectKey?: string
}

type OrderObject = {
    key: string
    direction?: OrderByDirection
}

type FetchOptions = {
    queries?: Array<QueryObject>
    orderBy?: OrderObject
    limit?: number
    queryKey?: string
    relationalCollections?: Array<RelationalObject>
    childRelationalCollections?: Array<RelationalObject>
    getRef?: boolean
}
export const fetchCollectionSnapshotDocs = async <T extends DocumentData, R>(
    collectionName: string,
    dtoTransformer: (item: T, id: string) => R,
    options?: FetchOptions,
    setterFn?: (item: R[]) => unknown,
) => {
    const firestore = getFirestore()
    try {
        const q = options?.queries
        const wheres =
            q?.map((item) => {
                return where(item.key, item.op, item.value) as any
            }) ?? []
        if (options?.orderBy) {
            wheres.push(
                orderBy(options?.orderBy.key, options?.orderBy.direction),
            )
        }
        if (options?.limit) {
            wheres.push(limit(options?.limit))
        }
        const queries = query(collection(firestore, collectionName), ...wheres)

        return new Promise((resolve) => {
            onSnapshot(queries, async (querySnapshot) => {
                const result: R[] = []
                for (const _doc of querySnapshot.docs) {
                    const id = _doc.id
                    const data = _doc.data() as T
                    const dto: T = { ...data }
                    result.push(dtoTransformer(dto, id))
                }
                if (setterFn) {
                    setterFn(result)
                }
                resolve(result)
            })
        })
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
        return []
    }
}
