import React, { ReactNode, useState } from 'react'
import { styled, Style } from 'inlines'
import { BasedSchemaField } from '@based/schema'
import { TableCtx, Path } from './types'
import { Row } from './Row'
import { readPath, useColls } from './utils'
import { Stack } from '../../layout'
import { Cell } from './Cell'
import { Field } from './Field'

export function Table({ ctx, path }: { path: Path; ctx: TableCtx }) {
  const { value, field } = readPath(ctx, path)

  if (field.type === 'object') {
    if (useColls(field)) {
      return 'COLLS'

      // return colls variant
    } else {
      const rows: ReactNode[] = []
      const keys: ReactNode[] = []

      for (const key in field.properties) {
        rows.push(
          <Cell key={key}>
            <Field ctx={ctx} path={[...path, key]} />
          </Cell>
        )
        keys.push(
          <Cell first key={key}>
            {field.properties[key].title ?? key}
          </Cell>
        )
      }

      return (
        <Stack>
          <styled.div
            style={{
              flexGrow: 0,
              paddingRight: 12,
            }}
          >
            {keys}
          </styled.div>
          <styled.div
            style={{
              flexGrow: 1,
            }}
          >
            {rows}
          </styled.div>
        </Stack>
      )
    }
  }

  // -------------------------------
  // object (start with this)
  // record
  // references
  // set
  // array
  // -------------------------------
  // utilities
  // - isPrimitive
  // - useColls (for object)
  // -------------------------------
  // -------------------------------
  // use path for everything
  // -------------------------------
  // table

  return 'hello'
}
