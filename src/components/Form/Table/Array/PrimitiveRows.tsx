import React, { ReactNode } from 'react'
import { border } from '../../../../index.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field.js'
import { ColStack } from '../ColStack.js'
import { RowProps } from './types.js'

export function PrimitiveRows(p: RowProps) {
  if (p.value) {
    const rows: ReactNode[] = []
    for (let i = 0; i < p.value.length; i++) {
      rows.push(
        <ColStack
          justify="start"
          key={i}
          style={{
            borderBottom: border(),
          }}
          onRemove={() => p.removeItem(i)}
        >
          <Cell>
            <Field ctx={p.ctx} path={[...p.path, i]} />
          </Cell>
        </ColStack>
      )
      return rows
    }
  }
  return null
}
