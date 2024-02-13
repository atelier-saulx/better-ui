import { useClient, useQuery } from '@based/react'
import {
  BasedSchema,
  BasedSchemaField,
  BasedSchemaFieldObject,
  BasedSchemaType,
  convertOldToNew,
} from '@based/schema'
import * as React from 'react'
import { Form, Modal } from '../../index.js'
import { SelectReferenceModal } from './SelectReferenceModal.js'

export type BasedFormProps = {
  id: string
  includedFields?: string[]
  excludeCommonFields?: boolean
}

export function BasedForm({
  id,
  includedFields,
  excludeCommonFields = true,
}: BasedFormProps) {
  const client = useClient()
  const { open } = Modal.useModal()

  const { data: rawSchema } = useQuery('db:schema')
  const schema = React.useMemo(() => {
    if (!rawSchema) return

    return convertOldToNew(rawSchema)
  }, [rawSchema])

  const [query, setQuery] = React.useState<any>()
  const { data: item } = useQuery('db', query)
  React.useEffect(() => {
    async function constructQuery() {
      const item = await client.call('db:get', { $id: id, $all: true })
      const fields = schema.types[item.type].fields

      const query = {
        $id: id,
      }

      // TODO walk fields recursively and construct a query where every reference is fetched for the item
      // TODO figure out how to get multi references in the query

      function walkFields(fields: BasedSchemaType['fields'], query: any) {
        for (const field in fields) {
          if (fields[field].type === 'reference') {
            query[field] = { $all: true }
          }
          if (fields[field].type === 'references') {
            query[field] = { $all: true }
          }
          // if (fields[field].type === 'object') {
          //   walkFields(
          //     (fields[field] as BasedSchemaFieldObject).properties,
          //     query[field],
          //   )
          // }
        }
      }

      walkFields(fields, { $id: id })
      console.log(query)

      setQuery({
        $id: id,
        $all: true,
        // attachment: { $all: true },
        // attachments: { $all: true },
        // objectproperty: {
        //   $all: true,
        //   nestedreference: { $all: true },
        //   nestedreferences: { $all: true },
        //   deep: {
        //     $all: true,
        //     deepreference: { $all: true },
        //   },
        // },
      })
    }

    if (!schema) return
    constructQuery()
  }, [id, schema])

  const fields = React.useMemo(() => {
    if (!item) return

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
    } else if (excludeCommonFields) {
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

    return fields
  }, [item, schema, includedFields])

  if (!fields || !schema) return

  return (
    <>
      <Form
        schema={schema}
        values={item}
        fields={fields}
        onChange={async (_values, _changed, _checksum, based) => {
          await client.call('db:set', { $id: id, ...based })
        }}
        onSelectReference={async () => {
          const selectedReference = await open(({ close }) => (
            <SelectReferenceModal
              onSelect={(reference) => {
                close(reference)
              }}
            />
          ))

          return selectedReference.id
        }}
        onSelectReferences={async () => {
          const selectedReference = await open(({ close }) => (
            <SelectReferenceModal
              onSelect={(reference) => {
                close(reference)
              }}
            />
          ))

          return [selectedReference.id]
        }}
      />
    </>
  )
}
