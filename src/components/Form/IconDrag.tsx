import React from 'react'
import { Button, IconDragDropHorizontal, ButtonProps } from '../../index.js'

export const IconDrag = (p: ButtonProps) => {
  return (
    <Button
      variant="icon-only"
      style={
        p.style ?? {
          opacity: 0.5,
          marginLeft: 8,
          '&:hover': {
            opacity: 1,
          },
          marginRight: 0,
          cursor: 'grab',
        }
      }
      {...p}
    >
      <IconDragDropHorizontal />
    </Button>
  )
}
