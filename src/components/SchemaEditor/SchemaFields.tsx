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
}
type unindexedSchemaItem = Omit<SchemaItem, 'index'>

const parseFields = (fields) => {
  if (!fields) return
  const indexedArray = [] as SchemaItem[]
  const array = [] as unindexedSchemaItem[]
  const type = fields

  // console.log('indexed array ---->', indexedArray)
  // console.log('unindex', array)

  for (const i in type) {
    //  console.log('🔫 meta', type[i]?.meta, 'index', type[i]?.index, type[i])
    if (type[i].hasOwnProperty('meta')) {
      // console.log('REACh 🔥')
      indexedArray.push({
        name: i,
        meta: type[i].meta,
        // id: i,
        type: type[i].type,
        label: i,
        index: type[i]?.index,
        // index: type[i].meta.index,
        properties: type[i].properties,
      })
    } else if (!type[i].index) {
      console.log('REACh 🐧')
      array.push({
        name: i,
        meta: type[i].meta,
        // id: i,
        type: type[i].type,
        label: i,
        // index: type[i]?.index,
        properties: type[i].properties,
      })
    }
  }

  indexedArray.sort((a, b) => a.meta.index - b.meta.index)

  return [...indexedArray, ...array]
}

export const SchemaFields = ({ fields, typeName }) => {
  const [showSystemFields, setShowSystemFields] = React.useState(false)

  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))

  React.useEffect(() => {
    setArray(parseFields(fields))
  }, [
    fields,
    // routeType
  ])

  // console.log('Fields --> ', fields)

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
          // sort alphabetically for now @yves todo
          .sort((a, b) => a?.name.localeCompare(b?.name))
          .map((item, idx) => (
            <SingleFieldContainer item={item} typeName={typeName} key={idx} />
          ))}
    </styled.div>
  )
}
