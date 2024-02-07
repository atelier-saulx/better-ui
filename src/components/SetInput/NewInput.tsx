import React from 'react'
import { NumberInput, SelectInput, TextInput } from '../../index.js'

export const NewInput = ({
  onChange,
  fieldItemType,
  options,
}: {
  fieldItemType?: 'integer' | 'number' | 'string' | 'list'
  onChange: (v: any) => void
  options?: number[] | string[]
}) => {
  if (options) {
    return (
      <SelectInput
        style={{
          minWidth: 154,
          marginRight: 12,
          borderRadius: 4,
          '& div:first-child': {
            '& div:first-child': {
              height: '36px !important',
            },
          },
        }}
        autoFocus
        options={options as string[]}
        onChange={onChange}
      />
    )
  }

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
