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
    <ScrollArea
      style={{
        padding,
        flexGrow: 1,
        ...style,
      }}
    >
      {children}
    </ScrollArea>
  )
}

export function ContentPage(p: { children?: React.ReactNode; style?: Style }) {
  return (
    <Page padding={0}>
      <Stack
        direction="column"
        padding={64}
        style={{ maxWidth: 1000, borderRight: border(), ...p.style }}
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
}) {
  return (
    <Stack
      style={{
        marginBottom: 32,
      }}
    >
      <styled.div>
        <Text
          style={{
            color: p.color
              ? getColor('semantic-background', p.color)
              : undefined,
          }}
          variant="title"
        >
          {p.title}
        </Text>
        {p.description ? (
          <Text variant="body" color="secondary">
            {p.description}
          </Text>
        ) : null}
      </styled.div>
      <styled.div>{p.suffix}</styled.div>
    </Stack>
  )
}
