import { useClient, useQuery } from '@based/react'
import { BasedSchemaType, convertOldToNew } from '@based/schema'
import * as React from 'react'
import { Form } from '../../index.js'

export type BasedFormProps = {
  id: string
  includedFields?: string[]
}

export function BasedForm({ id, includedFields }: BasedFormProps) {
  const client = useClient()
  const { data: rawSchema } = useQuery('db:schema')
  const { data: item } = useQuery('db', { $id: id, $all: true })

  const fields = React.useMemo(() => {
    if (!rawSchema || !item) return

    const schema = convertOldToNew(rawSchema)
    let fields: BasedSchemaType['fields']

    if (schema.types[item.type]) {
      fields = schema.types[item.type].fields
    }

    if (includedFields) {
      for (const key in fields) {
        if (!includedFields.includes(key)) {
          delete fields[key]
        }
      }
    } else {
      for (const key in fields) {
        if (
          [
            'parents',
            'descendants',
            'aliases',
            'ancestors',
            'children',
            'type',
          ].includes(key)
        ) {
          delete fields[key]
        }
      }
    }

    console.log('fields found:', fields)

    return fields
  }, [item, rawSchema, includedFields])

  if (!fields) return

  return (
    <Form
      values={item}
      fields={fields}
      onChange={async (_values, _changed, _checksum, based) => {
        console.log('calling db:set with:', { $id: id, ...based })
        await client.call('db:set', { $id: id, ...based })
      }}
    />
  )
}
