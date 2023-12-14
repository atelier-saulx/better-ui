import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { TableCtx, Path } from './types'
import { getStringWidth } from '../../../utils/getStringWidth'
import { textVariants } from '../../Text'

export const readPath = <T extends BasedSchemaField = BasedSchemaField>(
  ctx: TableCtx,
  path: Path
): { field: T; value: any | void } => {
  let selectedValue: any = ctx.values
  let selectedField: any = ctx.schema
  for (const k of path) {
    selectedValue = selectedValue?.[k]
    const type = selectedField.type
    if (type) {
      if (type === 'record' || type === 'array') {
        selectedField = selectedField.values
      }
      if (type === 'object') {
        selectedField = selectedField.properties[k]
      }
    } else {
      selectedField = selectedField[k]
    }
  }
  return { field: selectedField, value: selectedValue }
}

export const getKeyWidth = (field: BasedSchemaField): number => {
  if (field.type === 'object') {
    let maxWidth = 0
    for (const key in field.properties) {
      const { title, description } = field.properties[key]
      const k = title ?? key
      const keyWidth = getStringWidth(k, {
        ...textVariants.bodyBold,
        fontFamily: 'Inter',
      })
      if (keyWidth > maxWidth) {
        maxWidth = keyWidth + 48
      }
      if (description) {
        const descriptionWidth = getStringWidth(description, {
          ...textVariants.body,
          fontFamily: 'Inter',
        })
        maxWidth = descriptionWidth + 40
      }
    }
    return maxWidth
  }

  return 200
}

export const useCols = (field: BasedSchemaFieldObject): boolean => {
  let cnt = 0
  for (const key in field.properties) {
    if (field.properties[key].description) {
      return false
    }
    cnt++
    if (cnt > 5) {
      return false
    }
    if (!isSmallField(field.properties[key])) {
      return false
    }
  }
  return true
}

export const isTable = (field: BasedSchemaField): boolean => {
  const { type } = field
  if (type === 'object' || type === 'record' || type === 'array') {
    return true
  }
  return false
}

export const isSmallField = ({ type }: BasedSchemaField): boolean => {
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
  return true
}

export const readParentField = (
  ctx: TableCtx,
  path: Path,
  level: number
): BasedSchemaField => {
  return readPath(ctx, path.slice(0, -level)).field
}

export const readType = (ctx: TableCtx, path: Path, level: number): string => {
  return readParentField(ctx, path, level).type ?? ''
}
