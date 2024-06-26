import React, { ReactNode } from 'react'
import { Cell } from '../Cell.js'
import { Field } from '../Field/index.js'
import { RowProps } from './types.js'
import { DragableRow } from '../DragableRow.js'

export function PrimitiveRows(p: RowProps) {
  const rows: ReactNode[] = []
  const len = p.value.value.length
  for (let i = 0; i < len; i++) {
    rows.push(
      <DragableRow
        draggable
        key={p.value.orderId + '_' + i}
        {...p}
        index={i}
        cells={[
          <Cell key={0}>
            <Field ctx={p.ctx} path={[...p.path, i]} />
          </Cell>,
        ]}
      />,
    )
  }
  return <>{rows}</>
}
