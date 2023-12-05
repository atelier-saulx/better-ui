import * as React from 'react'
import { styled } from 'inlines'
import { TextInput } from '../text-input'
import { display, BasedSchemaField, BasedSchemaFieldSet } from '@based/schema'
import { FormField } from './form-field'
import { FormSet } from './set'

type FormValues = { [key: string]: BasedSchemaField }

export type FormProps = {
  defaultValues?: FormValues
  onChange: (values: FormValues) => void
  fields: FormValues
}

export function Form({ fields, defaultValues, onChange }: FormProps) {
  // const values = React.useRef<FormValues>({})

  return (
    <styled.div style={{ '& > * + *': { marginTop: '32px' } }}>
      {Object.entries(fields).map(([key, field]) => {
        if (field.type === 'string') {
          return (
            <FormField key={key} field={field} name={field.title ?? key}>
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
          return <FormSet key={key} field={field} />
        }
      })}
    </styled.div>
  )
}
