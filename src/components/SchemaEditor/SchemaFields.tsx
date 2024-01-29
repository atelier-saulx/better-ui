import * as React from 'react'
import { styled } from 'inlines'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SYSTEM_FIELDS } from './constants.js'
import { SingleFieldContainer } from './SingleFieldContainer.js'
import { useClient } from '@based/react'

type SchemaItem = {
  name: string
  type: string
  description?: string
  meta: any
  // id: string
  label: string
  index?: number
  properties: {}
  format?: string
  items?: { type: string }
}
type unindexedSchemaItem = Omit<SchemaItem, 'index'>

// for indexing items for drag drop
const parseFields = (fields) => {
  const fieldKeys = Object.keys(fields) as any
  console.log('FIELDS KEAY ', fieldKeys)

  if (!fields) return

  for (let i = 0; i < fieldKeys.length; i++) {
    fieldKeys[i] = {
      [fieldKeys[i]]: {
        ...fields[fieldKeys[i]],
        index: i,
      },
    }
  }

  return [...fieldKeys]
}

export const SchemaFields = ({ fields, typeTitle }) => {
  const client = useClient()

  const [showSystemFields, setShowSystemFields] = React.useState(false)
  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))

  React.useEffect(() => {
    setArray(parseFields(fields))
  }, [fields])

  ///  ONCONFIRM AFTER CHANGING THINGS AROUND
  // await client.call('db:set-schema', {
  //   mutate: true,
  //   schema: {
  //     types: {
  //       [typeTitle]: {
  //         fields: fields,
  //       },
  //     },
  //   },
  // })

  console.log(array)

  return (
    <styled.div style={{ marginTop: 16 }}>
      <CheckboxInput
        label="Show system fields"
        style={{ marginBottom: 24 }}
        value={showSystemFields}
        onChange={(v) => setShowSystemFields(v)}
      />
      {fields &&
        array
          .filter((item) =>
            showSystemFields
              ? item
              : !SYSTEM_FIELDS.includes(Object.keys(item)[0]),
          )
          .map((item, idx) => {
            return (
              <SingleFieldContainer
                itemName={Object.keys(item)[0]}
                item={item[Object.keys(item)[0]]}
                typeTitle={typeTitle}
                key={idx}
                index={item[Object.keys(item)[0]]?.index}
              />
            )
          })}
    </styled.div>
  )
}
