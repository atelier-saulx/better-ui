import * as React from 'react'
import { styled } from 'inlines'
import { CheckboxInput } from '../CheckboxInput/index.js'
import { SYSTEM_FIELDS } from './constants.js'
import { SingleFieldContainer } from './SingleFieldContainer.js'

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

const parseFields = (fields) => {
  if (!fields) return
  const indexedArray = [] as SchemaItem[]
  const array = [] as unindexedSchemaItem[]
  const type = fields

  //get all existing indexes
  const allCurrentIndexes = [] as number[]
  for (const i in type) {
    if (type[i].index) {
      allCurrentIndexes.push(type[i].index as number)
    } else {
      // else start at 0
      allCurrentIndexes.push(0)
    }
  }

  for (const i in type) {
    let newName = i || type[i].meta.name
    if (type[i].index) {
      indexedArray.push({ ...type[i], name: newName })
    } else {
      // give an index
      let newIndex = Math.max(...allCurrentIndexes) + 1
      indexedArray.push({ ...type[i], name: newName, index: newIndex })
      allCurrentIndexes.push(newIndex)
    }
  }

  indexedArray.sort((a, b) => a.index - b.index)

  console.log(indexedArray, '🥱 ????')

  return [...indexedArray, ...array]
}

export const SchemaFields = ({ fields, typeName }) => {
  const [showSystemFields, setShowSystemFields] = React.useState(false)

  // TODO set these indexes in the Schema @yves
  // Also the drag and drop changes

  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))

  React.useEffect(() => {
    setArray(parseFields(fields))
  }, [fields])

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
              changeIndex={() => {}}
            />
          ))}
    </styled.div>
  )
}
