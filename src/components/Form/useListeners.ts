import { MutableRefObject, useMemo } from 'react'
import { FormProps, ValueRef } from './index.js'
import { Listeners, DragTarget } from './types.js'
import { readPath, readParentType } from './utils.js'
import { deepCopy, getByPath, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'

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

        // may want to get rid of this in the future
        if (
          typeof path[path.length - 2] === 'number' &&
          readParentType(ctx, path) === 'object' &&
          readParentType(ctx, path, 2) === 'array' &&
          !getByPath(valueRef.current.changes, path.slice(0, -1))
        ) {
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
