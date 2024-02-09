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
  types?: AllowedTypes,
): BasedSchemaFieldObject => {
  // Generate schema if none can be found
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }

  if (!types) types = field.allowedTypes

  if (types) {
    for (const type of types) {
      if (typeof type === 'string') {
        const t = schema.types?.[type]?.fields
        if (t) {
          Object.assign(objectSchema.properties, t)
        }
      } else {
        return genObjectSchema(value)
      }
    }

    return objectSchema
  }

  const generatedObjectSchema = genObjectSchema(value)

  return generatedObjectSchema
}

export const genObjectSchema = (value: any[]): BasedSchemaFieldObject => {
  const hasFields: Set<string> = new Set()

  for (const v of value) {
    if (typeof v === 'object') {
      for (const k in v) {
        if (typeof v[k] !== 'object') {
          hasFields.add(k)
        }
      }
    }
  }

  // Generate schema if none can be found
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }

  for (const key of hasFields.values()) {
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
        format: key === 'id' ? 'basedId' : null, // pass some more options here...
        contentMediaType: key === 'src' ? 'image/*' : null,
      }
    }
  }

  return objectSchema
}
