import * as React from 'react'
import { Style, styled } from 'inlines'
import {
  color,
  borderRadius,
  border,
  boxShadow,
  useControllableState,
  Spinner,
  IconSearch,
} from '../../index.js'

export type SearchInputProps = {
  placeholder?: string
  loading?: boolean
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  checksum?: number
  onBlur?: () => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  formName?: string
  error?: boolean
  autoFocus?: boolean
  description?: string
  disabled?: boolean
  style?: Style
  required?: boolean
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      checksum,
      formName,
      onBlur,
      autoFocus,
      error,
      onKeyDown,
      disabled,
      loading,
      style,
      required,
    },
    ref,
  ) => {
    const [state = '', setState] = useControllableState(
      {
        value,
        onChange,
        checksum,
      },
      500,
    )

    let Icon = loading ? Spinner : IconSearch

    return (
      <styled.div style={{ position: 'relative', ...style }}>
        {/* @ts-ignore */}
        <Icon
          size={18}
          style={{
            position: 'absolute',
            top: 9,
            left: 12,
            color: color('content', 'secondary'),
          }}
        />
        <styled.input
          tabIndex={disabled ? -1 : undefined}
          autoFocus={autoFocus}
          value={state}
          defaultValue={defaultValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation()
            setState(e.target.value)
          }}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          required={required}
          ref={ref}
          name={formName}
          placeholder={placeholder}
          style={{
            pointerEvents: disabled ? 'none' : 'auto',
            background: 'none',
            fontSize: 14,
            backgroundColor: color('background', 'primary'),
            lineHeight: '24px',
            width: '100%',

            padding: '5px 40px',
            borderRadius: borderRadius('large'),
            border: '1px solid transparent',
            color: color('content', 'primary'),
            outline: 'none',
            '&::placeholder': { color: color('content', 'secondary') },
            '&:hover': {
              border: border('hover'),
            },
            '&:focus, &:focus:hover': {
              border: border('focus'),
              boxShadow: boxShadow('focus'),
            },
            ...(error && {
              border: border('error'),
              '&:hover': {
                border: border('error'),
              },
              '&:focus, &:focus:hover': {
                border: border('error'),
                boxShadow: boxShadow('error'),
              },
            }),
          }}
        />
      </styled.div>
    )
  },
)
