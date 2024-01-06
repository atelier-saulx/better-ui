import React, { MouseEventHandler } from 'react'
import { Stack, StackProps } from '../../../index.js'

export const ColStack = ({
  style,
  onAction,
  ...props
}: { onAction?: MouseEventHandler<'div'> } & StackProps) => {
  return (
    <Stack
      style={{
        ...style,
        '& >:last-child': {
          borderRight: '0px solid transparent !important',
        },
      }}
      onClick={onAction}
      justify="start"
      {...props}
    />
  )
}
