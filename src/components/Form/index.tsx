import React, { ReactNode, useEffect, useRef } from 'react'
import { BasedSchemaField, BasedSchemaPartial } from '@based/schema'
import { Stack, useUpdate } from '../../index.js'
import { Variant, Listeners, Path, TableCtx } from './types.js'
import { deepCopy, deepMergeArrays } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'
import { Field } from './Field.js'
import { FormConfirm } from './FormConfirm.js'
import { useListeners } from './useListeners.js'
import { createBasedObject } from './createBasedObject.js'

type FormSchemaField = BasedSchemaField & {
  action?: ReactNode
  renderAs?: (props: { field: FormSchemaField; value: any }) => ReactNode
}

type FormValues = {
  [key: string]: FormSchemaField
}

type FormOnChange = (
  values: { [key: string]: any },
  changed: { [key: string]: any },
  checksum: number,
  based: { [key: string]: any },
) => void

type FormOnChangeAsync = (
  values: { [key: string]: any },
  changed: { [key: string]: any },
  checksum: number,
  based: { [key: string]: any },
) => Promise<void>

export type ValueRef = {
  hasChanges?: boolean
  values: { [key: string]: any }
  props: FormProps
  changes: { [key: string]: any }
}

export type FormProps = {
  autoFocus?: boolean
  validate?: (path: Path, value: any, field: BasedSchemaField) => boolean
  values?: { [key: string]: any }
  checksum?: number
  onSelectReference?: Listeners['onSelectReference']
  onSelectReferences?: Listeners['onSelectReferences']
  onClickReference?: Listeners['onClickReference']
  onFileUpload?: Listeners['onFileUpload']
  onChangeAtomic?: (
    path: Path,
    newValue: any,
    prevValue: any,
    field: BasedSchemaField,
  ) => void
  onChangeTransform?: (val: any, path: Path, field: BasedSchemaField) => any
  onChange?: FormOnChange | FormOnChangeAsync
  confirmLabel?: ReactNode
  fields: FormValues
  variant?: Variant
  editableReferences?: boolean
  // for later check ref types (can check ids and check allowedTypes)
  schema?: BasedSchemaPartial
  formRef?: {
    current: {
      confirm: () => Promise<FormValues>
      discard: () => void
      hasChanges?: boolean
      values: { [key: string]: any }
      changes: { [key: string]: any }
    }
  }
}

export const Form = (p: FormProps) => {
  const valueRef = useRef<ValueRef>({
    values: p.values ?? {},
    changes: {},
    props: p,
    hasChanges: false,
  })

  const update = useUpdate()

  valueRef.current.props = p

  const [currentChecksum, setChecksum] = React.useState(p.checksum)

  const ctxRef = useRef<TableCtx>({
    variant: p.variant,
    fields: p.fields,
    values: valueRef.current.values,
    listeners: useListeners(valueRef, setChecksum, update),
    schema: p.schema,
    editableReferences: p.editableReferences,
  })

  const onConfirm = React.useCallback(async () => {
    try {
      const hash = hashObjectIgnoreKeyOrder(valueRef.current.props.values ?? {})
      await valueRef.current.props.onChange(
        valueRef.current.values,
        valueRef.current.changes,
        hash,
        createBasedObject(
          ctxRef.current,
          valueRef.current.values,
          valueRef.current.changes,
        ),
      )
      valueRef.current.hasChanges = false
      valueRef.current.values = valueRef.current.props.values ?? {}
      valueRef.current.changes = {}
      setChecksum(hash)
      // Force update
      update()
    } catch (err) {
      throw err
    }
  }, [])

  const onCancel = React.useCallback(() => {
    valueRef.current.hasChanges = false
    valueRef.current.values = valueRef.current.props.values ?? {}
    valueRef.current.changes = {}
    const hash =
      valueRef.current.props.checksum ??
      hashObjectIgnoreKeyOrder(valueRef.current.props.values ?? {})
    setChecksum(hash)
    // Force update
    update()
  }, [])

  // create ref
  if (p.formRef) {
    if (!p.formRef.current) {
      // @ts-ignore
      p.formRef.current = {}
    }
    // optimize later
    Object.assign(
      p.formRef.current,
      {
        confirm: async () => {
          await onConfirm()
          return valueRef.current.values
        },
        discard: () => {
          onCancel()
        },
      },
      valueRef.current,
    )
  }

  // May not be a good idea...
  useEffect(() => {
    const p = valueRef.current.props
    if (p.values) {
      const hash = p.checksum ?? hashObjectIgnoreKeyOrder(p.values)
      if (currentChecksum !== hash) {
        valueRef.current.values = deepMergeArrays(
          deepCopy(p.values),
          valueRef.current.changes,
        )
        setChecksum(hash)
      }
    }
  }, [p.checksum, p.values])

  // so we can make a copy
  ctxRef.current.variant = p.variant
  ctxRef.current.values = valueRef.current.values
  ctxRef.current.schema = p.schema
  ctxRef.current.editableReferences = p.editableReferences

  return (
    <>
      <Stack
        gap={32}
        direction="column"
        align="start"
        style={{
          position: 'relative',
        }}
      >
        <FormConfirm
          confirmLabel={p.confirmLabel}
          onConfirm={onConfirm}
          onCancel={onCancel}
          hasChanges={valueRef.current.hasChanges}
          variant={p.variant}
        />
        {Object.entries(p.fields)
          .sort(([, a], [, b]) => {
            const aIndex = a.index ?? 1e6
            const bIndex = b.index ?? 1e6
            return aIndex === bIndex ? 0 : aIndex > bIndex ? 1 : -1
          })
          .map(([key, field], i) => {
            return (
              <Field
                ctx={ctxRef.current}
                key={key}
                field={field}
                propKey={key}
                autoFocus={p.autoFocus && i === 0}
              />
            )
          })}
      </Stack>
    </>
  )
}
