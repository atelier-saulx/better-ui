import {
  BasedSchema,
  BasedSchemaFieldObject,
  BasedSchemaType,
} from '@based/schema'
import React from 'react'
import { hashObjectIgnoreKeyOrder } from '@saulx/hash'
import { BasedFormProps, BasedFormRef } from './types.js'
import { FormProps } from '../../index.js'

const createQuery = (
  id: string,
  schema: BasedSchema,
  language: string,
): any => {
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

      // add records & arrays

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
  return query
}

const createFields = (
  id: string,
  schema: BasedSchema,
  includedFields: BasedFormProps['includedFields'],
  excludeCommonFields: BasedFormProps['excludeCommonFields'],
): FormProps['fields'] => {
  let fields: FormProps['fields']
  const type = schema.prefixToTypeMapping[id.substring(0, 2)]

  if (schema.types[type]) {
    fields = schema.types[type].fields
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
}

export const useBasedFormProps = (
  ref: { current: BasedFormRef },
  id: string,
  language: string,
  schemaChecksum: number,
  includedFields: BasedFormProps['includedFields'],
  excludeCommonFields: BasedFormProps['excludeCommonFields'],
) => {
  const [, update] = React.useState(0)

  React.useEffect(() => {
    const schema = ref.current.schema

    if (!schema) {
      return
    }

    let fields = createFields(id, schema, includedFields, excludeCommonFields)

    if (ref.current.fieldsFn) {
      fields = ref.current.fieldsFn(fields, schema)
    }

    let query = createQuery(id, schema, language)

    if (ref.current.queryFn) {
      query = ref.current.queryFn({ id, query, language, fields, schema })
    }

    ref.current.fields = fields
    ref.current.currentQuery = query

    update(hashObjectIgnoreKeyOrder([query, fields]))
  }, [id, schemaChecksum, language])
}
