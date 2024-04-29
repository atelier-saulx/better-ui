import { FormProps } from '../../index.js'
import { BasedSchema, BasedSchemaType } from '@based/schema'
import { isSmallField } from '../Form/utils.js'

export const getTypesFromFilter = (query: any): string[] => {
  const types = []
  const walk = (obj: any) => {
    for (const k in obj) {
      if (k === '$field' && obj[k] === 'type') {
        if (obj.$operator === '=') {
          if (Array.isArray(obj.$value)) {
            types.push(...obj.$value)
          } else {
            types.push(obj.$value)
          }
        }
      }
      if (typeof obj[k] === 'object') {
        walk(obj[k])
      }
    }
  }
  if (typeof query === 'object') {
    walk(query)
  }
  return types
}

export const generateFromType = (type: BasedSchemaType): { query; fields } => {
  const newQuery = {}
  if (!type?.fields) {
    return { query: newQuery, fields: {} }
  }

  const fields: FormProps['fields'] = {}

  for (const field in type.fields) {
    const f = type.fields[field]
    if (!isSmallField(f)) {
      continue
    }
    if (field === 'type') {
      continue
    }
    if (field === 'updatedAt') {
      continue
    }

    fields[field] = { ...f }

    if (f.type === 'timestamp' && !f.display) {
      // @ts-ignore
      fields[field].display = 'human'
    }

    if (field === 'id') {
      // @ts-ignore
      fields[field].format = 'basedId'
    }

    if (f.type === 'reference') {
      newQuery[field] = {
        id: true,
        name: true,
        src: true,
      }
    } else {
      newQuery[field] = true
    }
  }

  return { query: newQuery, fields }
}

export const generateFieldsFromQuery = (
  query: any,
  schema?: BasedSchema,
): FormProps['fields'] | undefined => {
  if (!schema) {
    return
  }
  let fields: FormProps['fields']
  const types = getTypesFromFilter(query)
  if (types.length) {
    for (const t of types) {
      const fieldType = schema.types[t]
      if (fieldType) {
        if (!fields) {
          fields = {}
        }
        Object.assign(fields, generateFromType(fieldType).fields)
      }
    }

    if (fields && types.length > 1) {
      fields.type = {
        type: 'string',
        index: 0,
        readOnly: true,
        format: 'basedType',
      }
    }
  }
  return fields
}
