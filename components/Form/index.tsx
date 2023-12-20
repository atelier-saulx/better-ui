import React, { ReactNode } from 'react'
import { BasedSchemaField, BasedSchema } from '@based/schema'
import { Stack } from '../Stack'
import { FormField } from './FormField'
import { FileInput } from '../FileInput'
import { TextInput } from '../TextInput'
import { styled } from 'inlines'
import { Table, isTable } from './Table'
import { DateInput } from '../DateInput'
import { SetField } from './Set'
import { Variant } from './types'
import { NumberInput } from '../NumberInput'
import { TextAreaInput } from '../TextAreaInput'
import { SelectInput } from '../SelectInput'

type FormSchemaField = BasedSchemaField & {
  action?: ReactNode
  renderAs?: (props: { field: FormSchemaField; value: any }) => ReactNode
}

type FormValues = {
  [key: string]: FormSchemaField
}

export type FormProps = {
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
  variant?: Variant
  schema?: BasedSchema // for later
}

export function Form({ fields, values, variant = 'regular' }: FormProps) {
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
                  onChange={() => {
                    // setValue(key, value)
                  }}
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
                  schema: fields,
                  values: values,
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
                  schema: fields,
                  values: values,
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
