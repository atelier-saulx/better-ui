import React, { MouseEventHandler, ReactNode } from 'react'
import {
  IconClose,
  Stack,
  StackProps,
  Button,
  color,
  border,
} from '../../../index.js'

const Action = (p: {
  action?: ReactNode
  onRemove?: MouseEventHandler<'div'>
  header?: boolean
}) => {
  if (p.onRemove || (p.header && !p.action)) {
    return (
      <Button
        onClick={
          p.header
            ? undefined
            : (e) => {
                p.onRemove(e)
              }
        }
        variant="icon-only"
      >
        <IconClose style={{ marginRight: 8, marginLeft: 8 }} />
      </Button>
    )
  }

  if (p.action) {
    return p.action
  }

  return null
}

export const ColStack = ({
  style,
  onRemove,
  children,
  header,
  action,
  ...p
}: {
  onRemove?: MouseEventHandler<'div'>
  action?: ReactNode
  header?: boolean
} & StackProps) => {
  if (onRemove || action || header) {
    return (
      <Stack
        style={{
          ...style,

          ...(header && {
            background: color('background', 'muted'),
            borderBottom: border(),
          }),

          '& >:last-child': {
            borderRight: '0px solid transparent !important',
          },

          '& >:nth-last-child(2)': {
            borderRight: '0px solid transparent !important',
          },
          '& >:nth-last-child(1)': {
            opacity: 0,
            transition: 'opacity 0.1s',
          },

          '&:hover': header
            ? {}
            : {
                backgroundColor: `${color('background', 'muted')} !important`,
                '& >:nth-last-child(1)': {
                  opacity: 1,
                },
              },
        }}
        justify="start"
        {...p}
      >
        {children}
        <Action action={action} header={header} onRemove={onRemove} />
      </Stack>
    )
  }
  return (
    <Stack
      style={{
        ...style,
        '& >:last-child': {
          borderRight: '0px solid transparent !important',
        },
      }}
      justify="start"
      {...p}
    >
      {children}
    </Stack>
  )
}
