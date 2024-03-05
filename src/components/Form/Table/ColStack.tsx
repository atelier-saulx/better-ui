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
      <Stack justify="end" fitContent>
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
      </Stack>
    )
  }

  if (p.action) {
    return p.action
  }

  return null
}

export const ColStack = React.forwardRef(
  (
    {
      style,
      onRemove,
      children,
      header,
      action,
      hover,
      noRemove,
      ...p
    }: {
      hover?: boolean
      onRemove?: MouseEventHandler<'div'>
      action?: ReactNode
      noRemove?: boolean
      header?: boolean
    } & StackProps,
    ref,
  ) => {
    if (onRemove || action || header) {
      return (
        <Stack
          // @ts-ignore
          ref={ref}
          style={{
            ...style,

            ...(header && {
              height: 48,
              background: color('background', 'muted'),
              borderBottom: border(),
            }),

            '& >:last-child': {
              borderRight: '0px solid transparent !important',
            },

            '& >:nth-last-child(2)': noRemove
              ? {}
              : {
                  borderRight: '0px solid transparent !important',
                },
            '& >:nth-last-child(1)': noRemove
              ? {}
              : {
                  opacity: 0,
                  transition: 'opacity 0.1s',
                },

            '&:hover': header
              ? style?.['&:hover'] ?? {}
              : {
                  backgroundColor: `${color('background', 'muted')} !important`,
                  '& >:nth-last-child(1)': {
                    opacity: 1,
                  },
                  ...style?.['&:hover'],
                },
          }}
          // justify="start"
          {...p}
        >
          {children}
          {noRemove ? null : (
            <Action action={action} header={header} onRemove={onRemove} />
          )}
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
          '&:hover': hover
            ? {
                backgroundColor: `${color('background', 'muted')} !important`,
                ...style?.['&:hover'],
              }
            : style?.['&:hover'],
        }}
        justify="start"
        {...p}
      >
        {children}
      </Stack>
    )
  },
)
