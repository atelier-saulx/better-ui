import * as React from 'react'
import * as SelectBase from '@radix-ui/react-select'
import { styled, Style } from 'inlines'
import {
  IconCheckSmall,
  IconChevronDownSmall,
  IconSmallClose,
  border,
  borderRadius,
  boxShadow,
  Text,
  color,
  useControllableState,
  Button,
  textVariants,
} from '../../index.js'
import { mergeRefs } from 'react-merge-refs'

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
  description?: string
  disabled?: boolean
  style?: Style
  checksum?: number
  clearable?: boolean
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
      description,
      disabled,
      style,
      checksum,
      clearable = false,
    },
    ref,
  ) => {
    const Wrapper = label ? styled.label : styled.div
    const wrapperRef = React.useRef<HTMLDivElement | null>(null)

    const [state, setState] = useControllableState({
      value,
      defaultValue,
      onChange,
      checksum,
    })

    React.useEffect(() => {
      if (autoFocus && wrapperRef.current) {
        wrapperRef.current.focus()
      }
    }, [autoFocus])

    return (
      <SelectBase.Root
        value={state ?? ''}
        onValueChange={setState}
        disabled={disabled}
      >
        <Wrapper
          style={{
            cursor: disabled ? 'not-allowed' : 'default',
            opacity: disabled ? 0.6 : 1,
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            '&[data-placeholder] > div': {
              color: `${color('content', 'secondary')} !important`,
            },
            '&[data-state="open"] > div': {
              border: `1px solid ${color('interactive', 'primary')} !important`,
              boxShadow: `0 0 0 2px color-mix(in srgb, ${color('interactive', 'primary')}  20%, transparent) !important`,
            },
            ...(error && {
              '&[data-state="open"] > div': {
                border: border('error'),
                boxShadow: boxShadow('error'),
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
          <styled.div style={{ position: 'relative' }}>
            <SelectBase.Trigger asChild>
              <styled.div
                autoFocus={autoFocus}
                tabIndex={disabled ? '-1' : 0}
                ref={mergeRefs([wrapperRef, ref])}
                style={{
                  position: 'relative',
                  ...textVariants['body-bold'],
                  height: variant === 'small' ? 36 : 40,
                  display: 'flex',
                  alignItems: 'center',
                  padding:
                    variant === 'regular'
                      ? '8px 40px 8px 12px'
                      : '3px 28px 3px 10px',
                  borderRadius:
                    variant === 'regular'
                      ? borderRadius('small')
                      : borderRadius('tiny'),
                  border:
                    variant === 'small' ? '1px solid transparent' : border(),
                  color: color('content', 'primary'),
                  '&:before': {
                    content: '""',
                    display: 'inline-block',
                  },
                  '&:hover': {
                    border:
                      variant === 'small'
                        ? '1px solid transparent'
                        : border('hover'),
                  },
                  '&:focus':
                    variant === 'small'
                      ? {}
                      : {
                          border: `1px solid ${color('interactive', 'primary')}`,
                          boxShadow: `0 0 0 2px color-mix(in srgb, ${color('interactive', 'primary')}  20%, transparent) !important`,
                        },
                  ...(error && {
                    border: border('error'),
                    '&:hover': {
                      border: border('error'),
                    },
                  }),
                }}
              >
                {state ? (
                  <SelectBase.Value placeholder={placeholder} />
                ) : (
                  placeholder
                )}

                <IconChevronDownSmall
                  style={{
                    position: 'absolute',
                    top: variant === 'regular' ? 8 : 6,
                    right: variant === 'regular' ? 12 : 6,
                    color: color('content', 'primary'),
                  }}
                />
              </styled.div>
            </SelectBase.Trigger>

            {clearable && state && (
              <Button
                variant="icon-only"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setState(null)
                }}
                style={{
                  position: 'absolute',
                  top: variant === 'regular' ? 11 : 9,
                  right: variant === 'regular' ? 36 : 36,
                  color: color('content', 'primary'),
                }}
              >
                <IconSmallClose />
              </Button>
            )}
          </styled.div>

          {description !== undefined ? (
            <Text
              color="secondary"
              variant="body-bold"
              style={{ marginTop: 8 }}
            >
              {description}
            </Text>
          ) : null}
        </Wrapper>

        <SelectBase.Portal>
          <SelectBase.Content
            position="popper"
            style={{
              background: color('background', 'screen'),
              overflow: 'hidden',
              // width: 'var(--radix-select-trigger-width)',
              maxHeight: 'var(--radix-select-content-available-height)',
              borderRadius: borderRadius('small'),
              border: border(),
              boxShadow: boxShadow('elevation'),
            }}
            sideOffset={8}
          >
            <SelectBase.Viewport style={{ padding: 8 }}>
              {/* Clear selection put value to null */}
              {clearable && state && (
                <SelectBase.Item value={null} asChild>
                  <styled.div
                    style={{
                      '&[data-highlighted] > :first-child': {
                        background: color('background', 'neutral'),
                      },
                    }}
                  >
                    <styled.div
                      style={{
                        padding: '4px 12px 4px 42px',
                        position: 'relative',
                        outline: 'none',
                        userSelect: 'none',
                        borderRadius: borderRadius('small'),
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
                      <Text color="secondary">Clear value</Text>
                    </styled.div>
                    <styled.div
                      style={{
                        marginTop: 8,
                        marginBottom: 8,
                        marginLeft: -8,
                        marginRight: -8,
                        width: '100%',
                        borderBottom: border(),
                      }}
                    />
                  </styled.div>
                </SelectBase.Item>
              )}
              {/* Clear selection */}

              {options?.map((option, index) => {
                const {
                  value,
                  label = null,
                  prefix = null,
                } = typeof option === 'string' ? { value: option } : option

                return (
                  <SelectBase.Item key={value || index} value={value} asChild>
                    <styled.div
                      style={{
                        padding: '4px 12px 4px 42px',
                        borderRadius: borderRadius('small'),
                        position: 'relative',
                        outline: 'none',
                        userSelect: 'none',
                        ...textVariants.body,
                        '&[data-highlighted]': {
                          background: color('background', 'neutral'),
                        },
                      }}
                    >
                      {state && (
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
                      )}
                      <SelectBase.ItemText>
                        {prefix && (
                          <styled.div
                            style={{
                              display: 'inline-block',
                              marginRight: 8,
                            }}
                          >
                            {prefix}
                          </styled.div>
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
  },
)
