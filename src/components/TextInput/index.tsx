import * as React from 'react'
import { Style, styled } from 'inlines'
import {
  color,
  borderRadius,
  border,
  boxShadow,
  useControllableState,
  Text,
} from '../../index.js'

export type TextInputProps = {
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  checksum?: number
  onBlur?: () => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  formName?: string
  label?: string
  variant?: 'regular' | 'small'
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

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      checksum,
      formName,
      label,
      onBlur,
      autoFocus,
      variant = 'regular',
      error,
      onKeyDown,
      description,
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
      <Wrapper label={label} disabled={disabled} style={style}>
        {label && (
          <styled.span
            style={{
              marginBottom: 8,
              fontSize: 14,
              lineHeight: '24px',
              fontWeight: 500,
            }}
          >
            {label}
          </styled.span>
        )}
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
            lineHeight: '24px',
            width: '100%',
            padding: variant === 'regular' ? '8px 12px' : '3px 10px',
            borderRadius:
              variant === 'regular'
                ? borderRadius('small')
                : borderRadius('tiny'),
            border: variant === 'small' ? '1px solid transparent' : border(),
            color: color('content', 'primary'),
            outline: 'none',
            '&::placeholder': { color: color('content', 'secondary') },
            '&:hover': {
              border:
                variant === 'small' ? '1px solid transparent' : border('hover'),
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
        {description !== undefined ? (
          <Text color="secondary" variant="body-bold" style={{ marginTop: 8 }}>
            {description}
          </Text>
        ) : null}
      </Wrapper>
    )
  },
)
