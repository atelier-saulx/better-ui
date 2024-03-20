import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  Key,
  KeyboardShortcut,
  border,
  borderRadius,
  color,
  textVariants,
  useKeyboardShortcut,
  Stack,
  Text,
  Tooltip,
} from '../../index.js'

export type ButtonProps = {
  children?: React.ReactNode
  variant?:
    | 'primary'
    | 'primary-muted'
    | 'primary-transparent'
    | 'primary-link'
    | 'neutral'
    | 'neutral-transparent'
    | 'neutral-link'
    | 'error'
    | 'error-muted'
    | 'icon-only'
    | 'ghost'
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: 'large' | 'regular' | 'small'
  type?: 'button' | 'submit'
  shape?: 'square' | 'rectangle'
  disabled?: boolean
  onClick?: (e?: any) => any | Promise<any>
  onMouseEnter?: React.MouseEventHandler
  onMouseLeave?: React.MouseEventHandler
  onPointerDown?: React.PointerEventHandler
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler
  style?: Style
  keyboardShortcut?: Key
  displayKeyboardShortcut?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      variant = 'primary',
      size = 'regular',
      type = 'button',
      shape = 'rectangle',
      prefix,
      suffix,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onFocus,
      onBlur,
      className,
      disabled,
      style,
      keyboardShortcut,
      displayKeyboardShortcut = false,
    },
    ref,
  ) => {
    const [loading, setLoading] = React.useState(false)
    const [shaking, setShaking] = React.useState(false)

    useKeyboardShortcut(keyboardShortcut, onClick)

    const handleClick = React.useCallback(
      async (e: Event) => {
        e.stopPropagation()
        if (!onClick || disabled) return

        const loadingDelayTimeout = setTimeout(() => {
          setLoading(true)
        }, 100)

        try {
          await onClick(e)
        } catch (err) {
          console.error(err)
          setShaking(true)
        }

        setLoading(false)
        clearTimeout(loadingDelayTimeout)
      },
      [onClick, disabled],
    )

    return (
      <styled.button
        className={className}
        ref={ref}
        type={type}
        style={{
          position: 'relative',
          borderRadius: borderRadius('small'),
          fontWeight: 600,
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          justifyItems: 'center',
          alignItems: 'center',
          minHeight: size === 'small' ? 24 : 32,
          '&:active': {
            transform: 'scale(0.98)',
          },
          ...(shaking && {
            animation: '300ms shake ease-in-out',
          }),
          ...(disabled && {
            opacity: '40%',
          }),
          ...(size === 'large' && {
            padding: shape === 'rectangle' ? '9px 16px' : '13px',
          }),
          ...(size === 'regular' && {
            padding: shape === 'rectangle' ? '5px 16px' : '9px',
          }),
          ...(size === 'small' && {
            padding: shape === 'rectangle' ? '3px 12px' : '5px',
          }),
          ...(variant === 'primary-muted' && {
            color: color('interactive', 'primary'),
            background: color('interactive', 'primary-muted'),
            border: `1px solid transparent`,
            '&:hover': {
              background: color('interactive', 'primary-muted'),
              border: `1px solid ${color('interactive', 'primary-hover')}`,
            },
          }),
          ...(variant === 'primary' && {
            color: color('content', 'inverted'),
            background: color('interactive', 'primary'),
            border: `1px solid ${color('interactive', 'primary')}`,
            '&:hover': {
              background: color('interactive', 'primary-hover'),
              border: `1px solid ${color('interactive', 'primary-hover')}`,
            },
          }),
          ...(variant === 'primary-transparent' && {
            color: color('interactive', 'primary'),
            background: 'transparent',
            border: 'transparent',
            '&:hover': {
              background: `color-mix(in srgb, ${color('interactive', 'primary')} 20%, transparent)`,
              border: 'transparent',
            },
          }),
          ...(variant === 'neutral' && {
            color: color('content', 'primary'),
            background: color('background', 'screen'),
            border: border(),
            '&:hover': {
              background: color('background', 'neutral'),
              border: border('hover'),
            },
          }),
          ...(variant === 'neutral-transparent' && {
            color: color('content', 'primary'),
            background: 'transparent',
            border: 'transparent',
            '&:hover': {
              background: color('background', 'neutral'),
              border: 'transparent',
            },
          }),
          ...(variant === 'error' && {
            color: color('content', 'inverted'),
            background: color('semantic-background', 'error'),
            border: border('error'),
            '&:hover': {
              background: color('semantic-background', 'error-hover'),
              border: `1px solid ${color('semantic-background', 'error-hover')}`,
            },
          }),
          ...(variant === 'error-muted' && {
            color: color('semantic-color', 'error-muted'),
            background: color('semantic-background', 'error-muted'),
            border: 'transparent',
            '&:hover': {
              color: color('content', 'inverted'),
              background: color('semantic-background', 'error'),
            },
          }),
          ...(variant === 'primary-link' && {
            color: color('interactive', 'primary'),
            background: 'transparent',
            border: 'none',
            padding: 0,
            ...textVariants['body-strong'],
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'none',
            },
          }),
          ...(variant === 'ghost' && {
            color: color('background', 'screen'),
            background: 'transparent',
            border: 'none',
            '&:hover': {
              background: color('background', 'dimmer'),
            },
          }),
          ...(variant === 'neutral-link' && {
            color: 'inherit',
            background: 'transparent',
            border: 'none',
            padding: 0,
            ...textVariants['body-strong'],
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'none',
            },
          }),
          ...(variant === 'icon-only' && {
            color: 'inherit',
            background: 'transparent',
            border: 'none',
            padding: 0,
          }),
          ...(variant !== 'icon-only' && {
            '& svg': {
              height: size === 'small' ? 16 : 18,
              width: size === 'small' ? 16 : 18,
            },
          }),
          ...style,
        }}
        onClick={handleClick}
        onAnimationEnd={() => {
          setShaking(false)
        }}
        onPointerDown={onPointerDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      >
        {loading && (
          <Stack
            justify="center"
            fitContent
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              style={{
                animation: '750ms spin linear infinite',
              }}
              fill="none"
            >
              <path
                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Stack>
        )}
        <Stack
          gap={8}
          justify="center"
          style={{
            opacity: loading ? 0 : 1,
          }}
        >
          {prefix}
          {children && (
            <Text
              noSelect
              as="div"
              singleLine
              color="inherit"
              variant={size === 'small' ? 'body' : 'body-bold'}
              style={{
                display: 'flex',
                '& div': {
                  lineHeight:
                    shape === 'square'
                      ? '0px !important'
                      : 'inherit !important',
                },
              }}
            >
              {children}
            </Text>
          )}
          {displayKeyboardShortcut && keyboardShortcut && (
            <KeyboardShortcut shortcut={keyboardShortcut} />
          )}
          {suffix}
        </Stack>
      </styled.button>
    )
  },
)
