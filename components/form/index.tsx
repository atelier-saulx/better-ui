import React, { ReactNode } from 'react'
import { BasedSchemaField } from '@based/schema'
import { Stack } from '../layout'
import { FormField } from './form-field'
import { FileInput } from '../file-input'
import { TextInput } from '../text-input'
import { styled } from 'inlines'
import { Table, isTable } from './Table'

type FormValues = { [key: string]: BasedSchemaField & { action?: ReactNode } }

export type FormProps = {
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
  variant?: 'regular' | 'small'
}

export function Form({ fields, values, variant = 'regular' }: FormProps) {
  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        const { type } = field

        if (type === 'string' && field.contentMediaType) {
          return (
            <FormField
              key={key}
              variant={variant}
              field={field}
              name={field.title ?? key}
            >
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

        if (type === 'string') {
          return (
            <FormField
              key={key}
              variant={variant}
              field={field}
              name={field.title ?? key}
            >
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <TextInput
                  value={values[key] as string}
                  onChange={(value) => {
                    // setValue(key, value)
                  }}
                />
              </styled.div>
            </FormField>
          )
        }

        if (type === 'timestamp') {
          return (
            <FormField
              key={key}
              variant={variant}
              field={field}
              name={field.title ?? key}
            >
              <styled.div
                style={{
                  width: 450,
                }}
              >
                {/* <DateInput
                  // value={values[key] as number}
                  onChange={(value) => {
                    // setValue(key, value)
                  }}
                /> */}
              </styled.div>
            </FormField>
          )
        }

        if (isTable(field)) {
          return (
            <FormField
              key={key}
              variant={variant}
              field={field}
              name={field.title ?? key}
            >
              <Table
                path={[key]}
                ctx={{
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
