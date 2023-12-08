import React from 'react'
import { StringInput } from './StringInput'
import { readPath } from './utils'
import { TableCtx, Path } from './types'

export function Field({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath(ctx, path)
  return field.type === 'string' ? (
    <StringInput value={value} />
  ) : (
    <div style={{ color: 'red' }}>{field.type}</div>
  )
}
