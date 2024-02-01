import React from 'react'
import { Stack, Text } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { TypeOptions } from './TypeOptions/index.js'
import { styled } from 'inlines'

export const Header = ({ description }) => {
  const [type, setType] = useContextState('type')

  return (
    <styled.div style={{ marginBottom: 24 }}>
      <Stack>
        <Stack justify="start" gap={12}>
          <Text variant="title-page">{type}</Text>
          <TypeOptions />
        </Stack>
        <div>ADD FIELD BUTTON HERE</div>
      </Stack>
      {description && <Text color="secondary">{description}</Text>}
    </styled.div>
  )
}
