import React, { ReactNode } from 'react'
import {
  textVariants,
  border as getBorder,
  Stack,
  Text,
} from '../../../index.js'
import { Style } from 'inlines'

export function Cell({
  border,
  children,
  isKey,
  style,
  width,
}: {
  border?: boolean
  children: ReactNode
  isKey?: boolean
  style?: Style
  width?: number
}) {
  return (
    <Stack
      justify="start"
      align="stretch"
      style={{
        minHeight: 48,
        flexGrow: 1,
        maxWidth: width,
        minWidth: width,
        borderRight: border ? getBorder() : undefined,
        paddingLeft: isKey ? 20 : 0,
        ...style,
      }}
    >
      <Stack
        justify="start"
        style={{
          minHeight: 48,
          ...textVariants['body-bold'],
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}
