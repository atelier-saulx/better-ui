import * as React from 'react'
import { BasedSchemaFieldArray } from '@based/schema'
import { FormField } from './form-field'
import { Table } from './table'

export function FormArray({
  fieldKey,
  field,
  values,
}: {
  fieldKey: string
  field: BasedSchemaFieldArray
  values: any[]
}) {
  const colls: string[] = []

  // array / refs / set /
  if (field.values.type === 'object') {
    for (const key in field.values.properties) {
      colls.push(field.values.properties[key].title ?? key)
    }
  }

  return (
    <FormField field={field} name={field.title ?? fieldKey}>
      <Table
        order
        field={field.values}
        colls={colls}
        rows={values}
        onNew={() => {}}
        onRemove={() => {}}
      />
    </FormField>
  )
}
