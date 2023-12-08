import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableProps } from './types'
import { readPath, useCols } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/vars'
import { StringInput } from './StringInput'
import { Button } from '../../button'
import { styled } from 'inlines'
import { Plus } from '../../icons'
import { BasedSchemaFieldRecord } from '@based/schema'

export function Record({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldRecord>(ctx, path)
  const isRoot = path.length === 1
  const valuesField = field.values

  const rows: ReactNode[] = []
  const cols: ReactNode[] = [
    <Cell first isKey key={'key'}>
      key
    </Cell>,
  ]

  if (valuesField.type === 'object' && useCols(valuesField)) {
    for (const key in valuesField.properties) {
      cols.push(
        <Cell key={key}>{valuesField.properties[key].title ?? key}</Cell>
      )
    }
    if (value) {
      for (const key in value) {
        const cells: ReactNode[] = [
          <Cell first isKey key="key">
            <StringInput value={key} />
          </Cell>,
        ]
        for (const k in value[key]) {
          cells.push(
            <Cell>
              <Field ctx={ctx} path={[...path, key, k]} />
            </Cell>
          )
        }
        rows.push(
          <Stack
            style={{
              borderBottom: border(),
            }}
            justify="start"
          >
            {cells}
          </Stack>
        )
      }
    }
  } else {
    cols.push(<Cell key={'value'}>value</Cell>)
    if (value) {
      for (const key in value) {
        rows.push(
          <Stack
            justify="start"
            style={{
              borderBottom: border(),
            }}
          >
            <Cell first isKey key={'key'}>
              <StringInput value={key} />
            </Cell>
            <Cell>
              <Field ctx={ctx} path={[...path, key]} />
            </Cell>
          </Stack>
        )
      }
    }
  }

  return (
    <Stack
      justify="start"
      align="start"
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
      {rows}
      <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
        <Button size="small" variant="neutral-transparent" prefix={<Plus />}>
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
