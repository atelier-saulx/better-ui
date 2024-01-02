import * as React from 'react'
import { styled, Style } from 'inlines'
import { color } from '../../index.js'

export type ScrollAreaProps = {
  children: React.ReactNode
  style?: Style
}

export const ScrollArea = React.forwardRef<HTMLElement, ScrollAreaProps>(
  ({ children, style }, ref) => {
    const scrollbarColor = 'var(--border-default)'
    const transparentAreaColor = color('background', 'screen')

    return React.createElement(styled['div'], {
      children,
      ref,
      style: {
        scrollbarGutter: 'stable',
        overflowY: 'overlay',
        overflowX: 'overlay',
        scrollbarColor: `${scrollbarColor} transparent`,
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          visibility: 'hidden',
        },
        '&::-webkit-scrollbar:vertical': {
          width: '8px',
        },
        '&::-webkit-scrollbar:horizontal': {
          height: '8px',
        },
        '@media (hover: hover)': {
          '&:hover': {
            '&::-webkit-scrollbar': {
              visibility: 'visible',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: scrollbarColor,
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:vertical': {
              borderRight: `2px solid ${transparentAreaColor} }`,
              minHeight: '32px',
            },
            '&::-webkit-scrollbar-thumb:horizontal': {
              borderBottom: `2px solid ${transparentAreaColor}`,
              minWidth: '32px',
            },
          },
        },
        ...style,
      },
    })
  }
)
