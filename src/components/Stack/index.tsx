import * as React from 'react'
import { Style, styled } from 'inlines'

export type StackProps = React.HTMLProps<'div'> & {
  children: React.ReactNode
  as?: 'div' | 'ul' | 'label'
  style?: Style
  grid?: boolean
  direction?: 'row' | 'column'
  justify?: 'center' | 'between' | 'end' | 'start'
  align?: 'center' | 'start' | 'end' | 'stretch'
  gap?: 0 | 4 | 8 | 12 | 16 | 24 | 32
}

const ReactStack = React.forwardRef(
  (
    {
      grid,
      as = 'div',
      style,
      children,
      wrap,
      direction = 'row',
      gap = grid ? 12 : 0,
      align = grid ? 'start' : 'center',
      justify = grid ? 'start' : 'between',
      ...props
    }: StackProps,
    ref
  ) => {
    return React.createElement(styled[as], {
      style: {
        display: 'flex',
        flexDirection: direction,
        gap,
        flexWrap: wrap || grid ? 'wrap' : undefined,
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

type StackComponent = (props: StackProps) => React.ReactNode

// tmp
export const Stack: StackComponent = ReactStack as StackComponent
