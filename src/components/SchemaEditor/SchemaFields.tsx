import * as React from 'react'
import { styled } from 'inlines'
import { Container } from '../Container/index.js'
import { Thumbnail } from '../Thumbnail/index.js'
import { Badge } from '../Badge/index.js'
import { FieldOptions } from './Modals/FieldOptions.js'
import { CheckboxInput } from '../CheckboxInput/index.js'

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

export const SchemaFields = ({ fields }) => {
  // console.log('hellow??', fields)

  const [array, setArray] = React.useState<
    SchemaItem[] | unindexedSchemaItem[] | any
  >(parseFields(fields))

  React.useEffect(() => {
    setArray(parseFields(fields))
  }, [
    fields,
    //routeType
  ])

  return (
    <styled.div style={{ marginTop: 16 }}>
      <CheckboxInput label="Show system fields" style={{ marginBottom: 24 }} />
      {fields &&
        array?.map((item, idx) => (
          <Container
            style={{
              marginBottom: 8,
              '& > div:first-child': {
                padding: '8px !important',
              },
            }}
            key={idx}
            title={
              <React.Fragment>
                {item.label}{' '}
                <Badge color="neutral-muted" style={{ marginLeft: 16 }}>
                  {item.type}
                </Badge>{' '}
              </React.Fragment>
            }
            prefix={
              <Thumbnail
                text={item.type}
                color="informative-muted"
                style={{ marginRight: 16 }}
              />
            }
            suffix={<FieldOptions item={item} />}
          />
        ))}
    </styled.div>
  )
}
