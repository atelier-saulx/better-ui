import * as React from 'react'
import { textVariants } from '../text'
import { color } from '../../utils/vars'
import { Stack } from '../layout'
import { styled } from 'inlines'
import { useControllableState } from '../../utils/hooks/use-controllable-state'
import { SmallCheck } from '../icons'

export type CheckboxInputProps = {
  value?: boolean
  defaultValue?: boolean
  onChange?: (checked: boolean) => void
  formName?: string
  label?: string
  description?: string
  variant?: 'checkbox' | 'toggle'
}

export const CheckboxInput = React.forwardRef<
  HTMLInputElement,
  CheckboxInputProps
>(
  (
    {
      value: valueProp,
      defaultValue = false,
      onChange,
      formName,
      label,
      description,
      variant = 'checkbox',
    },
    ref
  ) => {
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange,
    })

    return (
      <Stack as="label" justify="start" align="start" gap={12}>
        <input
          ref={ref}
          name={formName}
          type="checkbox"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
          defaultChecked={defaultValue}
          checked={value}
          onChange={(e) => {
            setValue(e.target.checked)
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
              borderRadius: 'var(--radius-tiny)',
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
            }}
          >
            {value && (
              <SmallCheck style={{ color: color('content', 'inverted') }} />
            )}
          </styled.div>
        ) : (
          <styled.div
            style={{
              marginTop: 4,
              width: 36,
              height: 20,
              padding: 2,
              borderRadius: 'var(--radius-large)',
              background: value
                ? color('interactive', 'primary')
                : color('interactive', 'secondary'),
              '&:hover': {
                background: value
                  ? color('interactive', 'primary-hover')
                  : color('interactive', 'secondary-hover'),
              },
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
            <div
              style={{
                color: color('content', 'primary'),
                ...textVariants.bodyBold,
              }}
            >
              {label}
            </div>
          ) : null}
          {description !== undefined ? (
            <div
              style={{
                color: color('content', 'secondary'),
                ...textVariants.bodyBold,
              }}
            >
              {description}
            </div>
          ) : null}
        </div>
      </Stack>
    )
  }
)
