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
  const indexedArray = [] as SchemaItem[]
  // const type = fields
  // //get all existing indexes
  // const allCurrentIndexes = [] as number[]

  // for (const i in type) {
  //   if (type[i].index) {
  //     allCurrentIndexes.push(type[i].index as number)
  //   } else {
  //     // else start at 0
  //     allCurrentIndexes.push(0)
  //   }
  // }

  for (let i = 0; i < fieldKeys.length; i++) {
    // let newIndex = Math.max(...allCurrentIndexes) + 1

    fieldKeys[i] = {
      [fieldKeys[i]]: {
        ...fields[fieldKeys[i]],
        index: i,
      },
    }
  }

  // for (const i in type) {
  //   // let newName = i || type[i].title

  //   console.log(type[i])

  //   if (typeof type[i].index === 'number') {
  //     indexedArray.push({
  //       [fieldKeys[i]]: {
  //         ...type[i],
  //         // title: newName,
  //         index: +type[i].index,
  //       },
  //     })
  //   } else {
  //     // give an index
  //     let newIndex = Math.max(...allCurrentIndexes) + 1
  //     indexedArray.push({
  //       [fieldKeys[i]]: {
  //         ...type[i],
  //         // title: newName,
  //         index: +newIndex,
  //       },
  //     })
  //     allCurrentIndexes.push(newIndex)
  //   }
  // }

  console.log('FIELDS KEAY ', fieldKeys)
  console.log(
    'field keys map',
    fieldKeys.map((item) => console.log(item[Object.keys(item)[0]])),
  )

  return [...fieldKeys]

  indexedArray.sort((a, b) => a.index - b.index)

  console.log('❤️‍🔥 index array ', indexedArray)

  return [...indexedArray]
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
        array.map((item, idx) => {
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
      {/* {fields &&
        array
          ?.filter((item) =>
            showSystemFields ? item : !SYSTEM_FIELDS.includes(item.title),
          )
          .map((item, idx) => {
            console.log('-->', item)

            return (
              <SingleFieldContainer
                item={item}
                typeTitle={typeTitle}
                key={idx}
                index={item?.index}
                changeIndex={changeIndex}
              />
            )
          })} */}
    </styled.div>
  )
}
