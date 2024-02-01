import React from 'react'
import { Stack, Text, Button } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { TypeOptions } from './TypeOptions/index.js'

export const Header = () => {
  const [type] = useContextState('type')

  return (
    <Stack style={{ marginBottom: 32 }}>
      <Stack justify="start" gap={12}>
        <Text variant="title-page">{type}</Text>
        <TypeOptions />
      </Stack>
      <Button>Flap</Button>
    </Stack>
  )
}
