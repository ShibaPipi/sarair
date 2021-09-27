export const isFalsy = (value) => {
  if (value === 0) {
    return true
  }
  return !!value
}

export function cleanObjectNullValue(object): string {
  const resultObject = { ...object }

  Object.keys(object).forEach((key) => {
    if (!isFalsy(object[key])) {
      delete resultObject[key]
    }
  })

  return resultObject
}
