import React, { ReactNode } from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { ColSizes, Path, TableCtx } from '../../types.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field/index.js'
import { RowProps } from './types.js'
import { styled } from 'inlines'
import { DragableRow } from '../DragableRow.js'

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  isLoading?: boolean
  index: number
  onClickRow?: (val: any) => void
  colFields: ColSizes
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  value: any
  draggable?: boolean
}) => {
  const cells: ReactNode[] = []
  for (const field of p.colFields) {
    if (p.isLoading) {
      cells.push(
        <Cell
          border
          key={field.key}
          width={field.width}
          flexible={field.flexible}
        >
          <styled.div />
        </Cell>,
      )
    } else {
      cells.push(
        <Cell
          border
          key={field.key}
          width={field.width}
          flexible={field.flexible}
        >
          <Field ctx={p.ctx} path={[...p.path, p.index, field.key]} />
        </Cell>,
      )
    }
  }
  return (
    <DragableRow
      onClick={
        p.onClickRow
          ? () => {
              p.onClickRow(p.value)
            }
          : null
      }
      {...p}
      cells={cells}
    />
  )
}

export const ObjectCollsRows = (
  p: RowProps & { colFields: ColSizes; isLoading?: boolean },
) => {
  const rows: ReactNode[] = []
  for (let i = 0; i < p.value.value.length; i++) {
    rows.push(
      <CollRow
        colFields={p.colFields}
        changeIndex={p.changeIndex}
        key={p.value.orderId + '_' + i}
        value={p.value.value[i]}
        field={p.field.values as BasedSchemaFieldObject}
        index={i}
        isLoading={p.isLoading}
        onClickRow={p.onClickRow}
        ctx={p.ctx}
        path={p.path}
        draggable={p.draggable}
        removeItem={p.removeItem}
      />,
    )
  }
  return rows
}
