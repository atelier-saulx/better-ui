import {
  BasedSchemaField,
  BasedSchemaFieldObject,
  BasedSchemaFieldReference,
  BasedSchemaFieldString,
  BasedSchemaFieldTimeStamp,
} from '@based/schema'
import { ColSizes } from './types.js'

type SizeMatcher = {
  match?: (field: BasedSchemaField, key: string) => boolean
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
    integer: [
      {
        width: 180,
      },
    ],
    number: [
      {
        width: 180,
      },
    ],
    boolean: [
      {
        width: 75,
      },
    ],
    string: [
      {
        match: (field: BasedSchemaFieldString) => field.format === 'basedId',
        width: 150, // will become a reference select modal probably...
        insertAtStart: true,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'basedType',
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
        match: (field: BasedSchemaFieldString, key) => key === 'type',
        width: 100,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'rgbColor',
        width: 140,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'basedId',
        width: 150,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'basedType',
        width: 130, // will become a reference select modal probably...
        insertAtStart: true,
      },
      {
        match: (field: BasedSchemaFieldString) => field.format === 'rgbColor',
        width: 180,
      },
      {
        match: (field: BasedSchemaFieldString) =>
          field.contentMediaType?.startsWith('image/'),
        width: 66,
      },
    ],
    boolean: [
      {
        width: 75,
      },
    ],
    reference: [
      {
        match: (field: BasedSchemaFieldReference) =>
          field.allowedTypes &&
          field.allowedTypes.length === 1 &&
          field.allowedTypes[0] === 'file',
        width: 250,
      },
      {
        width: 300,
        flexible: true,
      },
    ],
    timestamp: [
      {
        match: (field: BasedSchemaFieldTimeStamp) =>
          field.display === 'time-precise',
        width: 200,
      },
      {
        match: (field: BasedSchemaFieldTimeStamp) =>
          field.display === 'date-time-text',
        width: 300,
      },
      {
        width: 200,
      },
    ],
    integer: [
      {
        width: 120,
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

for (const group in FIELD_SIZES) {
  FIELD_SIZES[group].text = FIELD_SIZES[group].string
}

export const getColSizes = (
  fieldSchema: BasedSchemaFieldObject,
  width: number,
  readOnly?: boolean,
  showAllCols?: boolean,
): ColSizes => {
  let total = width
  let totalFlexFields = 0
  let spread = 0

  const SIZES = !readOnly ? FIELD_SIZES.editable : FIELD_SIZES.readOnly

  const fields: ColSizes = []

  let hasFlexible = false

  // perfomance handle this better!
  const tempFields: { key: string; field: BasedSchemaField }[] = []

  for (const key in fieldSchema.properties) {
    const field = fieldSchema.properties[key]
    tempFields.push({
      field,
      key,
    })
  }

  tempFields.sort((a, b) => {
    const aIndex = a.field.index ?? 1e6
    const bIndex = b.field.index ?? 1e6
    return aIndex < bIndex ? -1 : aIndex === bIndex ? 0 : 1
  })

  for (const { key, field } of tempFields) {
    // @ts-ignore
    if (field.width) {
      // @ts-ignore
      const width: number = field.width
      if (total < width && !showAllCols) {
        break
      }
      // @ts-ignore
      fields.push({ key, width, field, fixed: true })
      total -= width
      continue
    }

    const sizedType = SIZES[field.type] ?? SIZES.default
    let match: SizeMatcher

    for (const matcher of sizedType) {
      if (!matcher.match || matcher.match(field, key)) {
        match = matcher
        break
      }
    }

    if (!match) {
      match = SIZES.default[0]
    }

    const { width, flexible, insertAtStart } = match

    if (total < match.width && !showAllCols) {
      break
    }

    if (flexible) {
      hasFlexible = true
      total -= width
      totalFlexFields++
      spread += width
      if (insertAtStart) {
        fields.unshift({ key, field, flexible: true })
      } else {
        fields.push({ key, field, flexible: true })
      }
    } else {
      total -= width
      if (insertAtStart) {
        fields.unshift({ key, width, field })
      } else {
        fields.push({ key, width, field })
      }
    }
  }

  if (!showAllCols) {
    if (!hasFlexible) {
      totalFlexFields = fields.length
      for (const f of fields) {
        f.width = Math.floor(width / totalFlexFields)
      }
    } else {
      for (const f of fields) {
        if (!f.width) {
          f.width = Math.floor((total + spread) / totalFlexFields)
        }
      }
    }
  }

  // TODO PERF: do sorting faster in the for loop thats there allready
  // or make sure it gets called less often

  return fields
}
