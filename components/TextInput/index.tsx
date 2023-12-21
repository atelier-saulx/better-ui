import * as React from 'react'
import { Style, styled } from 'inlines'
import { color, borderRadius } from '../../utils/colors'

export type TextInputProps = {
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  formName?: string
  label?: string
  variant?: 'regular' | 'small'
  error?: boolean
  autoFocus?: boolean
  style?: Style
}

const Wrapper = ({
  label,
  children,
  style,
}: {
  label?: string
  children: React.ReactNode
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
              }
            : undefined
        }
      >
        {children}
      </styled.label>
    )
  }

  return <styled.div style={{ width: '100%', ...style }}>{children}</styled.div>
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      formName,
      label,
      onBlur,
      autoFocus,
      variant = 'regular',
      error,
      onKeyDown,
      style,
    },
    ref
  ) => {
    return (
      <Wrapper label={label} style={style}>
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
          autoFocus={autoFocus}
          value={value}
          defaultValue={defaultValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value)
          }}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={ref}
          name={formName}
          placeholder={placeholder}
          style={{
            fontSize: 14,
            lineHeight: '24px',
            width: '100%',
            padding: variant === 'regular' ? '8px 12px' : '3px 10px',
            borderRadius:
              variant === 'regular'
                ? borderRadius('small')
                : borderRadius('tiny'),
            border:
              variant === 'small'
                ? '1px solid transparent'
                : '1px solid var(--interactive-secondary)',
            color: color('content', 'primary'),
            outline: 'none',
            '&::placeholder': { color: color('content', 'secondary') },
            '&:hover': {
              border:
                variant === 'small'
                  ? '1px solid transparent'
                  : '1px solid var(--interactive-secondary-hover)',
            },
            '&:focus, &:focus:hover': {
              border: '1px solid var(--interactive-primary)',
              boxShadow:
                '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
            },
            ...(error && {
              border: '1px solid var(--semantic-background-error)',
              '&:hover': {
                border: '1px solid var(--semantic-background-error)',
              },
              '&:focus, &:focus:hover': {
                border: '1px solid var(--semantic-background-error)',
                boxShadow:
                  '0 0 0 2px color-mix(in srgb, var(--semantic-background-error) 20%, transparent)',
              },
            }),
          }}
        />
      </Wrapper>
    )
  }
)
