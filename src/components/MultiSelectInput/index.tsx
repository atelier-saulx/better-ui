import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  useControllableState,
  textVariants,
  borderRadius,
  border,
  color,
  Text,
  IconClose,
  boxShadow,
  IconCheckSmall,
  IconChevronDownSmall,
} from '../../index.js'
import * as Popover from '@radix-ui/react-popover'

export type MultiSelectInputProps = {
  value?: Set<string>
  onChange?: (value: Set<string>) => void
  defaultValue?: Set<string>
  options?: (string | { value: string; label?: string })[]
  label?: string
  placeholder?: string
  checksum?: number
  variant?: 'regular' | 'small'
  style?: Style
  error?: boolean
  description?: string
  disabled?: boolean
}

export function MultiSelectInput({
  value,
  onChange,
  defaultValue,
  options,
  label,
  placeholder,
  checksum,
  variant = 'regular',
  style,
  error,
  description,
  disabled,
}: MultiSelectInputProps) {
  const [open, setOpen] = React.useState(false)
  const [state, setState] = useControllableState({
    value,
    defaultValue,
    onChange,
    checksum,
  })

  return (
    <styled.div style={{ ...style }}>
      {label && (
        <div
          style={{
            marginBottom: 8,
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <styled.div
            onClick={() => {
              setOpen((p) => !p)
            }}
            style={{
              cursor: disabled ? 'not-allowed' : 'default',
              opacity: disabled ? 0.6 : 1,
              position: 'relative',
              minHeight: variant === 'small' ? 36 : 40,
              width: '100%',
              padding:
                variant === 'regular'
                  ? '8px 40px 8px 12px'
                  : '3px 28px 3px 10px',
              borderRadius:
                variant === 'regular'
                  ? borderRadius('small')
                  : borderRadius('tiny'),
              border: variant === 'small' ? '1px solid transparent' : border(),
              color: color('content', 'primary'),
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 4,
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
            {state?.size ? (
              [...state].map((e) => (
                <div
                  style={{
                    ...textVariants.body,
                    borderRadius: borderRadius('small'),
                    background: color('background', 'neutral'),
                    padding: '0 6px',
                    gap: 3,
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <div>{e}</div>
                  <styled.div
                    style={{
                      display: 'flex',
                      borderRadius: borderRadius('small'),
                      '&:hover': {
                        background: color('background', 'neutral'),
                      },
                    }}
                    onClick={() => {
                      const newSet = new Set(state)
                      newSet.delete(e)
                      setState(newSet)
                    }}
                  >
                    <IconClose />
                  </styled.div>
                </div>
              ))
            ) : (
              <Text variant="body" color="secondary" noSelect>
                {placeholder}
              </Text>
            )}
            <IconChevronDownSmall
              style={{
                position: 'absolute',
                top: '50%',
                bottom: '50%',
                transform: 'translateY(-50%)',
                right: variant === 'regular' ? 12 : 6,
                color: color('content', 'primary'),
              }}
            />
          </styled.div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={8}
            style={{
              background: color('background', 'screen'),
              maxHeight:
                'calc(var(--radix-popover-content-available-height) - 8px)',
              width: 'var(--radix-popover-trigger-width)',
              borderRadius: borderRadius('small'),
              border: border(),
              boxShadow: boxShadow('elevation'),
              padding: 8,
              overflow: 'auto',
            }}
          >
            {options.map((option) => {
              const { value, label = null } =
                typeof option === 'string' ? { value: option } : option

              return (
                <styled.div
                  style={{
                    padding: '4px 12px 4px 42px',
                    borderRadius: borderRadius('small'),
                    position: 'relative',
                    outline: 'none',
                    userSelect: 'none',
                    ...textVariants.body,
                    '&:hover': {
                      background: color('background', 'neutral'),
                    },
                  }}
                  onClick={() => {
                    const newSet = new Set(state)

                    if (state?.has(value)) {
                      newSet.delete(value)
                    } else {
                      newSet.add(value)
                    }

                    setState(newSet)
                    setOpen(false)
                  }}
                >
                  {state?.has(value) && (
                    <IconCheckSmall
                      style={{
                        position: 'absolute',
                        top: 6,
                        left: 12,
                        color: color('content', 'primary'),
                      }}
                    />
                  )}
                  <div>{label ?? value}</div>
                </styled.div>
              )
            })}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {description && (
        <Text color="secondary" variant="body-bold" style={{ marginTop: 8 }}>
          {description}
        </Text>
      )}
    </styled.div>
  )
}
