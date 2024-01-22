import React, { ReactNode } from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { ColSizes, Path, TableCtx } from '../../types.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field.js'
import { RowProps } from './types.js'
import { DragableRow } from '../DragableRow.js'

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  index: number
  colFields: ColSizes
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  value: any
}) => {
  const cells: ReactNode[] = []

  console.info(p.colFields)

  for (const field of p.colFields) {
    cells.push(
      <Cell border key={field.key} width={field.width}>
        <Field ctx={p.ctx} path={[...p.path, p.index, field.key]} />
      </Cell>,
    )
  }
  return <DragableRow draggable {...p} cells={cells} />
}

export const ObjectCollsRows = (p: RowProps & { colFields: ColSizes }) => {
  const rows: ReactNode[] = []
  for (let i = 0; i < p.value.value.length; i++) {
    rows.push(
      <CollRow
        colFields={p.colFields}
        changeIndex={p.changeIndex}
        key={p.value.orderId + '_' + i}
        value={p.value[i]}
        field={p.field.values as BasedSchemaFieldObject}
        index={i}
        ctx={p.ctx}
        path={p.path}
        removeItem={p.removeItem}
      />,
    )
  }
  return rows
}
