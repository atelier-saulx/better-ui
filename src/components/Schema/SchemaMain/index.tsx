import React, { useState } from 'react'
import { Text, Page, CheckboxInput } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { Header } from './Header.js'
import { Fields } from './Fields.js'
import { useClient } from '@based/react'

export const SchemaMain = ({ schema }) => {
  const client = useClient()

  const [type] = useContextState('type', '')
  const [field] = useContextState('field', [])

  const [includeSystemFields, toggleSystemFields] = useState(false)

  console.log('schema from MAIN 🌝, ', schema)
  const description = schema.types[type]?.description

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  return (
    <Page>
      <Header description={description} />
      <CheckboxInput
        label="Show system fields"
        style={{ marginBottom: 16 }}
        value={includeSystemFields}
        onChange={toggleSystemFields}
      />
      <Fields
        schema={schema}
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

          if (type === 'root') {
            console.log('duss......')
            return client
              .call('db:set-schema', {
                db,
                mutate: true,
                schema: {
                  rootType: {
                    fields: update,
                  },
                },
              })
              .catch((e) => console.error('error updating schema', e))
          } else {
            console.log('duss.afeafewaf.....')
            return client
              .call('db:set-schema', {
                db,
                mutate: true,
                schema: {
                  types: {
                    [type]: {
                      fields: update,
                    },
                  },
                },
              })
              .catch((e) => console.error('error updating schema', e))
          }
        }}
      />
    </Page>
  )
}
