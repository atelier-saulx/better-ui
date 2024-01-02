import React, { ReactNode } from 'react'
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
} from '../../index.js'
import { FormField } from './FormField.js'
import { Table } from './Table/index.js'
import { isTable, isCode, readPath } from './utils.js'
import { SetField } from './Set.js'
import { Variant, Listeners, Path } from './types.js'
import { Reference } from './Reference.js'

type FormSchemaField = BasedSchemaField & {
  action?: ReactNode
  renderAs?: (props: { field: FormSchemaField; value: any }) => ReactNode
}

type FormValues = {
  [key: string]: FormSchemaField
}

export type FormProps = {
  validate?: (path: Path, value: any) => boolean
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
  variant?: Variant
  // for later check ref types (can check ids and check allowedTypes)
  schema?: BasedSchema
}

// setWalker

export function Form({
  fields,
  values,
  validate,
  variant = 'regular',
  schema,
}: // listeners,
FormProps) {
  // if ! schema
  // if ! listeners

  // if based schema we will use validate
  // add field parsers here...

  const listeners: Listeners = {
    onChangeHandler: (ctx, path, newValue) => {
      // validate

      // just hook into validate

      // validateField(schema ||  { types: { form: fields } },  path.slice(1), field}

      return false
    },
    onNew: () => false,
    onRemove: () => false,
    onSelectReference: () => undefined,
    onSelectReferences: () => undefined,
  }

  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        const { type } = field

        if ('enum' in field) {
          return (
            <FormField fieldKey={key} key={key} variant={variant} field={field}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <SelectInput options={field.enum} value={values[key]} />
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
                <Reference
                  path={[key]}
                  ctx={{
                    variant,
                    fields,
                    values: values,
                    listeners,
                  }}
                />
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
                  value={values[key]}
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
                  value={values[key]}
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
                <ColorInput value={values[key]} />
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
                  value={values[key] ? { src: values[key] } : undefined}
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
                  value={values[key] as string}
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
                  value={values[key] as string}
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
                  value={values[key] as number}
                  onChange={(v) =>
                    listeners.onChangeHandler(
                      {
                        variant,
                        fields,
                        values: values,
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
                  value={values[key] as number}
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
                  values: values,
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
                  values: values,
                  listeners,
                }}
              />
            </FormField>
          )
        }

        return null
      })}
    </Stack>
  )
}
