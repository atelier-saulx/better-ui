import React, { ReactNode } from 'react'
import { textVariants } from '../../text'
import { border } from '../../../utils/vars'
import { Stack } from '../../layout'

export function Cell({
  isKey,
  first,
  children,
}: {
  first?: boolean
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
        borderLeft: first ? undefined : border(),
        maxWidth: isKey ? 150 : undefined,
        paddingLeft: 20,
        ...(isKey ? textVariants.bodyStrong : textVariants.bodyBold),
      }}
    >
      {children}
    </Stack>
  )
}
