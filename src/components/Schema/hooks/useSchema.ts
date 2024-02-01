import { useQuery } from '@based/react'
import { FieldSchema, BasedSchema, TypeSchema } from '../constants.js'
import { sortFields } from '../fieldParsers.js'

// const addMeta = (obj: FieldSchema | TypeSchema, key: string) => {
//   if (!('index' in obj)) {
//     // @ts-ignore
//     obj.index = null
//   }

//   //   if (!('meta' in obj)) {
//   //     obj.meta = {}
//   //   }
//   //   if (!('name' in obj.meta)) {
//   //     obj.meta.name = key[0].toUpperCase() + key.slice(1)
//   //   }
// }

const walkField = (obj: FieldSchema, key: string) => {
  //   addMeta(obj, key)
  const target = obj.items || obj.values || obj
  if (target.properties) {
    target.properties = sortFields(target.properties).reduce(
      (properties, key) => {
        const property = target.properties[key]
        walkField(property, key)
        properties[key] = property
        return properties
      },
      {},
    )
  }
}

const walkType = (obj: TypeSchema, key: string) => {
  // addMeta(obj, key)
  if (obj.fields) {
    obj.fields = sortFields(obj.fields).reduce((fields, key) => {
      const field = obj.fields[key]
      walkField(field, key)
      fields[key] = field
      return fields
    }, {})
  }
}

export const useSchema = (
  db = 'default',
): { schema: BasedSchema; loading: boolean } => {
  const { data, loading } = useQuery('db:schema', { db }, { persistent: true })

  if (data) {
    walkType(data.rootType, 'root')
    for (const key in data.types) {
      walkType(data.types[key], key)
    }
  }

  return { loading, schema: data || { types: {} } }
}
