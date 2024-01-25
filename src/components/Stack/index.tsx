import * as React from 'react'
import { Style, styled } from 'inlines'

export type StackProps = React.HTMLProps<any> & {
  children?: React.ReactNode
  as?: 'div' | 'ul' | 'label'
  style?: Style
  grid?: boolean | number
  direction?: 'row' | 'column'
  justify?: 'center' | 'between' | 'end' | 'start'
  align?: 'center' | 'start' | 'end' | 'stretch'
  display?: any
  fitContent?: boolean
  gap?: 0 | 2 | 4 | 8 | 12 | 16 | 24 | 32 | 64
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
      align = grid || direction === 'column' ? 'start' : 'center',
      justify = grid ? 'start' : 'between',
      display = true,
      fitContent,
      ...props
    }: StackProps,
    ref,
  ) => {
    if (!display) {
      return null
    }

    const gridIsNumber = typeof grid === 'number'

    if (grid && gridIsNumber) {
      return React.createElement(styled[as], {
        style: {
          display: 'grid',
          gap,
          position: 'relative',
          gridAutoRows: '1fr',
          gridTemplateColumns: `repeat( auto-fit,minmax(${
            gridIsNumber ? grid : 48
          }px, 1fr))`,
          '&::before': {
            content: '""',
            width: 0,
            paddingTop: '100%',
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
          },
          '& > *:first-child': {
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
          },
          ...style,
        },
        ...props,
        children,
        ref,
      })
    } else {
      return React.createElement(styled[as], {
        style: {
          display: 'flex',
          flexDirection: direction,
          gap,
          flexWrap: grid ? 'wrap' : wrap || undefined,
          width: fitContent ? 'auto' : '100%',
          alignItems: align,
          justifyContent: justify === 'between' ? 'space-between' : justify,
          ...style,
        },
        ...props,
        children,
        ref,
      })
    }
  },
)

type StackComponent = (props: StackProps) => React.ReactNode

// tmp
export const Stack: StackComponent = ReactStack as StackComponent
