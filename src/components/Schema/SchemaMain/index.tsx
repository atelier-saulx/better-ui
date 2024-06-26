import React, { useState } from 'react'
import { Text, Page, CheckboxInput, Stack } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { Header } from './Header.js'
import { Fields } from './Fields.js'
import { styled } from 'inlines'
import { TypeSchema } from '../constants.js'
import { SchemaConfirm } from '../SchemaConfirm.js'

export const SchemaMain = ({
  schema,
  setSchema,
  setSomethingChanged,
  somethingChanged,
  onCancel,
  onConfirm,
}) => {
  const [type] = useContextState('type', '')
  const [field] = useContextState('field', [])

  const [includeSystemFields, toggleSystemFields] = useState(false)
  const { types } = schema

  const description = schema?.types[type]?.description

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  const typeDef: TypeSchema =
    type === 'root' ? schema.rootType : types[type] || { fields: {} }
  const { fields } = typeDef

  if (!fields) {
    return null
  }

  return (
    <Page>
      <Header
        description={description || ''}
        setSchema={setSchema}
        schema={schema}
        setSomethingChanged={setSomethingChanged}
      />
      <Stack style={{ marginBottom: 16, paddingLeft: 32 }}>
        <CheckboxInput
          label="Show system fields"
          value={includeSystemFields}
          onChange={toggleSystemFields}
        />
        <styled.div>
          {somethingChanged && (
            <SchemaConfirm
              onCancel={onCancel}
              onConfirm={onConfirm}
              hasChanges={somethingChanged}
            />
          )}
        </styled.div>
      </Stack>
      <styled.div style={{ paddingLeft: 32 }}>
        <Fields
          schema={schema}
          setSchema={setSchema}
          setSomethingChanged={setSomethingChanged}
          includeSystemFields={includeSystemFields}
          onChange={(val) => {
            const update = {}
            let from = fields
            let dest = update
            let i = 0
            const l = field.length
            while (i < l) {
              const key = field[i++]
              dest[key] = { ...from[key] }
              dest = dest[key]
              // @ts-ignore
              from = from[key]
            }
            Object.assign(dest, val)

            schema.types[type].fields = update
            setSomethingChanged(true)
          }}
        />
      </styled.div>
    </Page>
  )
}
