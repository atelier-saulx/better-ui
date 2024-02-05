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
        <Stack justify="start" gap={12}>
          <Text variant="title-page">{type}</Text>
          <TypeOptions />
        </Stack>
        <SelectField
          setSchema={setSchema}
          setSomethingChanged={setSomethingChanged}
          schema={schema}
        />
      </Stack>
      {description && <Text color="secondary">{description}</Text>}
    </styled.div>
  )
}
