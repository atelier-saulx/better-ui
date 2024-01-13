import { MutableRefObject, useMemo } from 'react'
import { FormProps, ValueRef } from './index.js'
import { Listeners, DragTarget } from './types.js'
import { readPath } from './utils.js'
import { deepCopy, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'

const defaultFunctions = {
  onFileUpload: async () => {},
  onClickReference: () => {},
  onSelectReference: (async (_, value) =>
    value) as Listeners['onSelectReference'],
  onSelectReferences: (async (_, value) =>
    value) as Listeners['onSelectReferences'],
}

const getDefaultFns = (target: Partial<Listeners>, p: FormProps): Listeners => {
  target.onFileUpload = p.onFileUpload ?? defaultFunctions.onFileUpload
  target.onClickReference =
    p.onClickReference ?? defaultFunctions.onClickReference
  target.onSelectReference =
    p.onSelectReference ?? defaultFunctions.onSelectReference
  target.onSelectReferences =
    p.onSelectReferences ?? defaultFunctions.onSelectReferences
  return target as Listeners
}

export const useListeners = (
  valueRef: MutableRefObject<ValueRef>,
  setChecksum: (checksum: number) => void,
  p: FormProps
): Listeners => {
  // Memoize this
  const listeners: Listeners = useMemo(() => {
    let currentDragTarget: DragTarget

    return getDefaultFns(
      {
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

          // if (validate) {
          //   if (!validate(path, value, field)) {
          //     return true
          //   }
          // }

          if (!valueRef.current.hasChanges) {
            valueRef.current.hasChanges = true
            valueRef.current.values = deepCopy(p.values)
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
      },
      p
    )
  }, [])

  return listeners
}
