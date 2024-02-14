import {
  AllowedTypes,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
  BasedSchemaPartial,
} from '@based/schema'
import { TableCtx } from '../types.js'
import { isSmallField } from '../utils.js'

export const genObjectSchemaFromSchema = (
  value: any[],
  field: BasedSchemaFieldReferences,
  schema: BasedSchemaPartial,
): BasedSchemaFieldObject => {
  // Generate schema if none can be found
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }

  let types: AllowedTypes = field.allowedTypes

  if (!types) {
    const generatedObjectSchema = genObjectSchemaFromValues(value, schema)
    if (generatedObjectSchema.types) {
      types = [...generatedObjectSchema.types.values()]
    } else {
      return generatedObjectSchema.field
    }
  }

  if (types) {
    for (let type of types) {
      if (typeof type === 'object') {
        type = type.type
      }

      if (typeof type === 'string') {
        const t = schema.types?.[type]?.fields

        if (t) {
          // // prob want to make this a bit nicer
          for (const key in t) {
            const f = t[key]
            // @ts-ignore
            if (isSmallField(f)) {
              // @ts-ignore
              objectSchema.properties[key] = f
            }
          }

          // Object.assign(objectSchema.properties, t)
        }
      } else {
        // later...
        return genObjectSchemaFromValues(value).field
      }
    }
    return objectSchema
  }
}

export const genObjectSchemaFromValues = (
  value: any[],
  schema?: BasedSchemaPartial,
): { field?: BasedSchemaFieldObject; types?: Set<string> } => {
  const fields: Record<string, string> = {}
  const types: Set<string> = schema ? new Set() : undefined

  for (const v of value) {
    if (typeof v === 'object') {
      for (const k in v) {
        let type: string = typeof v[k]

        if (type === 'undefined') {
          // null
          // make this a bit nicer
          type = '?'
        }

        if (type !== 'object') {
          if (types) {
            if (type === 'string') {
              if (k === 'type' && v[k] in schema.types) {
                types.add(v[k])
              } else if (k === 'id' && v[k].length > 4) {
                const typeFromPrefix =
                  schema.prefixToTypeMapping?.[k.slice(0, 2)]
                if (typeFromPrefix) {
                  types.add(typeFromPrefix)
                }
              }
            }
          }

          const keyType = fields[k]

          if (!keyType || keyType === '?') {
            fields[k] = type
          } else if (keyType !== type) {
            // have to ignore undefined etc
            fields[k] = '*'
          }
        }
      }
    }
  }

  if (types?.size) {
    return { types }
  }

  // Generate schema if none can be found
  // this function is prefromance critical so be aware

  // all the funciton things are way heavier then loop also doing 2 for loops vs 1
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }

  for (const key in fields) {
    const type = fields[key]
    if (key === 'id') {
      objectSchema.properties.id = {
        type: 'string',
      }
    } else if (type === 'boolean') {
      objectSchema.properties[key] = {
        type: 'boolean',
      }
    } else if (
      (type === 'number' || type === '?') &&
      (key === 'createdAt' ||
        key === 'updatedAt' ||
        /(date)|(time)|(createdAt)|(lastUpdated)|(birthday)/i.test(key))
    ) {
      objectSchema.properties[key] = {
        type: 'timestamp',
        display: 'human',
      }
    } else if (type === 'number' || key === 'number' || key === 'count') {
      objectSchema.properties[key] = {
        type: 'number',
      }
    } else if (key === 'color') {
      objectSchema.properties[key] = {
        type: 'string',
        format: 'rgbColor',
      }
    } else if (key === 'price' && type === '?') {
      objectSchema.properties[key] = {
        type: 'number',
        display: 'euro',
      }
    } else {
      objectSchema.properties[key] = {
        type: 'string',
        contentMediaType: key === 'src' ? 'image/*' : null,
      }
    }
  }

  return { field: objectSchema }
}

const setDefaultDisplayTimeStamp = (
  objectSchema: BasedSchemaFieldObject,
  key: string,
) => {
  if (
    key in objectSchema.properties &&
    objectSchema.properties[key].type === 'timestamp' &&
    // @ts-ignore dumb ts
    !objectSchema.properties[key].display
  ) {
    // @ts-ignore dumb ts
    objectSchema.properties[key].display = 'human'
  }
}

export const genObjectSchema = (
  value: any[],
  field: BasedSchemaFieldReferences,
  schema?: BasedSchemaPartial,
): BasedSchemaFieldObject => {
  const objectSchema = schema
    ? genObjectSchemaFromSchema(value, field, schema)
    : genObjectSchemaFromValues(value).field

  if ('aliases' in objectSchema.properties) {
    delete objectSchema.properties.aliases
  }

  if ('ancestors' in objectSchema.properties) {
    delete objectSchema.properties.ancestors
  }

  if ('children' in objectSchema.properties) {
    delete objectSchema.properties.children
  }

  if ('parents' in objectSchema.properties) {
    delete objectSchema.properties.parents
  }

  if ('descendants' in objectSchema.properties) {
    delete objectSchema.properties.descendants
  }

  // @ts-ignore
  if ('id' in objectSchema.properties && !objectSchema.properties.id.format) {
    // @ts-ignore
    objectSchema.properties.id.format = 'basedId'
    objectSchema.properties.id.readOnly = true
  }

  setDefaultDisplayTimeStamp(objectSchema, 'updatedAt')
  setDefaultDisplayTimeStamp(objectSchema, 'createdAt')

  return objectSchema
}
