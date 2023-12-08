import React, { ReactNode } from 'react'
import { textVariants } from '../../text'
import { border } from '../../../utils/vars'
import { Stack } from '../../layout'

export function Cell({
  first,
  children,
  isKey,
}: {
  first?: boolean
  children: ReactNode
  isKey?: boolean
}) {
  return (
    <Stack
      justify="start"
      align="stretch"
      style={{
        minHeight: 48,
        flexGrow: 1,
        paddingRight: 20,
        borderLeft: first ? undefined : border(),
        maxWidth: isKey ? 150 : undefined,
        paddingLeft: 20,
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
