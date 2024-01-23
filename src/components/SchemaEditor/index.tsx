import * as React from 'react'
import { SchemaSideBar } from './SchemaSideBar.js'
import { Text, Stack } from '../../index.js'
import { SchemaFields } from './SchemaFields.js'
import { TypeOptions } from './Modals/TypeOptions.js'
import { SelectNewField } from './Modals/SelectNewField.js'

import { AddType } from './Modals/AddType.js'

export type SchemaEditorProps = {
  schema: { types: {} }
}

export const SchemaEditor = ({ schema }: SchemaEditorProps) => {
  const [active, setActive] = React.useState('')

  return (
    <div style={{ minHeight: '100%', display: 'flex' }}>
      <SchemaSideBar
        types={schema.types}
        active={active}
        setActive={setActive}
      />
      <div
        style={{
          width: '100%',
          padding: 32,
          display: active ? 'block' : 'flex',
        }}
      >
        {active ? (
          <>
            <Stack style={{ marginBottom: 24 }}>
              <Stack
                gap={16}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Stack style={{ justifyContent: 'flex-start' }} gap={12}>
                    <Text variant="title-page">
                      {schema.types[active]?.meta?.displayName
                        ? schema.types[active]?.meta?.displayName
                        : active}
                    </Text>
                    <TypeOptions typeName={active} setActive={setActive} />
                  </Stack>
                  {schema.types[active]?.meta?.description && (
                    <Text variant="body" color="secondary">
                      {schema.types[active]?.meta?.description}
                    </Text>
                  )}
                </div>
              </Stack>
              <SelectNewField typeName={active} />
            </Stack>
            <SchemaFields
              fields={schema.types[active]?.fields}
              typeName={active}
            />
          </>
        ) : (
          <Stack
            gap={12}
            grid
            style={{
              flexDirection: 'column' as 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
            }}
          >
            <AddType setActive={setActive} />
            <Text>
              Please select or add a type to get started with your database.
            </Text>
          </Stack>
        )}
      </div>
    </div>
  )
}
