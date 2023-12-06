import * as React from 'react'
import { styled } from 'inlines'
import { TextInput } from '../text-input'
import { BasedSchemaField } from '@based/schema'
import { FormField } from './form-field'
import { FormSet } from './set'
import { FormArray } from './array'
import { FormRecord } from './record'
import { FormObject } from './object'
import { FileInput } from '../file-input'

export const selectField = (
  field: BasedSchemaField,
  key: string,
  values: { [key: string]: any },
  variant: 'extensive' | 'minimal'
): React.ReactNode => {
  if (field.type === 'string' && field.contentMediaType) {
    return (
      <FormField variant={variant} field={field} name={field.title ?? key}>
        <FileInput
          allowedType={field.contentMediaType}
          //   status={status}
          //   progress={progress}
          value={values[key]}
          onChange={(file) => {
            console.log('uploaded file', file)
          }}
        />
      </FormField>
    )
  }

  if (field.type === 'string') {
    return (
      <FormField variant={variant} field={field} name={field.title ?? key}>
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
      <FormSet
        variant={variant}
        fieldKey={key}
        field={field}
        items={values[key] ?? []}
      />
    )
  }

  if (field.type === 'array') {
    return (
      <FormArray
        variant={variant}
        fieldKey={key}
        field={field}
        values={values[key] ?? []}
      />
    )
  }

  if (field.type === 'record') {
    return (
      <FormRecord
        variant={variant}
        fieldKey={key}
        field={field}
        values={values[key] ?? {}}
      />
    )
  }

  if (field.type === 'object') {
    return (
      <FormObject
        variant={variant}
        fieldKey={key}
        field={field}
        values={values[key] ?? {}}
      />
    )
  }

  return null
}
