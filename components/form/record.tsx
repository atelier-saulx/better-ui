import * as React from 'react'
import { BasedSchemaFieldObject, BasedSchemaFieldRecord } from '@based/schema'
import { FormField } from './form-field'
import { Table } from './table'

export function FormRecord({
  fieldKey,
  field,
  values,
  variant,
}: {
  variant: 'extensive' | 'minimal'
  fieldKey: string
  field: BasedSchemaFieldRecord
  values: { [key: string]: any }
}) {
  const colls: string[] = ['key']
  const parsedValues: { [key: string]: any }[] = []

  const fieldValue: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }

  // array / refs / set /
  if (field.values.type === 'object') {
    fieldValue.properties.$key = { type: 'string', title: 'key' }

    for (const key in field.values.properties) {
      colls.push(field.values.properties[key].title ?? key)
      fieldValue.properties[key] = field.values.properties[key]
    }
    for (const key in values) {
      parsedValues.push({ $key: key, ...values[key] })
    }
  } else {
    // prmitive only
    colls.push('value')

    fieldValue.properties.$key = { type: 'string', title: 'key' }
    fieldValue.properties.$value = { ...field.values, title: 'value' }

    // field.values
    for (const key in values) {
      parsedValues.push({ $key: key, $value: values[key] })
    }
  }

  return (
    <FormField variant={variant} field={field} name={field.title ?? fieldKey}>
      <Table
        field={fieldValue}
        colls={colls}
        rows={parsedValues}
        onNew={() => {}}
        onRemove={() => {}}
      />
    </FormField>
  )
}
