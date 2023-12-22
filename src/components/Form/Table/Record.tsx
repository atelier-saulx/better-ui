import React, { ReactNode } from 'react'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Button,
  IconPlus,
  TextInput,
} from '../../../index.js'
import { TableProps } from '../types.js'
import { readPath, useCols } from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { BasedSchemaFieldRecord } from '@based/schema'
import { ColStack } from './ColStack.js'

export function Record({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldRecord>(ctx, path)
  const valuesField = field.values

  const rows: ReactNode[] = []
  const cols: ReactNode[] = [
    <Cell width={200} isKey border key={'key'}>
      Key
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
          <Cell width={200} border isKey key="key">
            <TextInput variant="small" value={key} />
          </Cell>,
        ]
        for (const k in valuesField.properties) {
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
    const borderBottom = valuesField.type === 'object' ? false : true
    cols.push(
      <Cell isKey border key={'value'}>
        Value
      </Cell>
    )
    if (value) {
      for (const key in value) {
        rows.push(
          <ColStack align="stretch" key={key}>
            <Cell
              width={200}
              border
              isKey
              key={'key'}
              style={{
                paddingRight: 10,
                paddingLeft: 10,
                borderBottom: border(),
              }}
            >
              <TextInput variant="small" value={key} />
            </Cell>
            <Cell
              style={{
                borderBottom: borderBottom ? border() : null,
              }}
            >
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
        <Button
          size="small"
          variant="neutral-transparent"
          prefix={<IconPlus />}
        >
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
