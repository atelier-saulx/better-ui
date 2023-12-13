import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { TableCtx, Path } from './types'
import { fontSizeMap } from './fontSizeMap'

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

const calcWidth = (str: string): number => {
  let nr = 0
  for (const char of str) {
    // @ts-ignore
    nr += fontSizeMap.characters[char] ?? 12
  }
  return nr
}

export const getKeyWidth = (field: BasedSchemaField): number => {
  if (field.type === 'object') {
    let maxWidth = 0
    for (const key in field.properties) {
      const { title, description } = field.properties[key]
      const k = title ?? key
      const keyWidth = calcWidth(k)
      if (keyWidth > maxWidth) {
        maxWidth = keyWidth
      }
      if (description) {
        const descriptionWidth = calcWidth(description)
        maxWidth = descriptionWidth
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
