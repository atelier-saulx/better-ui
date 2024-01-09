import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../index.js'

export const textVariants = {
  title: {
    defaultColor: 'primary',
    defaultTag: 'h1',
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: '0.4px',
    lineHeight: '56px',
  },
  'title-page': {
    defaultColor: 'primary',
    defaultTag: 'h2',
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: '-0.24px',
    lineHeight: '36px',
  },
  'title-modal': {
    defaultColor: 'primary',
    defaultTag: 'h3',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: '-0.18px',
    lineHeight: '32px',
  },
  body: {
    defaultColor: 'secondary',
    defaultTag: 'p',
    fontWeight: 500,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  'body-bold': {
    defaultColor: 'secondary',
    defaultTag: 'p',
    fontWeight: 600,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  'body-strong': {
    defaultColor: 'secondary',
    defaultTag: 'p',
    fontWeight: 700,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  caption: {
    defaultTag: 'span',
    defaultColor: 'secondary',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '20px',
    letterSpacing: '-0.12px',
    textTransform: 'uppercase',
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
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  weight?: 'normal' | 'bold' | 'strong'
  style?: Style
  color?: 'primary' | 'secondary' | 'inverted' | 'inverted-muted'
  variant?: keyof typeof textVariants
  singleLine?: boolean
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    { as, variant = 'body', color, style, children, singleLine, weight },
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
        color: color
          ? getColor('content', color)
          : getColor(
              'content',
              textVariants[variant].defaultColor as TextProps['color']
            ),
        fontFamily: 'inherit',
        ...textVariants[variant],
        fontWeight:
          weight === 'normal'
            ? 400
            : weight === 'bold'
            ? 500
            : weight === 'strong'
            ? 600
            : textVariants[variant].fontWeight,
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
