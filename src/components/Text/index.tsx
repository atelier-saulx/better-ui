import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../index.js'

export const textVariants = {
  body: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
  },
  bodyBold: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
  },
  bodyStrong: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
  },
}

export type TextProps = {
  children: React.ReactNode
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'
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
