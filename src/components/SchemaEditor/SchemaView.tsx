import * as React from 'react'
import { Text } from '../Text/index.js'
import { Button } from '../Button/index.js'
import { IconMoreHorizontal } from '../Icons/index.js'
import { Stack } from '../Stack/index.js'
import { AddSchemaField } from './Modals/AddSchemaField.js'
import { CheckboxInput } from '../CheckboxInput/index.js'

export const SchemaView = ({ schemaType }) => {
  return (
    <div style={{ marginTop: 32 }}>
      <Stack style={{ marginBottom: 16 }}>
        <Stack gap={16} style={{ justifyContent: 'flex-start' }}>
          <Text variant="bodyBold">SchemaType </Text>
          <Button variant="icon-only">
            <IconMoreHorizontal />
          </Button>
        </Stack>
        <AddSchemaField />
      </Stack>
      <CheckboxInput label="Show system fields" style={{ marginBottom: 24 }} />

      <div>FIELDS HERE</div>
    </div>
  )
}
