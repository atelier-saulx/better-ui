import * as React from 'react'
import { Style, styled } from 'inlines'

export type StackProps = React.HTMLProps<'div'> & {
  children: React.ReactNode
  as?: 'div' | 'ul' | 'label'
  style?: Style
  grid?: boolean | number
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
    if (grid) {
      const gridIsNumber = typeof grid === 'number'
      return React.createElement(styled[as], {
        style: {
          display: 'grid',
          gap,
          position: 'relative',
          gridTemplateColumns: `repeat( auto-fit,minmax(48px, 1fr)  )`,
          '&::before': {
            border: '1px solid red',
            content: '""',
            width: 0,
            paddingTop: '100%',
            gridRow: '1 / 1',
            gridColumn: '1 / 1',
          },
          // '& > * > *': {
          //   border: '1px solid blue',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   bottom: 0,
          //   right: 0,
          // },

          // gridTemplateColumns: `100px 50px 100px`,
          // gridTemplateRows: `80px auto 80px`,
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
          flexWrap: wrap || undefined,
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
  }
)

type StackComponent = (props: StackProps) => React.ReactNode

// tmp
export const Stack: StackComponent = ReactStack as StackComponent
