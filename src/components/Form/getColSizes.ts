import { BasedSchemaFieldObject } from '@based/schema'
import { ColSizes } from './types.js'

// sizes

export const getColSizes = (
  fieldSchema: BasedSchemaFieldObject,
  width: number,
  editable?: boolean,
): ColSizes => {
  let total = width
  let totalFlexFields = 0
  let spread = 0

  const minSize = editable ? 160 : 130

  const percentageFields: ColSizes = []

  if (fieldSchema.properties.id) {
    percentageFields.push({
      key: 'id',
      width: 120,
      field: fieldSchema.properties.id,
    })
    total -= 120
  }

  for (const key in fieldSchema.properties) {
    if (key === 'id') {
      continue
    }

    if (total < minSize) {
      break
    }

    const field = fieldSchema.properties[key]

    if (field.type === 'timestamp') {
      percentageFields.push({ key, width: minSize + 50, field })
      total -= minSize + 50
    } else if (
      field.type === 'number' ||
      key === 'id' ||
      (field.type === 'string' && field.format === 'rgbColor')
    ) {
      percentageFields.push({ key, width: minSize, field })
      total -= minSize
    } else if (
      field.type === 'string' &&
      field.contentMediaType?.startsWith('image/')
    ) {
      percentageFields.push({ key, width: 52, field })
      total -= 52
    } else {
      percentageFields.push({ key, field })
      total -= minSize
      totalFlexFields++
      spread += minSize
    }
  }

  for (const f of percentageFields) {
    if (!f.width) {
      f.width = Math.floor((total + spread) / totalFlexFields)
    }
  }

  return percentageFields
}
