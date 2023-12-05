import * as React from 'react'
import { styled } from 'inlines'
import { TextInput } from '../text-input'
import { BasedSchemaField } from '@based/schema'
import { FormField } from './form-field'
import { FormSet } from './set'
import { FormArray } from './array'
import { Stack } from '../layout'

type FormValues = { [key: string]: BasedSchemaField }

export type FormProps = {
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
}

export function Form({ fields, values, onChange }: FormProps) {
  // const values = React.useRef<FormValues>({})
  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        if (field.type === 'string') {
          return (
            <FormField field={field} name={field.title ?? key}>
              <styled.div
                style={{
                  width: 450,
                }}
              >
                <TextInput
                  onChange={(value) => {
                    // setValue(key, value)
                  }}
                />
              </styled.div>
            </FormField>
          )
        }

        // TS picks up type better with if statement versus switch 👍
        if (field.type === 'set') {
          return (
            <FormSet fieldKey={key} field={field} items={values[key] ?? []} />
          )
        }

        if (field.type === 'array') {
          return (
            <FormArray
              fieldKey={key}
              field={field}
              values={values[key] ?? []}
            />
          )
        }
      })}
    </Stack>
  )
}
