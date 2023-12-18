import React, { ReactNode, useState } from 'react'
import { Stack } from '../../Stack'
import { TableProps } from './types'
import { getIdentifierField, isIterable, readPath, useCols } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/colors'
import { Button } from '../../Button'
import { styled } from 'inlines'
import { IconChevronDown, IconChevronRight, IconPlus } from '../../Icons'
import { BasedSchemaFieldArray } from '@based/schema'
import { ColStack } from './ColStack'
import { isSmallField } from './utils'
import { Badge } from '../../Badge'

export function Array({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const rows: ReactNode[] = []
  const cols: ReactNode[] = []
  const isCols = valuesField.type === 'object' && useCols(valuesField)

  const [openIndex, setIndex] = useState(0)

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
      const field =
        valuesField.type === 'object' && getIdentifierField(valuesField)

      for (let i = 0; i < value.length; i++) {
        const isOpen = openIndex === i
        const item = value?.[i]
        const title: ReactNode = field ? item?.[field] : valuesField.title

        rows.push(
          <Stack
            onClick={() => {
              setIndex(isOpen ? -1 : i)
            }}
            justify="start"
            style={{
              userSelect: 'none',
              cursor: 'pointer',
              background: color('background', 'muted'),
              borderBottom: border(),
              '&:hover': {
                background: color('background', 'neutral'),
              },
            }}
          >
            <Cell isKey>
              {isOpen ? (
                <IconChevronDown
                  style={{
                    marginRight: 8,
                  }}
                />
              ) : (
                <IconChevronRight
                  style={{
                    marginRight: 8,
                  }}
                />
              )}
              <Stack gap={16} justify="start">
                <Badge>{i + 1}</Badge>
                {title}
                {isIterable(valuesField) ? (
                  <Badge color="neutral-muted">
                    {item?.length} Item
                    {item?.length === 1 ? '' : 's'}
                  </Badge>
                ) : null}
              </Stack>
            </Cell>
          </Stack>
        )
        if (isOpen) {
          rows.push(
            <Stack justify="start" key={i}>
              <Cell>
                <Field ctx={ctx} path={[...path, i]} />
              </Cell>
            </Stack>
          )
        }
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
