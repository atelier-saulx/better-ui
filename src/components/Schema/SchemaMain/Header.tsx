import React from 'react'
import { Stack, Text } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { TypeOptions } from './TypeOptions/index.js'
import { styled } from 'inlines'
import { SelectField } from '../SelectField/index.js'

export const Header = ({
  description,
  setSchema,
  schema,
  setSomethingChanged,
}) => {
  const [type] = useContextState('type')

  return (
    <styled.div style={{ marginBottom: 24 }}>
      <Stack>
        <Stack justify="start" gap={12} style={{ marginLeft: 32 }}>
          <Text variant="title-page">{type}</Text>
          <TypeOptions />
        </Stack>
        <styled.div style={{ marginRight: -10 }}>
          <SelectField
            setSchema={setSchema}
            setSomethingChanged={setSomethingChanged}
            schema={schema}
          />
        </styled.div>
      </Stack>
      {description && <Text color="secondary">{description}</Text>}
    </styled.div>
  )
}
