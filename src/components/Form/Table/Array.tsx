import React, { ReactNode, useState, useRef } from 'react'
import { BasedSchemaFieldArray } from '@based/schema'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Button,
  IconChevronDown,
  IconChevronRight,
  IconPlus,
  Badge,
} from '../../../index.js'
import { TableProps } from '../types.js'
import {
  getIdentifierField,
  isIterable,
  readParentType,
  readPath,
  useCols,
  isSmallField,
  getTitle,
  createNewEmptyValue,
} from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { ColStack } from './ColStack.js'

export function Array({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const rows: ReactNode[] = []
  const cols: ReactNode[] = []
  const isCols = valuesField.type === 'object' && useCols(valuesField)
  const [openIndex, setIndex] = useState(0)

  const valueRef = useRef<typeof value>()
  valueRef.current = value

  const addNew = React.useCallback(async () => {
    ctx.listeners.onChangeHandler(ctx, path, [
      ...valueRef.current,
      createNewEmptyValue(field.values),
    ])
  }, [])

  const removeItem = (index: number) => {
    const nValue = [...valueRef.current]
    nValue.splice(index, 1)
    ctx.listeners.onChangeHandler(ctx, path, nValue)
  }

  if (isCols) {
    for (const key in valuesField.properties) {
      cols.push(
        <Cell border isKey key={key}>
          {getTitle(key, valuesField.properties[key])}
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
            onRemove={() => {
              removeItem(i)
            }}
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
          // @ts-ignore TODO: fix type in inlines
          <Stack
            key={'_' + i + 1}
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
            <Cell
              isKey
              style={{
                paddingLeft: readParentType(ctx, path) === 'array' ? 30 : 20,
              }}
            >
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
              <Stack gap={16} style={{ paddingRight: 12 }}>
                <Stack gap={16} justify="start">
                  <Badge color="neutral-muted">{i + 1}</Badge>
                  {title}
                </Stack>
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
    <Stack
      justify="start"
      align="start"
      direction="column"
      style={{
        borderBottom: path.length > 1 ? border() : null,
      }}
    >
      {cols.length ? (
        <ColStack
          header
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
          onClick={addNew}
        >
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
