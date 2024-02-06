import React from 'react'
import {
  Stack,
  color,
  border,
  borderRadius,
  Text,
  IconClose,
  Button,
} from '../../index.js'

export const Tag = ({
  value,
  onRemove,
}: {
  value: string | number
  onRemove: () => void
}) => {
  return (
    <Stack
      gap={12}
      justify="start"
      style={{
        width: 'auto',
        padding: 2,
        color: color('content', 'secondary'),
        paddingLeft: 8,
        paddingRight: 8,
        border: border(),
        backgroundColor: color('background', 'muted'),
        borderRadius: borderRadius('tiny'),
      }}
    >
      <Text>{value}</Text>
      <Button
        onClick={() => {
          onRemove()
        }}
        variant="icon-only"
      >
        <IconClose />
      </Button>
    </Stack>
  )
}
