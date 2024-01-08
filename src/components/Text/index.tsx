import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../index.js'

export const textVariants = {
  h1: {
    defaultTag: 'h1',
    fontWeight: 700,
    fontSize: '48px',
    letterSpacing: '-1%',
    lineHeight: '64px',
  },
  h2: {
    defaultTag: 'h2',
    fontWeight: 700,
    fontSize: '40px',
    letterSpacing: '-1%',
    lineHeight: '54px',
  },
  h3: {
    defaultTag: 'h3',
    fontWeight: 700,
    fontSize: '32px',
    letterSpacing: '-1%',
    lineHeight: '44px',
  },
  h4: {
    defaultTag: 'h4',
    fontWeight: 700,
    fontSize: '24px',
    letterSpacing: '-1%',
    lineHeight: '36px',
  },
  h5: {
    defaultTag: 'h5',
    fontWeight: 700,
    fontSize: '18px',
    letterSpacing: '-1%',
    lineHeight: '32px',
  },
  body: {
    defaultTag: 'p',
    fontWeight: 400,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
  },
  'body-bold': {
    defaultTag: 'p',
    fontWeight: 500,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
  },
  'body-strong': {
    defaultTag: 'p',
    fontWeight: 600,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
  },
  'body-small': {
    defaultTag: 'p',
    fontWeight: 400,
    fontSize: '12px',
    letterSpacing: '-0.14px',
    lineHeight: `20px`,
  },
  'body-small-bold': {
    defaultTag: 'p',
    fontWeight: 500,
    letterSpacing: '-0.14px',
    fontSize: '12px',
    lineHeight: `20px`,
  },
  'body-small-strong': {
    defaultTag: 'p',
    fontWeight: 600,
    letterSpacing: '-0.14px',
    fontSize: '12px',
    lineHeight: `20px`,
  },
  'body-large': {
    defaultTag: 'p',
    fontWeight: 400,
    fontSize: '16px',
    letterSpacing: '-0.14px',
    lineHeight: `28px`,
  },
  'body-large-bold': {
    defaultTag: 'p',
    fontWeight: 500,
    letterSpacing: '-0.14px',
    fontSize: '16px',
    lineHeight: `28px`,
  },
  'body-large-strong': {
    defaultTag: 'p',
    fontWeight: 600,
    letterSpacing: '-0.14px',
    fontSize: '16px',
    lineHeight: `28px`,
  },
  caption: {
    defaultTag: 'span',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '16px',
    letterSpacing: '-1%',
  },
  'caption-bold': {
    defaultTag: 'span',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '16px',
    letterSpacing: '-1%',
  },
  'caption-strong': {
    defaultTag: 'span',
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '16px',
    letterSpacing: '-1%',
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
  weight?: 'normal' | 'medium' | 'strong'
  style?: Style
  color?: 'primary' | 'secondary' | 'inverted' | 'inherit'
  variant?: keyof typeof textVariants
  singleLine?: boolean
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { as, variant, color = 'primary', style, children, singleLine, weight },
    ref
  ) => {
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
        fontWeight:
          weight === 'normal'
            ? 400
            : weight === 'medium'
            ? 500
            : weight === 'strong'
            ? 600
            : 'inherit',
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
