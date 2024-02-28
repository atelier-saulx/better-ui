import React, { ReactNode } from 'react'
import { Stack, border, color, useSize } from '../../../index.js'
import { BasedSchemaFieldObject } from '@based/schema'
import { TableProps } from '../types.js'
import { readPath, canUseColumns, getTitle } from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field/index.js'
import { Table } from './index.js'
import { ColStack } from './ColStack.js'
import { getColSizes } from '../getColSizes.js'

export function ObjectParser({ ctx, path }: TableProps) {
  const { field, readOnly } = readPath<BasedSchemaFieldObject>(ctx, path)
  const cols = canUseColumns(field)

  const [width, setWidth] = React.useState(0)

  const sizeRef = useSize(({ width }) => {
    setWidth(width - 64 * 2)
  })

  const colFields =
    field.type === 'object' ? getColSizes(field, width, readOnly) : []

  if (
    cols &&
    width &&
    colFields.length === Object.keys(field.properties).length
  ) {
    const cells: ReactNode[] = []
    const cols: ReactNode[] = []
    for (const f of colFields) {
      cols.push(
        <Cell isKey border key={f.key} width={f.width} flexible={f.flexible}>
          {getTitle(f.key, field.properties[f.key])}
        </Cell>,
      )
      cells.push(
        <Cell border key={f.key} width={f.width} flexible={f.flexible}>
          <Field ctx={ctx} path={[...path, f.key]} />
        </Cell>,
      )
    }
    return (
      <Stack
        ref={sizeRef}
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
  const sortedProperties = Object.fromEntries(
    Object.entries(field.properties).sort(([, a], [, b]) => {
      const aIndex = a.index ?? 1e6
      const bIndex = b.index ?? 1e6
      return aIndex === bIndex ? 0 : aIndex > bIndex ? 1 : -1
    }),
  )
  for (const key in sortedProperties) {
    rows.push(<Table key={key} ctx={ctx} path={[...path, key]} />)
  }

  return (
    <Stack ref={sizeRef} direction="column">
      {rows}
    </Stack>
  )
}
