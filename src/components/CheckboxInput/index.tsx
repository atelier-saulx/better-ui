import * as React from 'react'
import {
  Text,
  color,
  borderRadius,
  Stack,
  useControllableState,
  IconSmallCheck,
} from '../../index.js'
import { Style, styled } from 'inlines'

export type CheckboxInputProps = {
  value?: boolean
  defaultValue?: boolean
  onChange?: (checked: boolean) => void
  checksum?: number
  formName?: string
  label?: string
  description?: string
  variant?: 'checkbox' | 'toggle'
  autoFocus?: boolean
  disabled?: boolean
  style?: Style
}

export const CheckboxInput = React.forwardRef<
  HTMLInputElement,
  CheckboxInputProps
>(
  (
    {
      value: valueProp,
      checksum,
      defaultValue,
      onChange,
      formName,
      label,
      description,
      variant = 'checkbox',
      autoFocus,
      disabled,
      style,
    },
    ref
  ) => {
    const [value, setValue] = useControllableState({
      value: valueProp,
      onChange,
      defaultValue,
      checksum,
    })
    const [focused, setFocused] = React.useState(false)

    return (
      <Stack
        as="label"
        justify="start"
        align="start"
        gap={12}
        style={{
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'pointer',
          ...style,
        }}
      >
        <styled.input
          ref={ref}
          name={formName}
          type="checkbox"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            background: 'none',
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
          checked={value}
          onChange={(e) => {
            if (!disabled) {
              setValue(e.target.checked)
            }
          }}
          autoFocus={autoFocus}
          onFocus={() => {
            if (!disabled) {
              setFocused(true)
            }
          }}
          onBlur={() => {
            setFocused(false)
          }}
        />
        {variant === 'checkbox' ? (
          <styled.div
            className="box"
            style={{
              height: 16,
              width: 16,
              border: `1px solid ${
                value
                  ? color('interactive', 'primary')
                  : color('interactive', 'secondary')
              }`,
              background: value
                ? color('interactive', 'primary')
                : 'transparent',
              borderRadius: borderRadius('tiny'),
              marginTop: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                background: value
                  ? color('interactive', 'primary-hover')
                  : 'transparent',
                border: `1px solid ${
                  value
                    ? color('interactive', 'primary-hover')
                    : color('interactive', 'secondary-hover')
                }`,
              },
              ...(focused && {
                boxShadow: `0px 0px 0px 1px ${color(
                  'background',
                  'screen'
                )}, 0px 0px 0px 3px ${color('interactive', 'primary')}`,
              }),
            }}
          >
            {value && (
              <IconSmallCheck style={{ color: color('content', 'inverted') }} />
            )}
          </styled.div>
        ) : (
          <styled.div
            style={{
              marginTop: 4,
              width: 36,
              height: 20,
              padding: 2,
              borderRadius: borderRadius('large'),
              background: value
                ? color('interactive', 'primary')
                : color('interactive', 'secondary'),
              '&:hover': {
                background: value
                  ? color('interactive', 'primary-hover')
                  : color('interactive', 'secondary-hover'),
              },
              ...(focused && {
                boxShadow: `0px 0px 0px 1px ${color(
                  'background',
                  'screen'
                )}, 0px 0px 0px 3px ${color('interactive', 'primary')}`,
              }),
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 9999,
                background: color('background', 'screen'),
                marginLeft: value ? '16px' : '0px',
                transition: 'margin-left 100ms linear',
              }}
            />
          </styled.div>
        )}
        <div>
          {label !== undefined ? (
            <Text variant="body-bold">{label}</Text>
          ) : null}
          {description !== undefined ? (
            <Text color="secondary" variant="body-bold">
              {description}
            </Text>
          ) : null}
        </div>
      </Stack>
    )
  }
)
