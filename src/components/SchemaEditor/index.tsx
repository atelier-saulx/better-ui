import * as React from 'react'
import { SchemaSideBar } from './SchemaSideBar.js'
import { Text, Stack } from '../../index.js'
import { SchemaFields } from './SchemaFields.js'
import { TypeOptions } from './Modals/TypeOptions.js'
import { SelectNewField } from './Modals/SelectNewField.js'
import { styled } from 'inlines'

export type SchemaEditorProps = {
  schema: { types: {} }
}

export const SchemaEditor = ({ schema }: SchemaEditorProps) => {
  const [active, setActive] = React.useState('')

  return (
    <styled.div style={{ minHeight: '100%', display: 'flex' }}>
      <SchemaSideBar
        types={schema.types}
        active={active}
        setActive={setActive}
      />
      <Stack padding display={active ? 'block' : 'flex'}>
        {active ? (
          <>
            <Stack style={{ marginBottom: 24 }}>
              <Stack gap={16} justify="start" fitContent>
                <div>
                  <Stack justify="start" gap={12}>
                    <Text variant="title-page">
                      {active
                        ? active
                        : schema.types[active]?.title
                          ? schema.types[active]?.title
                          : ''}
                    </Text>
                    <TypeOptions typeTitle={active} setActive={setActive} />
                  </Stack>
                  {schema.types[active]?.description && (
                    <Text variant="body" color="secondary">
                      {schema.types[active]?.description}
                    </Text>
                  )}
                </div>
              </Stack>
              <SelectNewField typeTitle={active} />
            </Stack>
            <SchemaFields
              fields={schema.types[active]?.fields}
              typeTitle={active}
            />
          </>
        ) : (
          <Stack gap={12} justify="center" align="center">
            <Text>
              Please select or add a type to get started with your database.
            </Text>
          </Stack>
        )}
      </Stack>
    </styled.div>
  )
}
