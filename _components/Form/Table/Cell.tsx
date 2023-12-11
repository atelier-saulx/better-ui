import React, { ReactNode } from 'react'
import { textVariants } from '../../Text'
import { border as getBorder } from '../../../utils/colors'
import { Stack } from '../../Stack'
import { Style } from 'inlines'

export function Cell({
  border,
  children,
  isKey,
  objectKey,
  style,
}: {
  border?: boolean
  children: ReactNode
  isKey?: boolean
  style?: Style
  objectKey?: boolean
}) {
  return (
    <Stack
      justify="start"
      align="stretch"
      style={{
        minHeight: 48,
        flexGrow: 1,
        borderRight: border ? getBorder() : undefined,
        maxWidth: objectKey ? 150 : undefined,
        paddingLeft: isKey ? 20 : 0,
        ...style,
      }}
    >
      <Stack
        justify="start"
        style={{
          minHeight: 48,
          ...textVariants.bodyBold,
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}
