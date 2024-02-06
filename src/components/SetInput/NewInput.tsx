import React from 'react'
import { NumberInput, TextInput } from '../../index.js'
import { BasedSchemaFieldSet } from '@based/schema'

export const NewInput = ({
  onChange,
  field,
}: {
  field: BasedSchemaFieldSet
  onChange: (v: any) => void
}) => {
  if (field.items.type === 'number' || field.items.type === 'integer') {
    return (
      <NumberInput
        style={{
          marginRight: 8,
          width: 400,
        }}
        onChange={onChange}
        autoFocus
        variant="small"
      />
    )
  }
  return (
    <TextInput
      style={{
        marginRight: 8,
        width: 400,
      }}
      onChange={onChange}
      autoFocus
      variant="small"
    />
  )
}
