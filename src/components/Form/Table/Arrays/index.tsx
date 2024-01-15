import React, { ReactNode, useRef } from 'react'
import { BasedSchemaFieldArray } from '@based/schema'
import { styled } from 'inlines'
import { Stack, border, color, Button, IconPlus } from '../../../../index.js'
import { TableProps } from '../../types.js'
import {
  readPath,
  canUseColumns,
  isSmallField,
  getTitle,
  createNewEmptyValue,
} from '../../utils.js'
import { Cell } from '../Cell.js'
import { ColStack } from '../ColStack.js'
import { ObjectCollsRows } from './ObjectCollumnRows.js'
import { NestedObjectRows } from './NestedObjectRows.js'
import { PrimitiveRows } from './PrimitiveRows.js'
import { RowProps, ValueRef } from './types.js'

function Rows(p: RowProps & { isCols: boolean }) {
  if (p.isCols) {
    return <ObjectCollsRows {...p} />
  }
  if (isSmallField(p.field.values)) {
    return <PrimitiveRows {...p} />
  }
  return <NestedObjectRows {...p} />
}

export function Arrays({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const cols: ReactNode[] = []
  const isCols = valuesField.type === 'object' && canUseColumns(valuesField)

  const valueRef = useRef<ValueRef>({ orderId: 0, value: [] })
  valueRef.current.value = Array.isArray(value) ? value : []

  const addNew = React.useCallback(() => {
    ctx.listeners.onChangeHandler(ctx, path, [
      ...valueRef.current.value,
      createNewEmptyValue(field.values),
    ])
  }, [])

  const changeIndex = React.useCallback(
    (fromIndex: number, toIndex: number) => {
      valueRef.current.orderId++
      const n = [...valueRef.current.value]
      const target = n[fromIndex]
      n.splice(fromIndex, 1)
      n.splice(toIndex, 0, target)
      ctx.listeners.onChangeHandler(ctx, path, n)
    },
    []
  )

  const removeItem = React.useCallback((index: number) => {
    const nValue = [...valueRef.current.value]
    nValue.splice(index, 1)
    ctx.listeners.onChangeHandler(ctx, path, nValue)
  }, [])

  if (isCols) {
    cols.unshift(<div style={{ minWidth: 28 }} key="_dicon" />)
    for (const key in valuesField.properties) {
      cols.push(
        <Cell border isKey key={key}>
          {getTitle(key, valuesField.properties[key])}
        </Cell>
      )
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
      <Rows
        removeItem={removeItem}
        changeIndex={changeIndex}
        isCols={isCols}
        value={valueRef.current}
        path={path}
        ctx={ctx}
        field={field}
      />
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
