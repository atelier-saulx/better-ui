import * as React from 'react'
import { BasedSchemaFieldArray } from '@based/schema'
import { FormField } from './form-field'
import { Table } from './table'

export function FormArray({
  fieldKey,
  field,
  values,
  variant,
}: {
  fieldKey: string
  field: BasedSchemaFieldArray
  values: any[]
  variant: 'extensive' | 'minimal'
}) {
  const colls: string[] = []

  // array / refs / set /
  if (field.values.type === 'object') {
    for (const key in field.values.properties) {
      colls.push(field.values.properties[key].title ?? key)
    }
  }

  return (
    <FormField variant={variant} field={field} name={field.title ?? fieldKey}>
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
