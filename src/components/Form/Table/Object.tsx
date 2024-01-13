import React, { ReactNode } from 'react'
import { Stack, border, color } from '../../../index.js'
import { BasedSchemaFieldObject } from '@based/schema'
import { TableProps } from '../types.js'
import { readPath, canUseColumns, getTitle } from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { Table } from './index.js'
import { ColStack } from './ColStack.js'

export function Object({ ctx, path }: TableProps) {
  const { field } = readPath<BasedSchemaFieldObject>(ctx, path)
  const cols = canUseColumns(field)

  if (cols) {
    const cells: ReactNode[] = []
    const cols: ReactNode[] = []
    for (const key in field.properties) {
      cols.push(
        <Cell isKey border key={key}>
          {getTitle(key, field.properties[key])}
        </Cell>
      )
      cells.push(
        <Cell border key={key}>
          <Field ctx={ctx} path={[...path, key]} />
        </Cell>
      )
    }
    return (
      <Stack
        justify="start"
        direction="column"
        style={{
          borderBottom: border(),
        }}
      >
        <ColStack
          style={{
            background: color('background', 'muted'),
            borderBottom: border(),
          }}
        >
          {cols}
        </ColStack>
        <ColStack>{cells}</ColStack>
      </Stack>
    )
  }

  const rows: ReactNode[] = []
  for (const key in field.properties) {
    rows.push(<Table key={key} ctx={ctx} path={[...path, key]} />)
  }

  return <Stack direction="column">{rows}</Stack>
}
