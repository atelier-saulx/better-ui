import React from 'react'
import { TableCtx, Path } from './types'
import { Row } from './Row'
import { readPath } from './utils'

export function Table({ ctx, path }: { path: Path; ctx: TableCtx }) {
  const { field } = readPath(ctx, path)

  if (field.type === 'object') {
    return <Row path={path} ctx={ctx} />
  }

  // -------------------------------
  // object (start with this)
  // record
  // references
  // set
  // array
  // -------------------------------
  // utilities
  // - isPrimitive
  // - useColls (for object)
  // -------------------------------
  // -------------------------------
  // use path for everything
  // -------------------------------
  // table

  return ':) hello'
}
