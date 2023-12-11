import * as React from 'react'
import { Style, styled } from 'inlines'

export type StackProps = {
  children: React.ReactNode
  as?: 'div' | 'ul' | 'label'
  style?: Style
  direction?: 'row' | 'column'
  justify?: 'center' | 'between' | 'end' | 'start'
  align?: 'center' | 'start' | 'end' | 'stretch'
  gap?: 0 | 4 | 8 | 12 | 16 | 24 | 32
}

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      as = 'div',
      style,
      children,
      direction = 'row',
      gap = 0,
      align = 'center',
      justify = 'between',
      ...props
    },
    ref
  ) => {
    return React.createElement(styled[as], {
      style: {
        display: 'flex',
        flexDirection: direction,
        gap,
        width: '100%',
        alignItems: align,
        justifyContent: justify === 'between' ? 'space-between' : justify,
        ...style,
      },
      ...props,
      children,
      ref,
    })
  }
)
