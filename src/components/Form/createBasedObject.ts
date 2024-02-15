import { deepCopy, deepMergeArrays, deepEqual } from '@saulx/utils'
import { TableCtx, Path } from './types.js'
import { isIterable, readPath } from './utils.js'

export const createBasedObject = (
  ctx: TableCtx,
  prevValues: { [key: string]: any },
  changes: { [key: string]: any },
): { [key: string]: any } => {
  const bObject: any = {}

  const walk = (v: any, s: any, path: Path): any => {
    const { field, value } = readPath(ctx, path)

    if (isIterable(field) || path.length === 0) {
      if (field.type === 'record') {
        if (!value) {
          return v
        }

        const newLen = v ? Object.keys(v).length : 0
        if (newLen === 0) {
          return { $delete: true }
        }

        const ns: any = {}
        for (const key in value) {
          if (!(key in v)) {
            ns[key] = { $delete: true }
          }
        }
        for (const key in v) {
          if (!deepEqual(v[key], value[key])) {
            ns[key] = v[key]
          }
        }
        return ns
      } else if (Array.isArray(v) && field.type === 'array') {
        let nV: any
        let j = 0
        for (let i = 0; i < v.length; i++) {
          if (v[i] !== undefined) {
            nV = {
              $assign: {
                $idx: i,
                $value: v[i],
              },
            }
            j++
          }
          if (j > 1 || (value && v.length < value.length)) {
            // console.info('have to do other stuff... prob copy the array')
            // check if we have
            // - a push
            // - a single remove
            // other wise copy the whole array
            return deepMergeArrays(deepCopy(value), v)
          }
        }
        return nV
      } else if (v === null) {
        return { $delete: true }
      } else if (field.type === 'references' || field.type === 'set') {
        // tmp
        return v.map((id) => (typeof id === 'string' ? id : id?.id))
      } else if (typeof v === 'object') {
        const nS: any = {}
        for (const key in v) {
          s[key] = walk(v[key], nS, [...path, key])
        }
      }
    } else {
      return v
    }
  }

  walk(changes, bObject, [])
  return bObject
}
