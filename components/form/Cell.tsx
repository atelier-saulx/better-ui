import React, { ReactNode } from 'react'
import { textVariants } from '../text'
import { border } from '../../utils/vars'
import { Stack } from '../layout'

export function Cell({
  index,
  isKey,
  nested,
  children,
}: {
  index: number
  nested?: boolean
  isKey?: boolean
  children: ReactNode
}) {
  return (
    <Stack
      justify="start"
      style={{
        minHeight: 48,
        flexGrow: 1,
        paddingRight: 10,
        borderLeft: index === 0 ? undefined : border(),
        maxWidth: isKey ? 150 : undefined,
        paddingLeft: isKey && nested ? 40 : 20,
        ...(isKey ? textVariants.bodyStrong : textVariants.bodyBold),
      }}
    >
      {children}
    </Stack>
  )
}
