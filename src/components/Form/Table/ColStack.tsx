import React from 'react'
import { Stack, StackProps } from '~'

export const ColStack = ({ style, ...props }: StackProps) => {
  return (
    <Stack
      style={{
        ...style,
        '& >:last-child': {
          borderRight: '0px solid transparent !important',
        },
      }}
      justify="start"
      {...props}
    />
  )
}
