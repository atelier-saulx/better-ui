import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../index.js'

export const textVariants = {
  body: {
    fontWeight: 400,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
  },
  bodyBold: {
    fontWeight: 500,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
  },
  bodyStrong: {
    fontWeight: 600,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
  },
}

export type TextProps = {
  children: React.ReactNode
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
  size?:
    | 6
    | 8
    | 10
    | 12
    | 14
    | 15
    | 16
    | 18
    | 20
    | 24
    | 32
    | 36
    | 40
    | 42
    | 44
    | 48
    | 54
    | 60
    | 64
  style?: Style
  color?: 'primary' | 'secondary' | 'inverted' | 'inherit'
  variant?: keyof typeof textVariants
  singleLine?: boolean
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = 'p',
      variant = 'body',
      color = 'primary',
      style,
      size = 14,
      children,
      singleLine,
    },
    ref
  ) => {
    return React.createElement(styled[as], {
      children,
      ref,
      style: {
        margin: 0,
        padding: 0,
        color: color === 'inherit' ? 'inherit' : getColor('content', color),
        fontFamily: 'inherit',
        ...textVariants[variant],
        fontSize: `${size}px`,
        lineHeight:
          size <= 10
            ? '16px'
            : size <= 12
            ? '20px'
            : size <= 14
            ? '24px'
            : size <= 16
            ? '28px'
            : size <= 18
            ? '32px'
            : size <= 24
            ? '36px'
            : size <= 32
            ? '44px'
            : size <= 40
            ? '56px'
            : size <= 72
            ? '64px'
            : 'inherit',
        ...style,
        ...(singleLine
          ? {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }
          : {}),
      },
    })
  }
)
