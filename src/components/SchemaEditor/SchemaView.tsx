import * as React from 'react'
import { Text } from '../Text/index.js'
import { Button } from '../Button/index.js'
import {
  IconEdit,
  IconMoreHorizontal,
  IconCopy,
  IconFunction,
  IconDelete,
} from '../Icons/index.js'
import { Stack } from '../Stack/index.js'
import { AddSchemaField } from './Modals/AddSchemaField.js'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SchemaFields } from './SchemaFields.js'
import { Dropdown } from '../Dropdown/index.js'

export const SchemaView = ({ schemaType }) => {
  console.log('🦞', schemaType)

  return (
    <div style={{ marginTop: 32 }}>
      <Stack style={{ marginBottom: 16 }}>
        <Stack gap={16} style={{ justifyContent: 'flex-start' }}>
          <Text variant="bodyBold">{Object.keys(schemaType)[0]} </Text>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconEdit />}>Edit name</Dropdown.Item>
              <Dropdown.Item icon={<IconCopy />}>Clone type</Dropdown.Item>
              <Dropdown.Item icon={<IconFunction />}>
                Advanced edit
              </Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete type</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        </Stack>
        <AddSchemaField />
      </Stack>
      <CheckboxInput label="Show system fields" style={{ marginBottom: 24 }} />

      <SchemaFields fields={schemaType[Object.keys(schemaType)[0]].fields} />
    </div>
  )
}
