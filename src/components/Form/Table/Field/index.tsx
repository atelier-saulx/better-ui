import React from 'react'
import { readPath } from '../../utils.js'
import { TableCtx, Path } from '../../types.js'
import { EditableField } from './Editable.js'
import { ReadOnlyField } from './ReadOnly.js'
import { ValueRef } from '../Arrays/types.js'

export function Field({
  ctx,
  path,
  isFooter,
  valueRef,
}: {
  ctx: TableCtx
  isFooter?: boolean
  path: Path
  valueRef?: ValueRef
}) {
  let { value, field, readOnly } = readPath(ctx, path)
  if (!field) {
    return 'no field...'
  }
  const footer = valueRef?.footer
  const key = path[path.length - 1]
  if (isFooter) {
    if (footer && footer[key]) {
      value = footer[key]
    }
  } else {
    if (footer && field.type === 'number') {
      if (!footer[key]) {
        footer[key] = 0
      }
      footer[key] += value
    }
  }
  if (readOnly || isFooter) {
    return <ReadOnlyField value={value} field={field} ctx={ctx} path={path} />
  } else {
    return <EditableField value={value} field={field} ctx={ctx} path={path} />
  }
}
