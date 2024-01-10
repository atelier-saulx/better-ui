import * as React from 'react'
import { SchemaSideBar } from './SchemaSideBar.js'
import { Text, Stack } from '../../index.js'
import { SchemaFields } from './SchemaFields.js'
import { TypeOptions } from './Modals/TypeOptions.js'
import { AddField } from './Modals/AddField.js'

export type SchemaEditorProps = {
  schema: { types: {} }
}

export const SchemaEditor = ({ schema }: SchemaEditorProps) => {
  const [active, setActive] = React.useState('')

  return (
    <div style={{ minHeight: 676, display: 'flex' }}>
      <SchemaSideBar
        types={schema.types}
        active={active}
        setActive={setActive}
      />
      <div style={{ width: '100%', padding: 32 }}>
        <Stack style={{ marginBottom: 16 }}>
          <Stack
            gap={16}
            style={{
              justifyContent: 'flex-start',
              width: 'auto',
              alignItems: 'center',
            }}
          >
            <Text variant="title-page">{active}</Text>
            <TypeOptions typeName={active} />
          </Stack>
          <AddField typeName={active} />
        </Stack>

        <SchemaFields fields={schema.types[active]?.fields} typeName={active} />
      </div>
    </div>
  )
}
