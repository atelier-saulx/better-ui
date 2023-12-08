import React from 'react'
import { Stack } from '../../layout'
import { TableCtx, Path } from './types'
import { readPath, useColls } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'

export function Row({ ctx, path }: { ctx: TableCtx; path: Path }) {
  // const parent = readPath(ctx, path.slice(0, -1))

  return (
    <Stack justify="start" style={{}}>
      ROW! COLLS
    </Stack>
  )
}
