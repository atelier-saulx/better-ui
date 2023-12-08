import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableProps } from './types'
import { readPath, useCols } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/vars'
import { BasedSchemaFieldObject } from '@based/schema'
import { Table } from './'

export function Object({ ctx, path }: TableProps) {
  const { field } = readPath<BasedSchemaFieldObject>(ctx, path)
  const isRoot = path.length === 1

  const cols = useCols(field)
  if (cols) {
    const cells: ReactNode[] = []
    const cols: ReactNode[] = []
    let first = true
    for (const key in field.properties) {
      cols.push(
        <Cell first={first} key={key}>
          {field.properties[key].title ?? key}
        </Cell>
      )
      cells.push(
        <Cell first={first} key={key}>
          <Field ctx={ctx} path={[...path, key]} />
        </Cell>
      )
      first = false
    }
    return (
      <Stack
        justify="start"
        direction="column"
        style={{
          borderTop: isRoot ? border() : null,
          borderLeft: isRoot ? undefined : border(),
        }}
      >
        <Stack
          justify="start"
          style={{
            background: color('background', 'muted'),
            borderBottom: border(),
          }}
        >
          {cols}
        </Stack>
        <Stack justify="start">{cells}</Stack>
      </Stack>
    )
  }

  const rows: ReactNode[] = []
  for (const key in field.properties) {
    rows.push(<Table key={key} ctx={ctx} path={[...path, key]} />)
  }

  return (
    <Stack
      style={{
        borderTop: isRoot ? border() : null,
      }}
      direction="column"
    >
      {rows}
    </Stack>
  )
}
