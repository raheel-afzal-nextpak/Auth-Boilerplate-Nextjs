import { DocumentReference, FieldValue, Timestamp } from 'firebase/firestore'

interface AnyRecord {
    [key: string]: any
}

export const removeUndefinedAndGetNew = <T extends AnyRecord>(obj: T): T => {
    try {
        if (
            !obj ||
            typeof obj !== 'object' ||
            obj instanceof Date ||
            obj instanceof Timestamp ||
            obj instanceof File ||
            obj instanceof FieldValue ||
            obj instanceof DocumentReference
        ) {
            return obj
        }

        const isArray = Array.isArray(obj)
        if (isArray) {
            let modifiedObject = [...obj]
            modifiedObject.forEach((item: object, index: number) => {
                modifiedObject[index] = removeUndefinedAndGetNew(item)
            })
            modifiedObject = modifiedObject.filter((item: any) =>
                typeof item === 'object' && item && !(item instanceof Date)
                    ? Object.keys(item).length
                    : item,
            )
            return modifiedObject as any
        } else {
            const modifiedObject = { ...obj }
            Object.keys(modifiedObject).forEach((key) => {
                if (modifiedObject[key] === undefined) {
                    delete modifiedObject[key]
                } else {
                    modifiedObject[key as keyof T] = removeUndefinedAndGetNew(
                        modifiedObject[key],
                    )
                }
            })
            return modifiedObject
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('🚀 ~ error:', error)
        return obj
    }
}
