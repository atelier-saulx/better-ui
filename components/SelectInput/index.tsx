import * as React from 'react'
import * as SelectBase from '@radix-ui/react-select'
import { styled, Style } from 'inlines'
import { IconCheckSmall, IconChevronDownSmall } from '../Icons'
import { mergeRefs } from 'react-merge-refs'
import { color } from '../../utils/colors'

export type SelectInputProps = {
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  options?: (
    | { value: string; label?: string; prefix?: React.ReactNode }
    | string
  )[]
  variant?: 'regular' | 'small'
  error?: boolean
  autoFocus?: boolean
  style?: Style
}

export const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      label,
      options,
      variant = 'regular',
      error,
      autoFocus,
      style,
    },
    ref
  ) => {
    const Wrapper = label ? styled.label : styled.div
    const wrapperRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      if (autoFocus && wrapperRef.current) {
        wrapperRef.current.focus()
      }
    }, [autoFocus])

    return (
      <SelectBase.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
      >
        <SelectBase.Trigger asChild>
          <Wrapper
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              '&[data-placeholder] > div': {
                color: 'var(--content-secondary) !important',
              },
              '&[data-state="open"] > div': {
                border: '1px solid var(--interactive-primary) !important',
                boxShadow:
                  '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent) !important',
              },
              ...(error && {
                '&[data-state="open"] > div': {
                  border: '1px solid var(--sentiment-negative)',
                  boxShadow:
                    '0 0 0 2px color-mix(in srgb, var(--sentiment-negative) 20%, transparent)',
                },
              }),
              ...style,
            }}
          >
            {label && (
              <span
                style={{
                  marginBottom: 8,
                  fontSize: 14,
                  lineHeight: '24px',
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            )}
            <styled.div
              autoFocus={autoFocus}
              tabIndex={0}
              ref={mergeRefs([wrapperRef, ref])}
              style={{
                position: 'relative',
                fontSize: 14,
                lineHeight: '24px',
                padding:
                  variant === 'regular'
                    ? '8px 40px 8px 12px'
                    : '3px 28px 3px 10px',
                borderRadius:
                  variant === 'regular'
                    ? 'var(--radius-small)'
                    : 'var(--radius-tiny)',
                border:
                  variant === 'small'
                    ? '1px solid transparent'
                    : '1px solid var(--interactive-secondary)',
                color: color('content', 'primary'),
                '&:before': {
                  content: '""',
                  display: 'inline-block',
                },
                '&:hover': {
                  border:
                    variant === 'small'
                      ? '1px solid transparent'
                      : '1px solid var(--interactive-secondary-hover)',
                },
                '&:focus': {
                  border: '1px solid var(--interactive-primary)',
                  boxShadow:
                    '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent) !important',
                },
                ...(error && {
                  border: '1px solid var(--sentiment-negative)',
                  '&:hover': {
                    border: '1px solid var(--sentiment-negative)',
                  },
                }),
              }}
            >
              <SelectBase.Value placeholder={placeholder} />
              <IconChevronDownSmall
                style={{
                  position: 'absolute',
                  top: variant === 'regular' ? 10 : 5,
                  right: variant === 'regular' ? 12 : 6,
                  color: color('content', 'primary'),
                }}
              />
            </styled.div>
          </Wrapper>
        </SelectBase.Trigger>
        <SelectBase.Portal>
          <SelectBase.Content
            position="popper"
            style={{
              background: color('background', 'screen'),
              overflow: 'hidden',
              width: 'var(--radix-select-trigger-width)',
              maxHeight: 'var(--radix-select-content-available-height)',
              borderRadius: 'var(--radius-small)',
              border: '1px solid var(--interactive-secondary)',
              boxShadow: 'var(--shadow-elevation)',
            }}
            sideOffset={8}
          >
            <SelectBase.Viewport style={{ padding: 8 }}>
              {options?.map((option) => {
                const { value, label = null, prefix = null } =
                  typeof option === 'string' ? { value: option } : option

                return (
                  <SelectBase.Item key={value} value={value} asChild>
                    <styled.div
                      style={{
                        padding: '4px 12px 4px 42px',
                        borderRadius: 'var(--radius-small)',
                        fontSize: 14,
                        lineHeight: '24px',
                        position: 'relative',
                        outline: 'none',
                        userSelect: 'none',
                        '&[data-highlighted]': {
                          background: color('background', 'neutral'),
                        },
                      }}
                    >
                      <SelectBase.ItemIndicator>
                        <IconCheckSmall
                          style={{
                            position: 'absolute',
                            top: 6,
                            left: 12,
                            color: color('content', 'primary'),
                          }}
                        />
                      </SelectBase.ItemIndicator>
                      <SelectBase.ItemText>
                        {prefix && (
                          <div
                            style={{ display: 'inline-block', marginRight: 8 }}
                          >
                            {prefix}
                          </div>
                        )}
                        {label ?? value}
                      </SelectBase.ItemText>
                    </styled.div>
                  </SelectBase.Item>
                )
              })}
            </SelectBase.Viewport>
          </SelectBase.Content>
        </SelectBase.Portal>
      </SelectBase.Root>
    )
  }
)
