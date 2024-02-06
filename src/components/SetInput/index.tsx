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
  items?: { type: 'number' | 'string' | string }
  // for the table
  ctx?: TableCtx
  field?: BasedSchemaFieldSet
  path?: Path
}

export const SetInput = React.forwardRef<HTMLInputElement, SetInputProps>(
  (
    {
      value = [],
      defaultValue,
      onChange,
      checksum,
      label,
      autoFocus,
      variant = 'large',
      clearable,
      error,
      title,
      type,
      items,
      description,
      disabled,
      style,
      ctx,
      field,
      path,
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
      <Stack direction="column" align="start">
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
                  console.log('new val-->', nValue)

                  //   ctx.listeners.onChangeHandler(ctx, path, nValue)
                }}
              />
            )
          })}
        </Stack>
        <Stack style={{ height: 52, width: 'auto' }}>
          <AddNew field={field} value={value} ctx={ctx} path={path} />
        </Stack>
      </Stack>
    )
  },
)
