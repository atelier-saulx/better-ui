import * as React from 'react'
import { Stack } from '../Stack'
import { Path, TableCtx } from './Table/types'
import { readPath } from './Table'
import { BasedSchemaFieldReference } from '@based/schema'

export function Reference({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath<BasedSchemaFieldReference>(ctx, path)

  let hasFile = false

  if (ctx.schema) {
    // go go go
  } else {
    if (field.allowedTypes?.includes('file')) {
      hasFile = true
      // lets go its file
      // other wise find it in ctx
    } else if (typeof value === 'object' && value.src) {
      hasFile = true
      // go go go
    }
  }

  // if hasFile

  // if ()

  return <Stack>x</Stack>
}
