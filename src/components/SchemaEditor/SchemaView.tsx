import * as React from 'react'
import { Text } from '../Text/index.js'
import { Stack } from '../Stack/index.js'
import { AddField } from './Modals/AddField.js'
import { SchemaFields } from './SchemaFields.js'
import { TypeOptions } from './Modals/TypeOptions.js'

export const SchemaView = ({ schemaTypes, typeName }) => {
  return (
    <div style={{ width: '100%', padding: 32 }}>
      <Stack style={{ marginBottom: 16 }}>
        <Stack gap={16} style={{ justifyContent: 'flex-start', width: 'auto' }}>
          <Text variant="body-bold">{typeName}</Text>
          <TypeOptions />
        </Stack>
        <AddField />
      </Stack>

      <SchemaFields fields={schemaTypes[typeName]?.fields} />
    </div>
  )
}
