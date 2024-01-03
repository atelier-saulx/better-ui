import React, { ReactNode, useEffect, useRef } from 'react'
import { BasedSchemaField, BasedSchema } from '@based/schema'
import { Stack, Confirm } from '../../index.js'
import { readPath } from './utils.js'
import { Variant, Listeners, Path, TableCtx } from './types.js'
import { deepCopy, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'
import { Field } from './Field.js'

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
  onChangeAtomic?: (
    path: Path,
    newValue: any,
    prevValue: any,
    field: BasedSchemaField
  ) => void
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
}

// setWalker

const FormConfrim = (p: {
  variant: Variant
  hasChanges: boolean
  confirmLabel?: ReactNode
  onConfirm?: () => Promise<void>
  onCancel?: () => void
}) => {
  if (!p.hasChanges || p.variant === 'bare') {
    return null
  }

  return (
    <Confirm
      style={{
        marginTop: -16,
      }}
      label={p.confirmLabel ?? 'Apply changes'}
      justify="start"
      variant={p.variant}
      onConfirm={p.onConfirm}
      onCancel={p.onCancel}
    />
  )
}

export function Form({
  fields,
  values,
  checksum,
  onChange,
  onChangeAtomic,
  confirmLabel,
  variant = 'regular',
}: FormProps) {
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

  // may not be a good idea...
  useEffect(() => {
    if (values) {
      const hash = checksum ?? hashObjectIgnoreKeyOrder(values)
      if (currentChecksum !== hash) {
        nRef.current = { hasChanges: false, values, changes: {} }
        setChecksum(hash)
      }
    }
  }, [checksum])

  const listeners: Listeners = {
    onChangeHandler: (ctx, path, newValue) => {
      const { field, value } = readPath(ctx, path)

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

      if (onChange && variant === 'bare') {
        onChange(nRef.current.values, nRef.current.changes, hash)
      }

      setChecksum(hash)

      return false
    },
    onNew: () => false,
    onRemove: () => false,
    onSelectReference: () => undefined,
    onSelectReferences: () => undefined,
  }

  const onConfirm = async () => {
    try {
      await onChange(nRef.current.values, nRef.current.changes, currentChecksum)
      nRef.current.hasChanges = false
      nRef.current.values = values ?? {}
      nRef.current.changes = {}
      const hash = checksum ?? hashObjectIgnoreKeyOrder(values ?? {})
      setChecksum(hash)
    } catch (err) {
      throw err
    }
  }

  const onCancel = () => {
    nRef.current.hasChanges = false
    nRef.current.values = values ?? {}
    nRef.current.changes = {}
    const hash = checksum ?? hashObjectIgnoreKeyOrder(values ?? {})
    setChecksum(hash)
  }

  const ctx: TableCtx = {
    variant,
    fields,
    values: nRef.current.values,
    listeners,
  }

  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        return <Field ctx={ctx} key={key} field={field} propKey={key} />
      })}
      <FormConfrim
        confirmLabel={confirmLabel}
        onConfirm={onConfirm}
        onCancel={onCancel}
        hasChanges={nRef.current.hasChanges}
        variant={variant}
      />
    </Stack>
  )
}
