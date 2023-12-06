import * as React from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { FormField } from './form-field'
import { Table } from './table'

export function FormObject({
  fieldKey,
  field,
  values,
  variant,
}: {
  variant: 'extensive' | 'minimal'
  fieldKey: string
  field: BasedSchemaFieldObject
  values: { [key: string]: any }
}) {
  const parsedValues: { [key: string]: any }[] = []

  const fieldValue: BasedSchemaFieldObject = {
    type: 'object',
    properties: {
      $key: { type: 'string', title: 'key', readOnly: true },
      $value: { type: 'string', title: 'value' },
    },
  }

  for (const key in field.properties) {
    parsedValues.push({ $key: key, $value: values[key] })
  }

  return (
    <FormField variant={variant} field={field} name={field.title ?? fieldKey}>
      <Table
        orginalField={field}
        field={fieldValue}
        colls={[]}
        rows={parsedValues}
        onRemove={() => {}}
      />
    </FormField>
  )
}
