export interface CommonObject {
    [key: string]: unknown
}

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)

export const isVoid = (value: unknown) =>
    value === undefined || value === null || value === ''

export function cleanObjectNilValue(object: CommonObject) {
    const resultObject = { ...object }

    Object.keys(object).forEach((key) => {
        if (isVoid(object[key])) {
            delete resultObject[key]
        }
    })

    return resultObject
}
