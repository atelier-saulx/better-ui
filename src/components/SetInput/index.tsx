import React from 'react'
import { Style, styled } from 'inlines'
import { Stack, Text, useControllableState } from '../../index.js'
import { Tag } from './Tag.js'
import { AddNew } from './AddNew.js'
import { TableCtx } from '../Form/types.js'
import { BasedSchemaFieldSet, Path } from '@based/schema'

export type SetInputProps = {
  placeholder?: string
  value: (string | number)[]
  defaultValue?: string
  onChange?: (value: string[] | number[]) => void
  label?: string
  options?: (
    | { value: string; label?: string; prefix?: React.ReactNode }
    | string
  )[]
  variant?: 'large' | 'small'
  error?: boolean
  autoFocus?: boolean
  description?: string
  disabled?: boolean
  style?: Style
  checksum?: number
  clearable?: boolean
  title?: string
  type?: string
  fieldItemType?: 'number' | 'integer' | 'string'
}

export const SetInput = React.forwardRef<HTMLInputElement, SetInputProps>(
  (
    {
      value = [],
      onChange,
      checksum,
      variant = 'large',
      title,
      description,
      fieldItemType,
      disabled,
      style,
    },
    ref,
  ) => {
    const [state = [], setState] = useControllableState({
      value,
      onChange,
      checksum,
    })

    const marginTop = variant === 'small' ? 12 : 0

    console.log(state)

    return (
      <Stack
        direction="column"
        align="start"
        style={{
          pointerEvents: disabled ? 'none' : 'auto',
          opacity: disabled ? 0.6 : 1,
          ...style,
        }}
      >
        <Text
          weight="strong"
          style={{ marginBottom: description ? '-2px' : 'inherit' }}
        >
          {title}
        </Text>
        {description && (
          <Text color="secondary" style={{ marginBottom: 12 }}>
            {description}
          </Text>
        )}
        <Stack
          grid
          style={{ marginTop }}
          // display={value.length}
        >
          {state.map((v: string | number, index: number) => {
            return (
              <Tag
                key={v}
                value={v}
                onRemove={() => {
                  const nValue = [...state]
                  nValue.splice(index, 1)
                  setState(nValue)
                }}
              />
            )
          })}
        </Stack>
        <Stack style={{ height: 52, width: 'auto' }}>
          <AddNew
            state={state}
            setState={setState}
            fieldItemType={fieldItemType}
          />
        </Stack>
      </Stack>
    )
  },
)
