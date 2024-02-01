import React, { useState } from 'react'
import { Text, Page, CheckboxInput, Stack } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { Header } from './Header.js'
import { Fields } from './Fields.js'
import { styled } from 'inlines'
import { useClient } from '@based/react'
import { TypeSchema } from '../constants.js'
import { useSchema } from '../hooks/useSchema.js'
import { SchemaConfirm } from '../SchemaConfirm.js'

export const SchemaMain = () => {
  const client = useClient()
  const [type] = useContextState('type', '')
  const [field] = useContextState('field', [])
  const [db] = useContextState('db', 'default')
  const { loading, schema } = useSchema(db)
  const [includeSystemFields, toggleSystemFields] = useState(false)
  const { types } = schema

  console.log('schema from MAIN 🌝, ', schema)
  const description = schema.types[type]?.description

  if (loading) {
    return null
  }

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
    console.error('[InvalidSchema] No fields on type', type)
    return null
  }

  console.log('TypeDEf --->', typeDef)
  console.log('Fields -->', fields)

  const onCancel = () => {
    console.log('le cancle ❌')
  }

  const onConfirm = async () => {
    await console.log(' el confirmo')
  }

  return (
    <Page>
      <Header description={description} />
      <Stack style={{ marginBottom: 16, paddingLeft: 32 }}>
        <CheckboxInput
          label="Show system fields"
          value={includeSystemFields}
          onChange={toggleSystemFields}
        />
        <styled.div>
          <SchemaConfirm
            onCancel={onCancel}
            onConfirm={onConfirm}
            hasChanges={true}
          />
        </styled.div>
      </Stack>
      <styled.div style={{ paddingLeft: 32 }}>
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
      </styled.div>
    </Page>
  )
}
