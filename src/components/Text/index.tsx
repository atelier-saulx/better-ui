import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../index.js'

export const textVariants = {
  body: {
    fontWeight: 400,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
    defaultTag: 'p',
  },
  bodyBold: {
    fontWeight: 500,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
    defaultTag: 'p',
  },
  bodyStrong: {
    fontWeight: 600,
    lineHeight: `24px`,
    letterSpacing: '-0.14px',
    defaultTag: 'p',
  },
}

const selectFromTag: Partial<
  Record<TextProps['as'], keyof typeof textVariants>
> = {}

for (const variant in textVariants) {
  if (!selectFromTag[textVariants[variant].defaultTag]) {
    selectFromTag[textVariants[variant].defaultTag] = variant
  }
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
  ({ as, variant, color = 'primary', style, children, singleLine }, ref) => {
    if (variant && !as) {
      // @ts-ignore too dificult 🧠🎉
      as = textVariants[variant].defaultTag
    } else if (as && !variant) {
      variant = selectFromTag[as]
    }
    return React.createElement(styled[as], {
      children,
      ref,
      style: {
        margin: 0,
        padding: 0,
        color: color === 'inherit' ? 'inherit' : getColor('content', color),
        fontFamily: 'inherit',
        ...textVariants[variant],
        ...(singleLine
          ? {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }
          : {}),
        ...style,
      },
    })
  }
)
