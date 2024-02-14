import React from 'react'
import { readPath } from '../../utils.js'
import { TableCtx, Path } from '../../types.js'
import { EditableField } from './Editable.js'
import { ReadOnlyField } from './ReadOnly.js'

export function Field({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field, readOnly } = readPath(ctx, path)

  if (!field) {
    console.error('GET PATH NO FIELD', path, field)
    return 'no field...'
  }

  if (readOnly) {
    return <ReadOnlyField value={value} field={field} ctx={ctx} path={path} />
  } else {
    return <EditableField value={value} field={field} ctx={ctx} path={path} />
  }
}
