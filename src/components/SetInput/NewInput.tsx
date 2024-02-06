import React from 'react'
import { NumberInput, TextInput } from '../../index.js'
import { BasedSchemaFieldSet } from '@based/schema'

export const NewInput = ({
  onChange,
  fieldItemType,
}: {
  fieldItemType?: 'integer' | 'number' | 'string'
  onChange: (v: any) => void
}) => {
  if (fieldItemType === 'number' || fieldItemType === 'integer') {
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
