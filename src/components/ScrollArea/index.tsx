import * as React from 'react'
import { styled, Style } from 'inlines'
import { color as getColor } from '../../index.js'

export type ScrollAreaProps = {
  children: React.ReactNode
  style?: Style
}

export const ScrollArea = React.forwardRef<HTMLElement, ScrollAreaProps>(
  ({ children, style }, ref) => {
    return React.createElement(styled['div'], {
      children,
      ref,
      style: {
        scrollbarGutter: 'stable',
        overflowY: 'overlay',
        overflowX: 'overlay',
        // firefox
        scrollbarColor: `transparent`,
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar': {
          visibility: 'hidden',
        },
        // the rest
        '&::-webkit-scrollbar:vertical': {
          width: '8px',
        },
        '&::-webkit-scrollbar:horizontal': {
          height: '8px',
        },
        '@media (hover: hover)': {
          '&:hover': {
            // the rest
            '&::-webkit-scrollbar': {
              visibility: 'visible',
            },

            '&::-webkit-scrollbar-thumb': {
              backgroundColor: getColor('content', 'secondary'),
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:vertical': {
              borderRight: `2px solid  transparent }`,
              minHeight: '32px',
            },
            '&::-webkit-scrollbar-thumb:horizontal': {
              borderBottom: `2px solid transparent`,
              minWidth: '32px',
            },
          },
        },
        ...style,
      },
    })
  }
)
