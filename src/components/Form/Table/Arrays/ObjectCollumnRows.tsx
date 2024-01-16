import React, { ReactNode } from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { Path, TableCtx } from '../../types.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field.js'
import { RowProps } from './types.js'
import { DragableRow } from '../DragableRow.js'

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  index: number
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  value: any
}) => {
  let name: string = ''
  let src: string = ''

  const cells: ReactNode[] = []
  for (const key in p.field.properties) {
    if (p.value) {
      if (key === 'name' || key === 'title') {
        name = p.value[key]
      } else if (key === 'src') {
        src = p.value.src
      }
    }

    cells.push(
      <Cell border key={key}>
        <Field ctx={p.ctx} path={[...p.path, p.index, key]} />
      </Cell>
    )
  }

  return <DragableRow name={name} src={src} {...p} cells={cells} />
}

export const ObjectCollsRows = (p: RowProps) => {
  const rows: ReactNode[] = []
  for (let i = 0; i < p.value.value.length; i++) {
    rows.push(
      <CollRow
        changeIndex={p.changeIndex}
        key={p.value.orderId + '_' + i}
        value={p.value[i]}
        field={p.field.values as BasedSchemaFieldObject}
        index={i}
        ctx={p.ctx}
        path={p.path}
        removeItem={p.removeItem}
      />
    )
  }
  return rows
}
