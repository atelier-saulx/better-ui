import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableProps } from './types'
import { readPath, useCols } from './utils'
import { Cell } from './Cell'
import { Field, Padder } from './Field'
import { border, color } from '../../../utils/vars'
import { StringInput } from './StringInput'
import { Button } from '../../button'
import { styled } from 'inlines'
import { IconPlus } from '../../icons'
import { BasedSchemaFieldRecord } from '@based/schema'
import { ColStack } from './ColStack'

export function Record({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldRecord>(ctx, path)
  const valuesField = field.values

  const rows: ReactNode[] = []
  const cols: ReactNode[] = [
    <Cell objectKey isKey border key={'key'}>
      key
    </Cell>,
  ]

  if (valuesField.type === 'object' && useCols(valuesField)) {
    for (const key in valuesField.properties) {
      cols.push(
        <Cell border isKey key={key}>
          {valuesField.properties[key].title ?? key}
        </Cell>
      )
    }
    if (value) {
      for (const key in value) {
        const cells: ReactNode[] = [
          <Cell objectKey border isKey key="key">
            <StringInput value={key} />
          </Cell>,
        ]
        for (const k in value[key]) {
          cells.push(
            <Cell border key={k}>
              <Field ctx={ctx} path={[...path, key, k]} />
            </Cell>
          )
        }
        rows.push(
          <ColStack
            key={key}
            style={{
              borderBottom: border(),
            }}
          >
            {cells}
          </ColStack>
        )
      }
    }
  } else {
    cols.push(
      <Cell isKey border key={'value'}>
        value
      </Cell>
    )
    if (value) {
      for (const key in value) {
        rows.push(
          <ColStack
            key={key}
            style={{
              borderBottom: border(),
            }}
          >
            <Cell objectKey border isKey key={'key'}>
              <StringInput value={key} />
            </Cell>
            <Cell>
              <Field ctx={ctx} path={[...path, key]} />
            </Cell>
          </ColStack>
        )
      }
    }
  }

  return (
    <Stack justify="start" align="start" direction="column">
      <ColStack
        style={{
          background: color('background', 'muted'),
          borderBottom: border(),
        }}
      >
        {cols}
      </ColStack>
      {rows}
      <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
        <Button size="small" variant="neutral-transparent" prefix={<IconPlus />}>
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
