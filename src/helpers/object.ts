import camelCase from 'lodash/camelCase'
import isEqual from 'lodash/isEqual'
import snakeCase from 'lodash/snakeCase'

export const objectIsEqual = isEqual

export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(obj[key])
      }),
      {}
    )
  }
  return obj
}

export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: toSnakeCase(obj[key])
      }),
      {}
    )
  }
  return obj
}
