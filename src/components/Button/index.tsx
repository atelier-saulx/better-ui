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
} from '../../index.js'

export type ButtonProps = {
  children?: React.ReactNode
  variant?:
    | 'primary'
    | 'primary-transparent'
    | 'primary-link'
    | 'neutral'
    | 'neutral-transparent'
    | 'neutral-link'
    | 'error'
    | 'icon-only'
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  size?: 'large' | 'medium' | 'small'
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
      size = 'medium',
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
            fontSize: 16,
            lineHeight: '28px',
          }),
          ...(size === 'medium' && {
            padding: shape === 'rectangle' ? '5px 16px' : '9px',
            fontSize: 16,
            lineHeight: '28px',
          }),
          ...(size === 'small' && {
            padding: shape === 'rectangle' ? '3px 12px' : '5px',
            fontSize: 14,
            lineHeight: '24px',
          }),
          ...(variant === 'primary' && {
            color: color('content', 'inverted'),
            background: color('interactive', 'primary'),
            border: '1px solid var(--interactive-primary)',
            '&:hover': {
              background: color('interactive', 'primary-hover'),
              border: '1px solid var(--interactive-primary-hover)',
            },
          }),
          ...(variant === 'primary-transparent' && {
            color: color('interactive', 'primary'),
            background: 'transparent',
            border: 'transparent',
            '&:hover': {
              background:
                'color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
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
            background: 'var(--semantic-background-error)',
            border: border('error'),
            '&:hover': {
              background: 'var(--semantic-background-error-hover)',
              border: '1px solid var(--semantic-background-error-hover)',
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
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
          </div>
        )}
        <div
          style={{
            opacity: loading ? 0 : 100,
            display: 'flex',
            gap: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {prefix}
          {children && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </span>
          )}
          {displayKeyboardShortcut && keyboardShortcut && (
            <KeyboardShortcut shortcut={keyboardShortcut} />
          )}
          {suffix}
        </div>
      </styled.button>
    )
  },
)
