import * as React from 'react'
import { styled } from 'inlines'
import { TextInput } from '../text-input'
import { display, BasedSchemaField, BasedSchemaFieldSet } from '@based/schema'
import { FormField } from './form-field'
import { FormSet } from './set'
import { FormArray } from './array'

type FormValues = { [key: string]: BasedSchemaField }

export type FormProps = {
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
}

export function Form({ fields, values, onChange }: FormProps) {
  // const values = React.useRef<FormValues>({})

  return (
    <styled.div style={{ '& > * + *': { marginTop: '32px' } }}>
      {Object.entries(fields).map(([key, field]) => {
        if (field.type === 'string') {
          return (
            <FormField field={field} name={field.title ?? key}>
              <div
                style={{
                  width: 450,
                }}
              >
                <TextInput
                  onChange={(value) => {
                    // setValue(key, value)
                  }}
                />
              </div>
            </FormField>
          )
        }

        // TS picks up type better with if statement version switch 👍
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
    </styled.div>
  )
}
