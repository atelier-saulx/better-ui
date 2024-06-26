import { MutableRefObject, useMemo } from 'react'
import { ValueRef } from './index.js'
import { Listeners, DragTarget } from './types.js'
import { readPath } from './utils.js'
import { deepCopy, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'
import { createBasedObject } from './createBasedObject.js'

const createListeners = (
  valueRef: MutableRefObject<ValueRef>,
  setChecksum: (nr: number) => void,
  update: () => void,
): Listeners => {
  let currentDragTarget: DragTarget
  return {
    getDragTarget: () => currentDragTarget,
    setDragTarget: (t: DragTarget) => {
      currentDragTarget = t
      return t
    },
    onChangeHandler: (ctx, path, newValue, forceUpdate) => {
      const { field, value } = readPath(ctx, path)

      if (valueRef.current.props.onChangeTransform) {
        newValue = valueRef.current.props.onChangeTransform(
          newValue,
          path,
          field,
        )
      }

      if (!valueRef.current.hasChanges) {
        valueRef.current.hasChanges = true

        if (valueRef.current.props.formRef) {
          valueRef.current.props.formRef.current.hasChanges = true
        }

        valueRef.current.values = deepCopy(valueRef.current.props.values)
      }
      setByPath(valueRef.current.values, path, newValue)
      setByPath(valueRef.current.changes, path, newValue)

      const hash = hashObjectIgnoreKeyOrder(valueRef.current.values ?? {})

      if (valueRef.current.props.onChangeAtomic) {
        valueRef.current.props.onChangeAtomic(path, newValue, value, field)
      }

      if (
        valueRef.current.props.onChange &&
        (valueRef.current.props.variant === 'bare' ||
          valueRef.current.props.variant === 'no-confirm')
      ) {
        const { values, changes } = valueRef.current
        ctx.values = values
        valueRef.current.props.onChange(
          values,
          changes,
          hash,
          createBasedObject(ctx, valueRef.current.props.values || {}, changes),
        )
      } else {
        setChecksum(hash)
      }

      if (forceUpdate) {
        update()
      }

      return false
    },
    onFileUpload: async (props, updateHandler) => {
      if (valueRef.current.props.onFileUpload) {
        return valueRef.current.props.onFileUpload(props, updateHandler)
      }
    },
    onClickReference: (props) => {
      if (valueRef.current.props.onClickReference) {
        return valueRef.current.props.onClickReference(props)
      }
    },
    onSelectReference: (props) => {
      if (valueRef.current.props.onSelectReference) {
        return valueRef.current.props.onSelectReference(props)
      }
    },
    onSelectReferences(props) {
      if (valueRef.current.props.onSelectReferences) {
        return valueRef.current.props.onSelectReferences(props)
      }
    },
  }
}

export const useListeners = (
  valueRef: MutableRefObject<ValueRef>,
  setChecksum: (checksum: number) => void,
  update: () => void,
): Listeners => {
  return useMemo(() => {
    return createListeners(valueRef, setChecksum, update)
  }, [])
}
