import React, { ReactNode } from 'react'
import {
  textVariants,
  border as getBorder,
  Stack,
  StackProps,
  color,
} from '../../../index.js'
import { Style } from 'inlines'

export function Cell({
  border,
  children,
  isKey,
  style,
  header = false,
  sticky = false,
  width,
  flexible,
  justify = 'start',
}: {
  border?: boolean
  children: ReactNode
  isKey?: boolean
  style?: Style
  header?: boolean
  sticky?: boolean
  flexible?: boolean
  width?: number
  justify?: StackProps['justify']
}) {
  return (
    <Stack
      justify={justify}
      align="stretch"
      style={{
        minHeight: 48,
        position: sticky ? 'sticky' : null,
        left: 0,
        zIndex: sticky ? 1 : 0,
        flexGrow: 1,
        maxWidth: flexible ? '100%' : width,
        minWidth: width,
        borderRight: border ? getBorder() : undefined,
        paddingLeft: isKey ? 20 : 0,
        background: sticky
          ? header
            ? 'rgb(251,252,253)'
            : 'rgb(255,255,255)'
          : null,
        ...style,
      }}
    >
      <Stack
        fitContent={justify === 'end'}
        justify={justify}
        style={{
          paddingRight: justify === 'end' ? 15 : 0,
          minHeight: 48,
          ...textVariants['body-bold'],
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}
