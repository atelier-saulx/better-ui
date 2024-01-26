import * as React from 'react'
import { styled, Style } from 'inlines'
import { ScrollArea } from '../ScrollArea/index.js'

export type PageProps = {
  children: React.ReactNode
  style?: Style
  padding?: number
}

export const Page = ({ children, padding = 32, style }: PageProps) => {
  return (
    <ScrollArea
      style={{
        padding,
        flexGrow: 1,
      }}
    >
      <styled.div style={style}>{children}</styled.div>
    </ScrollArea>
  )
}
