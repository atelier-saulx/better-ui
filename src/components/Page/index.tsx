import * as React from 'react'
import { styled, Style } from 'inlines'
import { ScrollArea } from '../ScrollArea/index.js'

export type PageProps = {
  children: React.ReactNode
  style?: Style
}

export const Page = React.forwardRef<HTMLElement, PageProps>(
  ({ children, style }, ref) => {
    return (
      <ScrollArea
        ref={ref}
        style={{
          flexGrow: 1,
          overflowX: 'hidden',
          ...style,
        }}
      >
        <styled.div
          style={{
            maxWidth: '100%',
            minWidth: '100%',
            padding: 32,
          }}
        >
          {children}
        </styled.div>
      </ScrollArea>
    )
  }
)
