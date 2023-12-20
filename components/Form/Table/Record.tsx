import React, { ReactNode } from 'react'
import { Stack } from '../../Stack'
import { TableProps } from './types'
import { readPath, useCols } from '../utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/colors'
import { Button } from '../../Button'
import { styled } from 'inlines'
import { IconPlus } from '../../Icons'
import { BasedSchemaFieldRecord } from '@based/schema'
import { ColStack } from './ColStack'
import { TextInput } from '../../TextInput'

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
