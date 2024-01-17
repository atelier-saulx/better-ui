import { MutableRefObject, useMemo } from 'react'
import { FormProps, ValueRef } from './index.js'
import { Listeners, DragTarget, TableCtx, Path } from './types.js'
import { readPath, readParentType } from './utils.js'
import { deepCopy, getByPath, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'

const checkIfFromArray = (
  ctx: TableCtx,
  path: Path,
  changes: ValueRef['changes']
): boolean => {
  if (typeof path[path.length - 2] !== 'number') {
    return false
  }
  const parentType = readParentType(ctx, path)
  if (parentType !== 'array' && parentType === 'object') {
    return false
  }
  if (readParentType(ctx, path, 2) !== 'array') {
    return false
  }
  if (getByPath(changes, path.slice(0, -1))) {
    return false
  }
  return true
}

export const useListeners = (
  valueRef: MutableRefObject<ValueRef>,
  setChecksum: (checksum: number) => void,
  p: FormProps
): Listeners => {
  // Memoize this
  const listeners: Listeners = useMemo(() => {
    let currentDragTarget: DragTarget
    return {
      getDragTarget: () => currentDragTarget,
      setDragTarget: (t: DragTarget) => {
        currentDragTarget = t
        return t
      },
      onChangeHandler: (ctx, path, newValue) => {
        const { field, value } = readPath(ctx, path)

        if (p.onChangeTransform) {
          newValue = p.onChangeTransform(newValue, path, field)
        }

        if (!valueRef.current.hasChanges) {
          valueRef.current.hasChanges = true
          valueRef.current.values = deepCopy(p.values)
        }

        if (checkIfFromArray(ctx, path, valueRef.current.changes)) {
          const p = path.slice(0, -1)
          const v = getByPath(ctx.values, p)
          if (v) {
            setByPath(valueRef.current.changes, path.slice(0, -1), v)
          }
        }

        setByPath(valueRef.current.values, path, newValue)
        setByPath(valueRef.current.changes, path, newValue)

        const hash = hashObjectIgnoreKeyOrder(valueRef.current.values ?? {})

        if (p.onChangeAtomic) {
          p.onChangeAtomic(path, newValue, value, field)
        }

        if (
          p.onChange &&
          (p.variant === 'bare' || p.variant === 'no-confirm')
        ) {
          p.onChange(valueRef.current.values, valueRef.current.changes, hash)
        }

        setChecksum(hash)
        return false
      },
      onFileUpload: async (props, updateHandler) => {
        if (p.onFileUpload) {
          return p.onFileUpload(props, updateHandler)
        }
      },
      onClickReference: (props) => {
        if (p.onClickReference) {
          return p.onClickReference(props)
        }
      },
      onSelectReference: (props) => {
        if (p.onSelectReference) {
          return p.onSelectReference(props)
        }
      },
      onSelectReferences(props) {
        if (p.onSelectReferences) {
          return p.onSelectReferences(props)
        }
      },
    }
  }, [])

  return listeners
}
