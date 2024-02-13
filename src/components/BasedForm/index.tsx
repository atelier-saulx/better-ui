import { useClient, useQuery } from '@based/react'
import {
  BasedSchemaFieldObject,
  BasedSchemaType,
  convertOldToNew,
} from '@based/schema'
import * as React from 'react'
import { Form, Modal } from '../../index.js'
import { useLanguage } from '../../hooks/useLanguage/index.js'
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
  const [language] = useLanguage()
  const { data: rawSchema } = useQuery('db:schema')
  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema)
  }, [rawSchema])

  console.log('?????????', rawSchema, schema)

  const [query, setQuery] = React.useState<any>()
  const { data: item, loading, checksum } = useQuery('db', query)

  React.useEffect(() => {
    async function constructQuery() {
      const type = schema.prefixToTypeMapping[id.substring(0, 2)]
      const fields = schema.types[type].fields

      const query = {
        $id: id,
        $language: language,
        $all: true,
      }

      function walkFields(fields: BasedSchemaType['fields'], query: any) {
        for (const field in fields) {
          if (fields[field].type === 'reference') {
            query[field] = { $all: true }
          }
          if (fields[field].type === 'references') {
            query[field] = { $all: true, $list: true }
          }
          if (fields[field].type === 'object') {
            query[field] = {
              $all: true,
            }
            walkFields(
              (fields[field] as BasedSchemaFieldObject).properties,
              query[field],
            )
          }
        }
      }

      walkFields(fields, query)
      setQuery(query)
    }

    if (!schema) return
    constructQuery()
  }, [id, schema, language])

  const fields = React.useMemo(() => {
    if (!item) return

    let fields: BasedSchemaType['fields']

    if (schema.types[item.type]) {
      fields = schema.types[item.type].fields
    }

    if (includedFields) {
      return includedFields.reduce((newFields, field) => {
        newFields[field] = fields[field]
        return newFields
      }, {})
    }

    if (excludeCommonFields) {
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
    <Form
      schema={schema}
      values={item}
      fields={fields}
      onChange={async (_values, _changed, _checksum, based) => {
        await client.call('db:set', {
          $id: id,
          $language: language,
          ...based,
        })
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
  )
}