import * as React from 'react'
import { Stack } from '../Stack'
import { Path, TableCtx } from './Table/types'
import { readPath } from './Table'
import { BasedSchemaFieldReference } from '@based/schema'
import { Badge } from '../Badge'
import { IconLink, IconSearch } from '../Icons'
import { Media } from '../Media'

export function Reference({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath<BasedSchemaFieldReference>(ctx, path)

  let hasFile = false
  let isId = value && typeof value === 'string'
  let src: string

  if (ctx.schema) {
    // go go go
  } else {
    if (field.allowedTypes?.includes('file')) {
      hasFile = true
      // lets go its file
      // other wise find it in ctx
    } else if (typeof value === 'object' && value.src) {
      src = value.src
      hasFile = true
      // go go go
    }
  }

  if (hasFile) {
    return (
      <Stack
        justify="start"
        gap={12}
        onClick={() => {
          // yes
        }}
      >
        <Media src={src} />
        <IconSearch />
      </Stack>
    )
  }

  if (isId) {
    return (
      <Stack
        justify="start"
        gap={12}
        onClick={() => {
          // yes
        }}
      >
        <Badge
          prefix={
            <IconLink style={{ width: 16, height: 16, marginRight: 4 }} />
          }
        >
          {value}
        </Badge>
        <IconSearch />
      </Stack>
    )
  }

  // selectReference OR action

  // if hasFile

  // if ()

  return <Stack>x</Stack>
}
