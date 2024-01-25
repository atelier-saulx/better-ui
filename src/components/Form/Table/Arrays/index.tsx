import React, { ReactNode, useRef } from 'react'
import { BasedSchemaFieldArray } from '@based/schema'
import { styled } from 'inlines'
import { Stack, border, color, Button, IconPlus } from '../../../../index.js'
import { ColSizes, TableProps } from '../../types.js'
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
import { useSize } from '../../../../index.js'
import { getColSizes } from '../../getColSizes.js'

function Rows(p: RowProps & { isCols: boolean; colFields: ColSizes }) {
  if (p.isCols) {
    return <ObjectCollsRows draggable {...p} />
  }
  if (isSmallField(p.field.values)) {
    return <PrimitiveRows {...p} />
  }
  return <NestedObjectRows {...p} />
}

export function Arrays({ ctx, path }: TableProps) {
  const { field, value, readOnly } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const cols: ReactNode[] = []

  const [width, setWidth] = React.useState(0)

  const sizeRef = useSize((r) => {
    setWidth(r.width)
  })

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
    [],
  )

  const removeItem = React.useCallback((index: number) => {
    const nValue = [...valueRef.current.value]
    nValue.splice(index, 1)
    ctx.listeners.onChangeHandler(ctx, path, nValue)
  }, [])

  const colFields =
    valuesField.type === 'object'
      ? getColSizes(valuesField, width - 64 * 2 - 28, readOnly)
      : []

  const isCols =
    valuesField.type === 'object' &&
    canUseColumns(valuesField) &&
    width &&
    colFields.length === Object.keys(valuesField.properties).length

  if (isCols) {
    cols.unshift(<div style={{ minWidth: 28 }} key="_dicon" />)
    for (const col of colFields) {
      cols.push(
        <Cell
          border
          isKey
          key={col.key}
          width={col.width}
          flexible={col.flexible}
        >
          {getTitle(col.key, valuesField.properties[col.key])}
        </Cell>,
      )
    }
  }

  return (
    <styled.div style={{ width: '100%' }}>
      <styled.div ref={sizeRef} style={{ width: '100%' }} />
      <styled.div style={{ width: 200 }}>
        <Stack
          justify="start"
          align="start"
          direction="column"
          style={{
            width,
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
            colFields={colFields}
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
      </styled.div>
    </styled.div>
  )
}
