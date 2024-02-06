import React from 'react'
import { Style } from 'inlines'
import { Stack, Text, useControllableState } from '../../index.js'
import { Tag } from './Tag.js'
import { AddNew } from './AddNew.js'

export type SetInputProps = {
  value: (string | number)[]
  onChange?: (value: string[] | number[]) => void
  label?: string
  variant?: 'large' | 'small'
  description?: string
  disabled?: boolean
  style?: Style
  checksum?: number
  fieldItemType?: 'number' | 'integer' | 'string'
  options?: number[] | string[]
}

export const SetInput = React.forwardRef<HTMLInputElement, SetInputProps>(
  (
    {
      value,
      onChange,
      checksum,
      variant = 'large',
      label,
      description,
      fieldItemType,
      disabled,
      options,
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
          style={{ marginBottom: description ? '-2px' : '12px' }}
        >
          {label}
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
          ref={ref}
        >
          {state.length > 0 &&
            state.map((v: string | number, index: number) => {
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
            options={options}
          />
        </Stack>
      </Stack>
    )
  },
)
