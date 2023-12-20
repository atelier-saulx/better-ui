import * as React from 'react'
import { styled } from 'inlines'
import { useControllableState } from '../../utils/hooks/useControllableState'
import { IconSmallArrowheadDown, IconSmallArrowheadTop } from '../Icons'
import { color } from '../../utils/colors'

export type NumberInputProps = {
  placeholder?: string
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  formName?: string
  label?: string
  step?: number
  variant?: 'regular' | 'small'
  error?: boolean
  autoFocus?: boolean
}

const Wrapper = ({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
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
  return children
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      placeholder,
      value: valueProp,
      defaultValue: defaultValueProp,
      onChange,
      formName,
      label,
      step = 1,
      variant = 'regular',
      error,
      autoFocus,
    },
    ref
  ) => {
    const [value, setValue] = useControllableState<number>({
      prop: valueProp,
      defaultProp: defaultValueProp,
      onChange,
    })

    return (
      <Wrapper label={label}>
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
            autoFocus={autoFocus}
            value={value ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const numberValue = parseFloat(e.target.value)
              if (isNaN(numberValue)) {
                setValue(undefined)
                return
              }

              setValue(numberValue)
            }}
            ref={ref}
            name={formName}
            placeholder={placeholder}
            step={step}
            style={{
              fontSize: 14,
              lineHeight: '24px',
              width: '100%',
              padding: variant === 'regular' ? '8px 40px 8px 12px' : '3px 10px',
              borderRadius:
                variant === 'regular'
                  ? 'var(--radius-small)'
                  : 'var(--radius-tiny)',
              border:
                variant === 'small'
                  ? '1px solid transparent'
                  : '1px solid var(--interactive-secondary)',
              color: 'var(--content-primary)',
              outline: 'none',
              appearance: 'none',
              '&::placeholder': { color: 'var(--content-secondary)' },
              '&:hover': {
                border:
                  variant === 'small'
                    ? '1px solid transparent'
                    : '1px solid var(--interactive-secondary-hover)',
              },
              '&:focus': {
                border: '1px solid var(--interactive-primary) !important',
                boxShadow:
                  '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
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
                border: '1px solid var(--sentiment-negative)',
                '&:hover': {
                  border: '1px solid var(--sentiment-negative)',
                },
                '&:focus': {
                  border: '1px solid var(--sentiment-negative)',
                  boxShadow:
                    '0 0 0 2px color-mix(in srgb, var(--sentiment-negative) 20%, transparent)',
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
                  borderRadius: 'var(--radius-tiny)',
                },
              }}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                if (typeof value !== 'number') return

                setValue(value + step)
              }}
            >
              <IconSmallArrowheadTop
                height={variant === 'regular' ? 16 : 12}
                width={variant === 'regular' ? 16 : 12}
              />
            </styled.div>
            <styled.div
              style={{
                display: 'flex',
                '&:hover': {
                  background: color('background', 'neutral'),
                  borderRadius: 'var(--radius-tiny)',
                },
              }}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                if (typeof value !== 'number') return

                setValue(value - step)
              }}
            >
              <IconSmallArrowheadDown
                height={variant === 'regular' ? 16 : 12}
                width={variant === 'regular' ? 16 : 12}
              />
            </styled.div>
          </div>
        </div>
      </Wrapper>
    )
  }
)
