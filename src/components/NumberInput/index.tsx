import * as React from 'react'
import { Style, styled } from 'inlines'
import {
  useControllableState,
  IconSmallArrowheadDown,
  IconSmallArrowheadTop,
  borderRadius,
  color,
  border,
  boxShadow,
  Text,
} from '../../index.js'

export type NumberInputProps = {
  placeholder?: string
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  checksum?: number
  formName?: string
  label?: string
  step?: number
  variant?: 'regular' | 'small'
  error?: boolean
  autoFocus?: boolean
  description?: string
  disabled?: boolean
  style?: Style
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

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      placeholder,
      value: valueProp,
      defaultValue: defaultValueProp,
      onChange,
      checksum,
      formName,
      label,
      step = 1,
      variant = 'regular',
      error,
      autoFocus,
      description,
      disabled,
      style,
    },
    ref,
  ) => {
    const [value = '', setValue] = useControllableState<number>({
      value: valueProp,
      defaultValue: defaultValueProp,
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
        <div style={{ position: 'relative' }}>
          <styled.input
            type="number"
            tabIndex={disabled ? '-1' : 'auto'}
            autoFocus={autoFocus}
            value={valueProp ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.stopPropagation()
              const numberValue = parseFloat(e.target.value)

              if (isNaN(numberValue)) {
                setValue(null)
                return
              }

              setValue(numberValue)
            }}
            ref={ref}
            name={formName}
            placeholder={placeholder}
            step={step}
            onWheel={(e) => {
              e.target.blur()
            }}
            style={{
              pointerEvents: disabled ? 'none' : 'default',
              background: 'none',
              fontSize: 14,
              lineHeight: '24px',
              width: '100%',
              padding: variant === 'regular' ? '8px 40px 8px 12px' : '3px 10px',
              borderRadius:
                variant === 'regular'
                  ? borderRadius('small')
                  : borderRadius('tiny'),
              border: variant === 'small' ? '1px solid transparent' : border(),
              color: color('content', 'primary'),
              outline: 'none',
              appearance: 'none',
              '&::placeholder': { color: color('content', 'secondary') },
              '&:hover': {
                border:
                  variant === 'small'
                    ? '1px solid transparent'
                    : border('hover'),
              },
              '&:focus, &:focus:hover': {
                border: `1px solid ${color('interactive', 'primary')} `,
                boxShadow: boxShadow('focus'),
              },
              '&::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: '0',
              },
              '&::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: '0',
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
          <div
            style={{
              position: 'absolute',
              right: 12,
              top: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              userSelect: 'none',
            }}
          >
            <styled.div
              style={{
                display: 'flex',
                '&:hover': {
                  background: color('background', 'neutral'),
                  borderRadius: borderRadius('tiny'),
                },
              }}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                if (typeof value !== 'number') return

                if (!disabled) {
                  setValue(value + step)
                }
              }}
            >
              <IconSmallArrowheadTop size={variant === 'regular' ? 16 : 12} />
            </styled.div>
            <styled.div
              style={{
                display: 'flex',
                '&:hover': {
                  background: color('background', 'neutral'),
                  borderRadius: borderRadius('tiny'),
                },
              }}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                if (typeof value !== 'number') return

                if (!disabled) {
                  setValue(value - step)
                }
              }}
            >
              <IconSmallArrowheadDown size={variant === 'regular' ? 16 : 12} />
            </styled.div>
          </div>
        </div>
        {description !== undefined ? (
          <Text color="secondary" variant="body-bold" style={{ marginTop: 8 }}>
            {description}
          </Text>
        ) : null}
      </Wrapper>
    )
  },
)
