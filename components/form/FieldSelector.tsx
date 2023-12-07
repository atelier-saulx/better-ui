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

export function FieldSelector({
  field,
  propKey,
  values,
  variant,
}: {
  field: BasedSchemaField
  propKey: string
  values: { [key: string]: any }
  variant: 'extensive' | 'minimal'
}) {
  if (field.type === 'string' && field.contentMediaType) {
    return (
      <FormField variant={variant} field={field} name={field.title ?? propKey}>
        <FileInput
          mimeType={field.contentMediaType}
          value={values[propKey] ? { src: values[propKey] } : undefined}
          onChange={(file) => {
            console.log('uploaded file', file)
          }}
        />
      </FormField>
    )
  }

  if (field.type === 'string') {
    return (
      <FormField variant={variant} field={field} name={field.title ?? propKey}>
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
        fieldKey={propKey}
        field={field}
        items={values[propKey] ?? []}
      />
    )
  }

  if (field.type === 'array') {
    return (
      <FormArray
        variant={variant}
        fieldKey={propKey}
        field={field}
        values={values[propKey] ?? []}
      />
    )
  }

  if (field.type === 'record') {
    return (
      <FormRecord
        variant={variant}
        fieldKey={propKey}
        field={field}
        values={values[propKey] ?? {}}
      />
    )
  }

  if (field.type === 'object') {
    return (
      <FormObject
        variant={variant}
        fieldKey={propKey}
        field={field}
        values={values[propKey] ?? {}}
      />
    )
  }

  return null
}
