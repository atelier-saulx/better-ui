import { BasedSchemaFieldObject } from '@based/schema'

export const genObjectSchema = (value: any[]): BasedSchemaFieldObject => {
  const hasFields: Set<string> = new Set(['id'])

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
    if (key === 'color') {
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
        format: key === 'id' ? 'basedId' : null, //ass some more options here...
        contentMediaType: key === 'src' ? 'image/*' : null,
      }
    }
  }

  return objectSchema
}
