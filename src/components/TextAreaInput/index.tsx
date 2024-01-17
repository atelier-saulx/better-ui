import * as React from 'react'
import { Style, styled } from 'inlines'
import {
  border,
  borderRadius,
  boxShadow,
  color,
  Text,
  useControllableState,
} from '../../index.js'

export type TextAreaInputProps = {
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  formName?: string
  label?: string
  variant?: 'regular' | 'small'
  error?: boolean
  autoFocus?: boolean
  description?: string
  style?: Style
  disabled?: boolean
  checksum?: number
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
        onClick={(e) => (disabled ? e.preventDefault() : null)}
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
      onClick={(e) => (disabled ? e.preventDefault() : null)}
    >
      {children}
    </styled.div>
  )
}

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      formName,
      label,
      variant = 'regular',
      error,
      autoFocus,
      description,
      disabled,
      style,
      checksum,
    },
    ref
  ) => {
    const [state = '', setState] = useControllableState({
      value,
      defaultValue,
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
        {description !== undefined ? (
          <Text
            color="secondary"
            variant="body-bold"
            style={{ marginBottom: 8, marginTop: -6 }}
          >
            {description}
          </Text>
        ) : null}
        <styled.div
          data-value={state}
          style={{
            pointerEvents: disabled ? 'none' : 'default',
            position: 'relative',
            display: 'grid',
            width: '100%',
            '&::after': {
              width: '100%',
              content: `attr(data-value) " "`,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              visibility: 'hidden',
              gridArea: '1 / 1 / 2 / 2',
              border: '1px solid transparent',
              fontSize: '14px',
              lineHeight: '24px',
              padding: variant === 'regular' ? '8px 12px' : '3px 10px',
            },
          }}
        >
          <styled.textarea
            tabIndex={disabled ? '-1' : 0}
            value={value}
            defaultValue={defaultValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setState(e.target.value)
            }}
            autoFocus={autoFocus}
            ref={ref}
            name={formName}
            rows={variant === 'regular' ? 3 : 2}
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
              border: variant === 'small' ? '1px solid transparent' : border(),
              color: color('content', 'primary'),
              gridArea: '1 / 1 / 2 / 2',
              outline: 'none',
              '&::placeholder': { color: color('content', 'secondary') },
              '&:hover': {
                border:
                  variant === 'small'
                    ? '1px solid transparent'
                    : border('hover'),
              },
              '&:focus, &:focus:hover': {
                border: '1px solid var(--interactive-primary)',
                boxShadow: boxShadow('focus'),
              },
              resize: 'none',
              overflow: 'hidden',
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
      </Wrapper>
    )
  }
)
