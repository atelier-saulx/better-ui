import { BasedSchemaField, BasedSchemaFieldObject } from '@based/schema'
import { TableCtx, Path } from './types'

export const readPath = (
  ctx: TableCtx,
  path: Path
): { field: BasedSchemaField; value: any | void } => {
  let selectedValue: any = ctx.values
  let selectedField: any = ctx.schema

  for (let i = 0; i < path.length; i++) {
    const k = path[i]
    selectedValue = selectedValue?.[k]
    let type = selectedField.type

    if (type) {
      if (type === 'record') {
        if (i !== path.length - 1) {
          selectedField = selectedField.values
        }
      }

      if (type === 'object') {
        selectedField = selectedField.properties[k]
      }
      // others types
    } else {
      selectedField = selectedField[k]
    }
  }

  return { field: selectedField, value: selectedValue }
}

export const useCols = (field: BasedSchemaFieldObject): boolean => {
  // this can be nicer
  let cnt = 0
  for (const key in field.properties) {
    const { type } = field.properties[key]
    cnt++
    if (cnt > 5) {
      return false
    }
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
  }
  return true
}
