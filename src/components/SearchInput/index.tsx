import * as React from 'react'
import { Style, styled } from 'inlines'
import {
  color,
  borderRadius,
  border,
  boxShadow,
  useControllableState,
  Text,
  Stack,
  IconSearch,
} from '../../index.js'

export type SearchInputProps = {
  placeholder?: string
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

const Wrapper = ({
  label,
  children,
  disabled,
  style,
}: {
  label?: string
  children: React.ReactNode
  disabled?: boolean
  style?: Style
}) => {
  if (label) {
    return (
      <styled.label
        style={
          label
            ? {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'not-allowed' : 'default',
              }
            : undefined
        }
        onClick={(e) => (disabled ? e.preventDefault() : undefined)}
      >
        {children}
      </styled.label>
    )
  }

  return (
    <styled.div
      style={{
        width: '100%',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        ...style,
      }}
      onClick={(e) => (disabled ? e.preventDefault() : undefined)}
    >
      {children}
    </styled.div>
  )
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
      style,
      required,
    },
    ref,
  ) => {
    const [state = '', setState] = useControllableState({
      value,
      onChange,
      checksum,
    })

    return (
      <styled.div style={{ position: 'relative', ...style }}>
        <IconSearch
          size={18}
          style={{
            position: 'absolute',
            top: 9,
            left: 12,
            color: color('content', 'secondary'),
          }}
        />
        <styled.input
          tabIndex={disabled ? '-1' : 'auto'}
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
            pointerEvents: disabled ? 'none' : 'default',
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
