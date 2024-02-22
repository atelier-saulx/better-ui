import {
  BasedSchemaContentMediaType,
  BasedSchemaField,
  BasedSchemaFieldObject,
} from '@based/schema'
import { TableCtx, Path } from './types.js'
import { getStringWidth, textVariants } from '../../index.js'
import humanizeString from 'humanize-string'

const IDENTIFIER_FIELDS = [
  'title',
  'name',
  'firstName',
  'email',
  'phone',
  'id',
  'price',
  'type',
]

export const readInfoField = (obj: any, field: BasedSchemaField): string => {
  if (typeof obj === 'object') {
    const str = getIdentifierFieldValue(obj)
    if (str) {
      return str
    }
  }

  if (isSmallField(field)) {
    return obj
  }

  return field.title ?? humanizeString(field.type) ?? ''
}

// TODO clean up
export const readPath = <T extends BasedSchemaField = BasedSchemaField>(
  ctx: TableCtx,
  path: Path,
): { field: T; value: any | void; readOnly?: boolean } => {
  let selectedValue: any = ctx.values
  let selectedField: any = ctx.fields

  let readOnly = ctx.readOnly

  const hasOverrides = ctx.fieldOverrides
  const hasValueOverrides = ctx.valueOverrides

  let sO = ''

  for (const k of path) {
    let noFieldSelect = false
    let noValueSelect = false
    if (hasOverrides || hasValueOverrides) {
      if (sO) {
        sO += '.' + k
      } else {
        sO += k
      }
      if (hasOverrides?.[sO]) {
        selectedField = hasOverrides[sO]
        noFieldSelect = true
      }
      if (hasValueOverrides?.[sO]) {
        selectedValue = hasValueOverrides[sO]
        noValueSelect = true
      }
    }

    if (!noValueSelect) {
      selectedValue = selectedValue?.[k]
    }

    const type = selectedField.type
    if (!noFieldSelect) {
      if (type) {
        if (type === 'array' || type === 'references') {
          selectedField = selectedField.items
        } else if (type === 'record') {
          selectedField = selectedField.values
        } else if (type === 'object') {
          selectedField = selectedField.properties[k]
        }
      } else {
        selectedField = selectedField[k]
      }

      if (!selectedField) {
        break
      }

      if (selectedField.readOnly) {
        readOnly = true
      }
    } else {
      if (selectedField.readOnly) {
        readOnly = true
      }
    }
  }

  return { field: selectedField, value: selectedValue, readOnly }
}

export const getKeyWidth = (field: BasedSchemaField): number => {
  if (field.type === 'object') {
    let maxWidth = 0
    for (const key in field.properties) {
      const prop = field.properties[key]
      const { description } = prop
      const k = getTitle(key, prop)
      const keyWidth =
        getStringWidth(String(k), {
          ...textVariants['body-bold'],
          fontFamily: 'Inter, system-ui',
        }) + 40
      if (keyWidth > maxWidth) {
        maxWidth = keyWidth
      }
      if (description) {
        const descriptionWidth =
          getStringWidth(description, {
            ...textVariants['body'],
            fontFamily: 'Inter, system-ui',
          }) + 40
        if (descriptionWidth > maxWidth) {
          maxWidth = descriptionWidth
        }
      }
    }
    return maxWidth
  }

  return 200
}

export const canUseColumns = (field: BasedSchemaFieldObject): boolean => {
  for (const key in field.properties) {
    if (field.properties[key].description) {
      return false
    }
    if (!isSmallField(field.properties[key])) {
      return false
    }
  }
  return true
}

export const getIdentifierField = (
  field: BasedSchemaFieldObject,
): string | void => {
  for (const str of IDENTIFIER_FIELDS) {
    if (str in field.properties) {
      return str
    }
  }
}

export const getIdentifierFieldValue = (value: any, skipFields?: string[]) => {
  if (typeof value === 'object') {
    for (const str of IDENTIFIER_FIELDS) {
      if (str in value && !skipFields?.includes(str)) {
        return value[str]
      }
    }
  }
}

export const isTable = (field: BasedSchemaField): boolean => {
  const { type } = field
  if (type === 'object' || type === 'record' || type === 'array') {
    return true
  }
  return false
}

export const isSmallField = (field: BasedSchemaField): boolean => {
  if (!field) {
    return true
  }

  const { type } = field

  if (
    type === 'array' ||
    type === 'json' ||
    type === 'record' ||
    type === 'set' ||
    type === 'references' ||
    type === 'object'
  ) {
    return false
  }

  if ((type === 'string' || type === 'text') && field.format === 'html') {
    return false
  }

  if ((type === 'string' || type === 'text') && field.multiline) {
    return false
  }

  if ((type === 'string' || type === 'text') && isCode(field.format)) {
    return false
  }

  return true
}

export const isIterable = ({ type }: BasedSchemaField): boolean => {
  if (
    type === 'array' ||
    type === 'record' ||
    type === 'set' ||
    type === 'references'
  ) {
    return true
  }
  return false
}

export const readParentField = (
  ctx: TableCtx,
  path: Path,
  level: number = 1,
): BasedSchemaField => {
  return readPath(ctx, path.slice(0, -level)).field
}

export const readParentType = (
  ctx: TableCtx,
  path: Path,
  level: number = 1,
): string => {
  return readParentField(ctx, path, level).type ?? ''
}

export const getTitle = (
  key: string | number,
  field: BasedSchemaField,
): string | number => {
  if ('title' in field) {
    return field.title
  }

  if (key === 'createdAt') {
    return 'Created At'
  }

  if (key === 'updatedAt') {
    return 'Last Updated'
  }

  return humanizeString(key + '')
}

export const isType = (field: BasedSchemaField): boolean => {
  return field.type === 'string' && field.format === 'basedType'
}

export const isId = (field: BasedSchemaField): boolean => {
  return field.type === 'string' && field.format === 'basedId'
}

export const isFile = (field: BasedSchemaField): boolean => {
  return !!(field.type === 'string' && field.contentMediaType)
}

export const getContentMediaType = (
  field: BasedSchemaField,
): BasedSchemaContentMediaType | undefined => {
  return field.type === 'string' ? field.contentMediaType : undefined
}

export const isCode = (format: any): boolean => {
  if (
    (typeof format === 'string' && format === 'code') ||
    format === 'typescript' ||
    format === 'css' ||
    format === 'json' ||
    format === 'javascript' ||
    format === 'markdown' ||
    format === 'clike' ||
    format === 'code'
  ) {
    return true
  }

  return false
}

export const createNewEmptyValue = ({ type }: BasedSchemaField): any => {
  if (type === 'array' || type === 'set' || type === 'references') {
    return []
  }

  if (type === 'object') {
    return {}
  }

  if (type === 'string') {
    return ''
  }
}
