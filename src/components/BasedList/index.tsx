// @ts-nocheck
import { useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import * as React from 'react'
import { ScrollArea } from '../ScrollArea/index.js'
import { border } from '../../utils/colors.js'
import { generateFieldsFromQuery } from '../BasedExplorer/index.js'
import { getIdentifierField, getIdentifierFieldValue } from '../Form/utils.js'

export type BasedListProps = {
  query: () => any
  queryEndpoint?: string
}

// TODO
// have an image, a title and a description
// And for each item figure out the best attribute to put into the image, title and description

export function BasedList({ query, queryEndpoint = 'db' }: BasedListProps) {
  const { data: rawSchema, checksum } = useQuery('db:schema')
  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema) as BasedSchema
  }, [checksum])

  const fields = React.useMemo(() => {
    if (!schema) return null
    const generatedFields = generateFieldsFromQuery(query(), schema)

    const fields = {
      title: 'id',
      description: null,
      image: null,
    }

    for (const key in generatedFields) {
      if (['name', 'title'].includes(key)) {
        fields.title = key
      }

      if (['description'].includes(key)) {
        fields.description = key
      }
    }

    return fields
  }, [schema, query])
  const { data } = useQuery(queryEndpoint, query())

  console.log(data)

  if (!data || !fields) return null

  return (
    <ScrollArea>
      {data.data.map((e, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 12,
            padding: '12px 0',
            borderBottom: border(),
          }}
        >
          {fields.image && (
            <div style={{ height: 48, width: 48, border: border() }}></div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div>{e[fields.title]}</div>
            {fields.description && <div>{e[fields.title]}</div>}
          </div>
        </div>
      ))}
    </ScrollArea>
  )
}