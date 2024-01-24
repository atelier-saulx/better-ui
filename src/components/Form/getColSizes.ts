import {
  BasedSchemaField,
  BasedSchemaFieldObject,
  BasedSchemaFieldString,
} from '@based/schema'
import { ColSizes } from './types.js'

type SizeMatcher = {
  match?: (field: BasedSchemaField) => boolean
  width: number
  flexible?: boolean
  insertAtStart?: boolean
}

const FIELD_SIZES: {
  [key: string]: { [type: string]: SizeMatcher[] }
} = {
  editable: {
    timestamp: [
      {
        width: 210,
      },
    ],
    number: [
      {
        width: 180,
      },
    ],
    string: [
      {
        match: (field: BasedSchemaFieldString) => field.format === 'basedId',
        width: 200, // will become a reference select modal probably...
        insertAtStart: true,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'rgbColor',
        width: 200,
      },
      {
        match: (field: BasedSchemaFieldString) =>
          field.contentMediaType?.startsWith('image/'),
        width: 180,
        flexible: true,
      },
    ],
    reference: [
      {
        width: 500,
        flexible: true,
      },
    ],
    default: [
      {
        width: 180,
        flexible: true,
      },
    ],
  },
  readOnly: {
    string: [
      {
        match: (field: BasedSchemaFieldString) => field.format === 'basedId',
        width: 120,
        insertAtStart: true,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'rgbColor',
        width: 180,
      },
      {
        match: (field: BasedSchemaFieldString) =>
          field.contentMediaType?.startsWith('image/'),
        width: 48,
      },
    ],
    reference: [
      {
        width: 200,
        flexible: true,
      },
    ],
    timestamp: [
      {
        width: 160,
      },
    ],
    number: [
      {
        width: 120,
      },
    ],
    default: [
      {
        width: 120,
        flexible: true,
      },
    ],
  },
}

export const getColSizes = (
  fieldSchema: BasedSchemaFieldObject,
  width: number,
  editable?: boolean,
): ColSizes => {
  let total = width
  let totalFlexFields = 0
  let spread = 0

  const SIZES = editable ? FIELD_SIZES.editable : FIELD_SIZES.readOnly

  const percentageFields: ColSizes = []

  for (const key in fieldSchema.properties) {
    const field = fieldSchema.properties[key]
    const sizedType = SIZES[field.type] ?? SIZES.default
    let match: SizeMatcher

    for (const matcher of sizedType) {
      if (!matcher.match || matcher.match(field)) {
        match = matcher
        break
      }
    }

    if (!match) {
      match = SIZES.default[0]
    }

    const { width, flexible, insertAtStart } = match

    if (total < match.width) {
      break
    }

    if (flexible) {
      total -= width
      totalFlexFields++
      spread += width
      if (insertAtStart) {
        percentageFields.unshift({ key, field, flexible: true })
      } else {
        percentageFields.push({ key, field, flexible: true })
      }
    } else {
      total -= width
      if (insertAtStart) {
        percentageFields.unshift({ key, width, field })
      } else {
        percentageFields.push({ key, width, field })
      }
    }
  }

  for (const f of percentageFields) {
    if (!f.width) {
      f.width = Math.floor((total + spread) / totalFlexFields)
    }
  }

  return percentageFields
}
