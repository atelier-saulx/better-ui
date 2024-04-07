import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  ScrollArea,
  Stack,
  border,
  Text,
  SemanticColors,
  color as getColor,
} from '../../index.js'

export type PageProps = {
  children: React.ReactNode
  style?: Style
  padding?: number
}

export const Page = ({ children, padding = 32, style }: PageProps) => {
  return (
    <div
      style={{
        padding,
        flexGrow: 1,
        overflow: 'auto',
        height: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function ContentPage(p: { children?: React.ReactNode; style?: Style }) {
  return (
    <Page padding={0}>
      <Stack
        direction="column"
        padding={64}
        style={{ maxWidth: 1200, borderRight: border(), ...p.style }}
      >
        {p.children}
      </Stack>
    </Page>
  )
}

export function PageHeader(p: {
  title?: React.ReactNode
  description?: React.ReactNode
  suffix?: React.ReactNode
  color?: SemanticColors
  padding?: 32 | 64 | 24
  style?: Style
}) {
  return (
    <Stack
      align="start"
      style={{
        marginTop: 4,
        padding: p.padding,
        marginBottom: -4,
        ...p.style,
      }}
      gap={16}
    >
      <styled.div style={{ flexShrink: 1, minWidth: 0 }}>
        {p.title ? (
          <Text
            singleLine
            style={{
              maxWidth: 1000,
              color: p.color
                ? getColor('semantic-background', p.color)
                : undefined,
            }}
            variant="title-page"
          >
            {p.title}
          </Text>
        ) : null}
        {p.description ? (
          <Text singleLine variant="body-light">
            {p.description}
          </Text>
        ) : null}
      </styled.div>
      <styled.div>{p.suffix}</styled.div>
    </Stack>
  )
}
