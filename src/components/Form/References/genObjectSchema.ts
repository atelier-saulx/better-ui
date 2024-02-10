import {
  AllowedTypes,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
  BasedSchemaPartial,
} from '@based/schema'

export const genObjectSchemaFromSchema = (
  value: any[],
  field: BasedSchemaFieldReferences,
  schema: BasedSchemaPartial,
): BasedSchemaFieldObject => {
  // Generate schema if none can be found
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {
    },
  }

  let types: AllowedTypes = field.allowedTypes

  if (!types) {
    const generatedObjectSchema = genObjectSchema(value, schema)
    if (generatedObjectSchema.types) {
      types = [...generatedObjectSchema.types.values()]
    } else {
      return generatedObjectSchema.field
    }
  }

  if (types) {
    for (const type of types) {
      if (typeof type === 'string') {
        const t = schema.types?.[type]?.fields
        if (t) {
          // prob want to make this a bit nicer
          Object.assign(objectSchema.properties, t)
        }
      } else {
        // later...
        return genObjectSchema(value).field
      }
    }
    return objectSchema
  }
}

export const genObjectSchema = (
  value: any[],
  schema?: BasedSchemaPartial,
): { field?: BasedSchemaFieldObject; types?: Set<string> } => {
  const hasFields: Set<string> = new Set()

  const types: Set<string> = schema ? new Set() : undefined

  for (const v of value) {
    if (typeof v === 'object') {
      for (const k in v) {
        if (typeof v[k] !== 'object') {
          if (types) {
            if (typeof v[k] === 'string') {
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
          hasFields.add(k)
        }
      }
    }
  }

  if (types?.size) {
    return { types }
  }

  // Generate schema if none can be found
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: Object.fromEntries(
      [...hasFields.values()].map((key) => [key, { type: 'string' }]),
    ),
  }

  return { field: objectSchema }
}

export function decorateObjectSchema(objectSchema: BasedSchemaFieldObject) {
  for (const key of Object.keys(objectSchema.properties)) {
    if (key === 'number' || key === 'count') {
      objectSchema.properties[key] = {
        type: 'number',
      }
    } else if (key === 'color') {
      objectSchema.properties[key] = {
        type: 'string',
        format: 'rgbColor',
      }
    } else if (key === 'price') {
      objectSchema.properties[key] = {
        type: 'number',
        display: 'euro',
      }
    } else if (
      /(date)|(time)|(createdAt)|(lastUpdated)|(birthday)/i.test(key)
    ) {
      objectSchema.properties[key] = {
        type: 'timestamp',
        display: 'human',
      }
    } else {
      objectSchema.properties[key] = {
        type: 'string',
        format: key === 'id' ? 'basedId' : null,
        contentMediaType: key === 'src' ? 'image/*' : null,
      }
    }
  }

  return objectSchema
}
