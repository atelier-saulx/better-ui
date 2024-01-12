import React, { ReactNode } from 'react'
import { border } from '../../../../index.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field.js'
import { ColStack } from '../ColStack.js'
import { RowProps } from './types.js'

export function PrimitiveRows(p: RowProps) {
  const rows: ReactNode[] = []
  const len = p.value.length
  for (let i = 0; i < len; i++) {
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
  }
  return <>{rows}</>
}
