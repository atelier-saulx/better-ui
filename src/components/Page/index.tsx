import * as React from 'react'
import { styled, Style } from 'inlines'
import { ScrollArea } from '../ScrollArea/index.js'

export type PageProps = {
  children: React.ReactNode
  style?: Style
}

export const Page = React.forwardRef(({ children, style }: PageProps, ref) => {
  return (
    <ScrollArea style={{ padding: 32, ...style }}>
      <styled.div ref={ref}>{children}</styled.div>
    </ScrollArea>
  )
})
