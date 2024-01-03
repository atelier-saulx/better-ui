import React, { ReactNode, useEffect, useRef } from 'react'
import { styled } from 'inlines'
import { BasedSchemaField, BasedSchema } from '@based/schema'
import {
  Stack,
  FileInput,
  TextInput,
  DateInput,
  Code,
  NumberInput,
  TextAreaInput,
  SelectInput,
  ColorInput,
  Confirm,
} from '../../index.js'
import { FormField } from './FormField.js'
import { Table } from './Table/index.js'
import { isTable, isCode, readPath } from './utils.js'
import { SetField } from './Set.js'
import { Variant, Listeners, Path } from './types.js'
import { Reference } from './Reference.js'
import { deepCopy, setByPath } from '@saulx/utils'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'

type FormSchemaField = BasedSchemaField & {
  action?: ReactNode
  // todo support render AS
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
  onChange: (values: FormValues, checksum: number) => void
  fields: FormValues
  variant?: Variant
  // for later check ref types (can check ids and check allowedTypes)
  schema?: BasedSchema
}

// setWalker

export function Form({
  fields,
  values,
  checksum,
  onChange,
  onChangeAtomic,
  variant = 'regular',
}: FormProps) {
  const nRef = useRef<{ hasChanges?: boolean; values: { [key: string]: any } }>(
    {
      values: values ?? {},
      hasChanges: false,
    }
  )
  const [currentChecksum, setChecksum] = React.useState(checksum)

  // may not be a good idea...
  useEffect(() => {
    if (values) {
      const hash = checksum ?? hashObjectIgnoreKeyOrder(values)
      if (currentChecksum !== hash) {
        nRef.current = { hasChanges: false, values }
        setChecksum(hash)
      }
    }
  }, [checksum])

  const listeners: Listeners = {
    onChangeHandler: (ctx, path, newValue) => {
      const { field, value } = readPath(ctx, path)

      console.info('HELLO???')

      if (!nRef.current.hasChanges) {
        nRef.current.hasChanges = true
        nRef.current.values = deepCopy(values)
      }

      setByPath(nRef.current.values, path, newValue)

      const hash = hashObjectIgnoreKeyOrder(nRef.current.values ?? {})

      if (onChangeAtomic) {
        onChangeAtomic(path, newValue, value, field)
      }

      if (onChange && variant === 'bare') {
        onChange(nRef.current.values, hash)
      }

      setChecksum(hash)

      return false
    },
    onNew: () => false,
    onRemove: () => false,
    onSelectReference: () => undefined,
    onSelectReferences: () => undefined,
  }

  const ctx = {
    variant,
    fields,
    values: nRef.current.values,
    listeners,
  }

  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        const { type } = field

        const path = [key]

        if ('enum' in field) {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <SelectInput
                  options={field.enum}
                  value={nRef.current.values[key]}
                  onChange={(value) => {
                    listeners.onChangeHandler(ctx, path, value)
                  }}
                />
              </styled.div>
            </FormField>
          )
        }

        if (field.type === 'reference') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <Reference path={path} ctx={ctx} />
              </styled.div>
            </FormField>
          )
        }

        if (field.type === 'json') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  minWidth: 450,
                  maxWidth: 750,
                }}
              >
                <Code
                  copy
                  language="json"
                  onChange={() => {}}
                  value={nRef.current.values[key]}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'string' && isCode(field.format)) {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  minWidth: 450,
                  maxWidth: 750,
                }}
              >
                <Code
                  copy
                  color={
                    field.format === 'json' || field.format === 'markdown'
                      ? 'muted'
                      : 'inverted'
                  }
                  language={field.format}
                  onChange={() => {}}
                  value={nRef.current.values[key]}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'string' && field.format === 'rgbColor') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <ColorInput value={nRef.current.values[key]} />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'string' && field.contentMediaType) {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <FileInput
                  mimeType={field.contentMediaType}
                  value={
                    nRef.current.values[key]
                      ? { src: nRef.current.values[key] }
                      : undefined
                  }
                  onChange={(file) => {
                    console.log('uploaded file', file)
                  }}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'string' && field.multiline) {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <TextAreaInput
                  value={nRef.current.values[key] as string}
                  onChange={() => {
                    // setValue(key, value)
                  }}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'string') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <TextInput
                  value={nRef.current.values[key] as string}
                  onChange={() => {
                    // setValue(key, value)
                  }}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'number') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <NumberInput
                  value={nRef.current.values[key] as number}
                  onChange={(v) =>
                    listeners.onChangeHandler(
                      {
                        variant,
                        fields,
                        values: nRef.current.values[key],
                        listeners,
                      },
                      [key],
                      v
                    )
                  }
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'timestamp') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <DateInput
                  time
                  value={nRef.current.values[key] as number}
                  onChange={() => {}}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'set') {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <SetField
                path={[key]}
                ctx={{
                  variant,
                  fields,
                  values: nRef.current.values,
                  listeners,
                }}
              />
            </FormField>
          )
        }

        if (isTable(field)) {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <Table
                path={[key]}
                ctx={{
                  variant,
                  fields,
                  values: nRef.current.values,
                  listeners,
                }}
              />
            </FormField>
          )
        }

        return null
      })}

      {/* if in modal then use buttons else use icons */}
      {variant !== 'bare' && nRef.current.hasChanges ? (
        <Confirm
          style={{
            marginTop: -16,
          }}
          justify="start"
          variant={variant}
          onConfirm={() => {
            // onChange(nRef.current.values, currentChecksum)
          }}
          onCancel={() => {
            nRef.current.hasChanges = false
            nRef.current.values = values
            const hash = checksum ?? hashObjectIgnoreKeyOrder(values)
            setChecksum(hash)
          }}
        />
      ) : null}
    </Stack>
  )
}
