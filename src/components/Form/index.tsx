import React, { ReactNode, useEffect, useRef } from 'react'
import { BasedSchemaField, BasedSchema } from '@based/schema'
import { Stack } from '../../index.js'
import { readPath } from './utils.js'
import { Variant, Listeners, Path, TableCtx } from './types.js'
import { deepCopy, deepMerge, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'
import { Field } from './Field.js'
import { FormConfirm } from './FormConfirm.js'

type FormSchemaField = BasedSchemaField & {
  action?: ReactNode
  renderAs?: (props: { field: FormSchemaField; value: any }) => ReactNode
}

type FormValues = {
  [key: string]: FormSchemaField
}

export type FormProps = {
  validate?: (path: Path, value: any) => boolean
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
    field: BasedSchemaField
  ) => void
  onChangeTransform?: (val: any, path: Path, field: BasedSchemaField) => any
  onChange: (
    values: { [key: string]: any },
    changed: { [key: string]: any },
    checksum: number
  ) => void | Promise<
    (
      values: { [key: string]: any },
      changed: { [key: string]: any },
      checksum: number
    ) => void
  >
  confirmLabel?: ReactNode
  fields: FormValues
  variant?: Variant
  // for later check ref types (can check ids and check allowedTypes)
  schema?: BasedSchema
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

export const Form = ({
  fields,
  values,
  checksum,
  onChange,
  onChangeAtomic,
  onSelectReference,
  onSelectReferences,
  confirmLabel,
  onChangeTransform,
  formRef,
  onFileUpload,
  onClickReference,
  variant = 'regular',
}: FormProps) => {
  const nRef = useRef<{
    hasChanges?: boolean
    values: { [key: string]: any }
    changes: { [key: string]: any }
  }>({
    values: values ?? {},
    changes: {},
    hasChanges: false,
  })
  const [currentChecksum, setChecksum] = React.useState(checksum)

  const onConfirm = React.useCallback(async () => {
    try {
      await onChange(nRef.current.values, nRef.current.changes, currentChecksum)
      nRef.current.hasChanges = false
      nRef.current.values = values ?? {}
      nRef.current.changes = {}
      const hash = hashObjectIgnoreKeyOrder(values ?? {})
      setChecksum(hash)
    } catch (err) {
      throw err
    }
  }, [checksum])

  const onCancel = React.useCallback(() => {
    nRef.current.hasChanges = false
    nRef.current.values = values ?? {}
    nRef.current.changes = {}
    const hash = checksum ?? hashObjectIgnoreKeyOrder(values ?? {})
    setChecksum(hash)
  }, [checksum])

  if (formRef) {
    if (!formRef.current) {
      // @ts-ignore
      formRef.current = {}
    }
    // opt later
    Object.assign(
      formRef.current,
      {
        confirm: async () => {
          await onConfirm()
          return nRef.current.values
        },
        discard: () => {
          onCancel()
        },
      },
      nRef.current
    )
  }

  // May not be a good idea...
  useEffect(() => {
    if (values) {
      const hash = checksum ?? hashObjectIgnoreKeyOrder(values)
      if (currentChecksum !== hash) {
        nRef.current.values = deepMerge(deepCopy(values), nRef.current.changes)
        setChecksum(hash)
      }
    }
  }, [checksum, values])

  const listeners: Listeners = {
    onChangeHandler: (ctx, path, newValue) => {
      const { field, value } = readPath(ctx, path)

      if (onChangeTransform) {
        newValue = onChangeTransform(newValue, path, field)
      }

      if (!nRef.current.hasChanges) {
        nRef.current.hasChanges = true
        nRef.current.values = deepCopy(values)
      }

      setByPath(nRef.current.values, path, newValue)
      setByPath(nRef.current.changes, path, newValue)

      const hash = hashObjectIgnoreKeyOrder(nRef.current.values ?? {})

      if (onChangeAtomic) {
        onChangeAtomic(path, newValue, value, field)
      }

      // TODO: change this
      if (onChange && (variant === 'bare' || variant === 'no-confirm')) {
        onChange(nRef.current.values, nRef.current.changes, hash)
      }
      setChecksum(hash)
      return false
    },
    onFileUpload: onFileUpload ?? (async () => undefined),
    onClickReference: onClickReference ?? (() => undefined),
    onSelectReference:
      onSelectReference ??
      ((async (_, value) => value) as Listeners['onSelectReference']),
    onSelectReferences:
      onSelectReferences ??
      ((async (_, value) => value) as Listeners['onSelectReferences']),
  }

  const ctx: TableCtx = {
    variant,
    fields,
    values: nRef.current.values,
    listeners,
  }

  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields)
        .sort(([, a], [, b]) => {
          return a.index > b.index ? -1 : a.index < b.index ? 1 : 0
        })
        .map(([key, field]) => {
          return <Field ctx={ctx} key={key} field={field} propKey={key} />
        })}
      <FormConfirm
        confirmLabel={confirmLabel}
        onConfirm={onConfirm}
        onCancel={onCancel}
        hasChanges={nRef.current.hasChanges}
        variant={variant}
      />
    </Stack>
  )
}
