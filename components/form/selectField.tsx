import * as React from 'react'
import { styled } from 'inlines'
import { TextInput } from '../text-input'
import { BasedSchemaField } from '@based/schema'
import { FormField } from './form-field'
import { FormSet } from './set'
import { FormArray } from './array'
import { FormRecord } from './record'
import { FormObject } from './object'

export const selectField = (
  field: BasedSchemaField,
  key: string,
  values: { [key: string]: any }
): React.ReactNode => {
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
    return <FormSet fieldKey={key} field={field} items={values[key] ?? []} />
  }

  if (field.type === 'array') {
    return <FormArray fieldKey={key} field={field} values={values[key] ?? []} />
  }

  if (field.type === 'record') {
    return (
      <FormRecord fieldKey={key} field={field} values={values[key] ?? {}} />
    )
  }

  if (field.type === 'object') {
    return (
      <FormObject fieldKey={key} field={field} values={values[key] ?? {}} />
    )
  }

  return null
}
