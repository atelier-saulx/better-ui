import { deepCopy, deepMergeArrays } from '@saulx/utils'
import { TableCtx, Path } from './types.js'
import { readPath } from './utils.js'

export const createBasedObject = (
  ctx: TableCtx,
  changes: { [key: string]: any }
): { [key: string]: any } => {
  const bObject: any = {}

  const walk = (obj: any, s: any, path: Path): any => {
    const { field, value } = readPath(ctx, path)

    if (Array.isArray(obj) && field.type === 'array') {
      // check if its the total array
      console.info('ARRAY !', obj)

      let nV: any

      let j = 0
      for (let i = 0; i < obj.length; i++) {
        if (obj[i] !== undefined) {
          nV = {
            $assign: {
              $idx: i,
              $value: obj[i],
            },
          }
          j++
        }
        if (j > 1) {
          console.info('have to do other stuff... prob copy the array')
          // check if we have
          // - a push
          // - a single remove
          // other wise copy the whole array
          return deepMergeArrays(deepCopy(value), obj)
        }
      }
      return nV
    } else if (obj === null) {
      return { $delete: true }
    } else if (typeof obj === 'object') {
      const nS = {}
      for (const key in obj) {
        s[key] = walk(obj[key], nS, [...path, key])
      }
    }

    return s
  }

  walk(changes, bObject, [])
  return bObject
}
