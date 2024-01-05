import * as React from 'react'
import { Text } from '../Text/index.js'
import { Stack } from '../Stack/index.js'
import { AddField } from './Modals/AddField.js'
import { SchemaFields } from './SchemaFields.js'
import { TypeOptions } from './Modals/TypeOptions.js'

export const SchemaView = ({ schemaType }) => {
  console.log('🦞', schemaType)

  // get name from route
  let schemaTypeName = Object.keys(schemaType)[0]

  return (
    <div style={{ width: '100%', padding: 32 }}>
      <Stack style={{ marginBottom: 16 }}>
        <Stack gap={16} style={{ justifyContent: 'flex-start', width: 'auto' }}>
          <Text variant="bodyBold">{schemaTypeName}</Text>
          <TypeOptions />
        </Stack>
        <AddField />
      </Stack>

      <SchemaFields fields={schemaType[schemaTypeName].fields} />
    </div>
  )
}
