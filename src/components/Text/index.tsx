import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor, Stack } from '../../index.js'

export const textVariants = {
  title: {
    defaultColor: 'primary',
    defaultTag: 'h1',
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: '-0.14px',
    lineHeight: '40px',
  },
  'sub-title': {
    defaultColor: 'primary',
    defaultTag: 'h3',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: '0px',
    lineHeight: '20px',
  },
  'title-page': {
    defaultColor: 'primary',
    defaultTag: 'h2',
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: '0px',
    lineHeight: '26px',
  },
  'title-modal': {
    defaultColor: 'primary',
    defaultTag: 'h3',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: '0px',
    lineHeight: '32px',
  },
  'body-light': {
    defaultColor: 'secondary',
    defaultTag: 'p',
    fontWeight: 400,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  body: {
    defaultColor: 'primary',
    defaultTag: 'p',
    fontWeight: 500,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  'body-bold': {
    defaultColor: 'primary',
    defaultTag: 'p',
    fontWeight: 600,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  'body-strong': {
    defaultColor: 'primary',
    defaultTag: 'p',
    fontWeight: 700,
    letterSpacing: '-0.14px',
    lineHeight: `24px`,
    fontSize: '14px',
  },
  caption: {
    defaultTag: 'span',
    defaultColor: 'secondary',
    fontWeight: 600,
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
  noSelect?: boolean
  children: React.ReactNode
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  weight?: 'normal' | 'bold' | 'strong'
  style?: Style
  color?: 'primary' | 'secondary' | 'inverted' | 'inverted-muted' | 'inherit'
  variant?: keyof typeof textVariants
  singleLine?: boolean | number
}

const selectColor = (
  variant: TextProps['variant'],
  color?: TextProps['color'],
): string => {
  if (color === 'inherit') {
    return color
  }

  if (color) {
    return getColor('content', color)
  }

  return getColor(
    'content',
    // @ts-ignore too dificult 🧠🎉
    textVariants[variant].defaultColor,
  )
}

export const Text = React.forwardRef<HTMLElement, TextProps>((p, ref) => {
  let {
    as,
    variant = 'body',
    color,
    style,
    children,
    singleLine,
    weight,
    noSelect,
  } = p

  if (variant && !as) {
    // @ts-ignore too dificult 🧠🎉
    as = textVariants[variant].defaultTag
  } else if (as && !variant) {
    variant = selectFromTag[as]
  }

  if (singleLine) {
    const { singleLine, style, ...rest } = p
    return (
      <Stack style={style}>
        <Text
          {...rest}
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            minWidth: 0,
            flexShrink: 1,
            whiteSpace: 'nowrap',
          }}
        />
        <styled.div style={{ flexShrink: 0 }} />
      </Stack>
    )
  } else {
    return React.createElement(styled[as], {
      children,
      ref,
      style: {
        userSelect: noSelect ? 'none' : 'inherit',
        margin: 0,
        padding: 0,
        color: selectColor(variant, color),
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
        ...style,
      },
    })
  }
})
