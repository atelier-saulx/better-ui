import * as React from 'react'
import { styled } from 'inlines'

export type LayoutProps = {
  header?: React.ReactNode
  children: React.ReactNode
}

export function Layout({ header, children }: LayoutProps) {
  return (
    <styled.div
      style={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {header}
      <styled.div
        style={{
          flex: '1',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {children}
      </styled.div>
    </styled.div>
  )
}
