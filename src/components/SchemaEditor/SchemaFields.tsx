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
  if (!fields) return
  const indexedArray = [] as SchemaItem[]
  const type = fields
  //get all existing indexes
  const allCurrentIndexes = [] as number[]

  for (const i in type) {
    if (typeof type[i].index === 'number') {
      allCurrentIndexes.push(type[i].index as number)
    } else {
      // else start at 0
      allCurrentIndexes.push(0)
    }
  }

  for (const i in type) {
    let newName = i || type[i].meta.name

    if (typeof type[i].index === 'number') {
      indexedArray.push({ ...type[i], name: newName, index: +type[i].index })
    } else {
      // give an index
      let newIndex = Math.max(...allCurrentIndexes) + 1
      indexedArray.push({ ...type[i], name: newName, index: +newIndex })
      allCurrentIndexes.push(newIndex)
    }
  }

  indexedArray.sort((a, b) => a.index - b.index)
  return [...indexedArray]
}

export const SchemaFields = ({ fields, typeName }) => {
  const [showSystemFields, setShowSystemFields] = React.useState(false)

  const client = useClient()

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
      fields[n[i].name] = n[i]
    }

    await client.call('db:set-schema', {
      mutate: true,
      schema: {
        types: {
          [typeName]: {
            fields: fields,
          },
        },
      },
    })
  }

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
          ?.filter((item) =>
            showSystemFields
              ? item
              : !SYSTEM_FIELDS.includes(item.name || item.label)
          )
          .map((item, idx) => (
            <SingleFieldContainer
              item={item}
              typeName={typeName}
              key={idx}
              index={item?.index}
              changeIndex={changeIndex}
            />
          ))}
    </styled.div>
  )
}
