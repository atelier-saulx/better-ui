import * as React from 'react'
import { TextInput } from '../text-input'
import { BasedSchemaFieldSet } from '@based/schema'
import { FormField } from './form-field'

export function FormSet({
  key,
  field,
}: {
  key: string
  field: BasedSchemaFieldSet
}) {
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
