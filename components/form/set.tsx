import * as React from 'react'
import { BasedSchemaFieldSet, BasedSchemaFieldPrimitive } from '@based/schema'
import { FormField } from './form-field'
import { Table } from './table'

export function FormSet({
  fieldKey,
  field,
  items,
  variant,
}: {
  fieldKey: string
  field: BasedSchemaFieldSet
  items: any[]
  variant: 'extensive' | 'minimal'
}) {
  return (
    <FormField variant={variant} field={field} name={field.title ?? fieldKey}>
      <Table
        field={field.items}
        colls={[]}
        rows={items}
        onNew={() => {}}
        onRemove={() => {}}
      />
    </FormField>
  )
}
