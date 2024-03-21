import { deepCopy, deepMergeArrays, deepEqual } from '@saulx/utils'
import { TableCtx, Path } from './types.js'
import { readPath } from './utils.js'

const parseRef = (id) => (typeof id === 'string' ? id : id?.id)

export const createBasedObject = (
  ctx: TableCtx,
  prevValues: { [key: string]: any },
  changes: { [key: string]: any },
): { [key: string]: any } => {
  const bObject: any = {}

  const walk = (v: any, path: Path, prevValue: any): any => {
    const { field, value } = readPath(ctx, path)
    if (v === null) {
      return { $delete: true }
    }

    if (field.type === 'array' && Array.isArray(v)) {
      v = v.map((item, i) => {
        return walk(item, [...path, i], prevValue?.[i])
      })

      if (field.items?.type === 'reference') {
        return v
      }

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
    }

    if (field.type === 'references' || field.type === 'set') {
      return v.map(parseRef)
    }

    if (field.type === 'reference') {
      return parseRef(v)
    }

    if (typeof v === 'object' && v !== null) {
      const s = {}

      for (const key in v) {
        s[key] = walk(v[key], [...path, key], prevValue?.[key])
      }

      if (field.type === 'record' && prevValue && value) {
        for (const key in prevValue) {
          if (!(key in value)) {
            s[key] = { $delete: true }
          }
        }
      }

      return s
    }

    return v
  }

  return walk(changes, [], prevValues)
}
