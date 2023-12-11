import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableProps } from './types'
import { readPath, useCols } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/vars'
import { Button } from '../../button'
import { styled } from 'inlines'
import { IconPlus } from '../../icons'
import { BasedSchemaFieldArray } from '@based/schema'
import { ColStack } from './ColStack'
import { isSmallField } from './utils'

export function Array({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const rows: ReactNode[] = []
  const cols: ReactNode[] = []
  const isCols = valuesField.type === 'object' && useCols(valuesField)

  if (isCols) {
    for (const key in valuesField.properties) {
      cols.push(
        <Cell border isKey key={key}>
          {valuesField.properties[key].title ?? key}
        </Cell>
      )
    }
    if (value) {
      for (let i = 0; i < value.length; i++) {
        const cells: ReactNode[] = []
        for (const key in valuesField.properties) {
          cells.push(
            <Cell border key={key}>
              <Field ctx={ctx} path={[...path, i, key]} />
            </Cell>
          )
        }
        rows.push(
          <ColStack
            key={i}
            style={{
              borderBottom: border(),
            }}
          >
            {cells}
          </ColStack>
        )
      }
    }
  } else if (value) {
    if (isSmallField(valuesField)) {
      for (let i = 0; i < value.length; i++) {
        rows.push(
          <Stack
            justify="start"
            key={i}
            style={{
              borderBottom: border(),
            }}
          >
            <Cell>
              <Field ctx={ctx} path={[...path, i]} />
            </Cell>
          </Stack>
        )
      }
    } else {
      for (let i = 0; i < value.length; i++) {
        rows.push(
          <Stack
            justify="start"
            style={{
              background: color('background', 'muted'),
              borderBottom: border(),
            }}
          >
            <Cell isKey>{valuesField.title ?? '' + ' ' + (i + 1)}</Cell>
          </Stack>,
          <Stack justify="start" key={i}>
            <Cell>
              <Field ctx={ctx} path={[...path, i]} />
            </Cell>
          </Stack>
        )
      }
    }
  }

  return (
    <Stack justify="start" align="start" direction="column">
      {cols.length ? (
        <ColStack
          style={{
            background: color('background', 'muted'),
            borderBottom: border(),
          }}
        >
          {cols}
        </ColStack>
      ) : null}
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
