interface CommonObject {
  [key: string]: any
}

export const isFalsy = (value: any) => {
  if (value === 0) {
    return false
  }
  return !value
}

export function cleanObjectNilValue(object: CommonObject): CommonObject {
  const resultObject = { ...object }

  Object.keys(object).forEach((key) => {
    if (isFalsy(object[key])) {
      delete resultObject[key]
    }
  })

  return resultObject
}
