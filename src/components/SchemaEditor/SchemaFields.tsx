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
  const fieldKeys = Object.keys(fields)
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
  const [showSystemFields, setShowSystemFields] = React.useState(false)

  const client = useClient()

  console.log('Fields ,', fields)
  console.log('what is typeTitle 🍿', typeTitle)

  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))

  React.useEffect(() => {
    setArray(parseFields(fields))
  }, [fields])

  const changeIndex = async (fromIndex: number, toIndex: number) => {
    // set A new Array where the index is change
    const n = [...array]
    const target = n[fromIndex]
    n.splice(fromIndex, 1)
    n.splice(toIndex, 0, target)

    // use their index in the array
    for (let i = 0; i < n.length; i++) {
      n[i].index = i
    }

    const fields = new Object()
    for (let i = 0; i < n.length; i++) {
      fields[n[i].title] = n[i]
    }

    // for that instant feeling of dropping
    setArray([...n])

    // console.log('Fields Before setting ?? ', fields)

    await client.call('db:set-schema', {
      mutate: true,
      schema: {
        types: {
          [typeTitle]: {
            fields: fields,
          },
        },
      },
    })
  }

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
