import React, { ReactNode } from 'react'
import { Stack } from '../../Stack'
import { TableProps } from './types'
import { readPath, readType, useCols } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/colors'
import { BasedSchemaFieldObject } from '@based/schema'
import { Table } from '.'
import { ColStack } from './ColStack'

export function Object({ ctx, path }: TableProps) {
  const { field } = readPath<BasedSchemaFieldObject>(ctx, path)
  const cols = useCols(field)

  if (cols) {
    const cells: ReactNode[] = []
    const cols: ReactNode[] = []
    for (const key in field.properties) {
      cols.push(
        <Cell isKey border key={key}>
          {field.properties[key].title ?? key}
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
          borderBottom:
            readType(ctx, path, 1) === 'object' ? undefined : border(),
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
