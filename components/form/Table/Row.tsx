import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableCtx, Path } from './types'
import { readPath, useColls } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/vars'

export function Row({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { field } = readPath(ctx, path)
  const isRoot = path.length === 1

  let body: ReactNode

  if (field.type === 'object') {
    const colls = field.type === 'object' && useColls(field)
    if (colls) {
      const cells: ReactNode[] = []
      const colls: ReactNode[] = []
      let first = true
      for (const key in field.properties) {
        colls.push(
          <Cell first={first} key={key}>
            {field.properties[key].title ?? key}
          </Cell>
        )
        cells.push(
          <Cell first={first} key={key}>
            <Field ctx={ctx} path={[...path, key]} />
          </Cell>
        )
        first = false
      }
      body = (
        <Stack
          justify="start"
          direction="column"
          style={{
            borderTop: isRoot ? border() : null,
            borderLeft: isRoot ? undefined : border(),
          }}
        >
          <Stack
            justify="start"
            style={{
              background: color('background', 'muted'),
              borderBottom: border(),
            }}
          >
            {colls}
          </Stack>
          <Stack
            style={{
              borderBottom: isRoot ? border() : null,
            }}
            justify="start"
          >
            {cells}
          </Stack>
        </Stack>
      )
    } else {
      const rows: ReactNode[] = []
      for (const key in field.properties) {
        rows.push(<Row key={key} ctx={ctx} path={[...path, key]} />)
      }
      body = (
        <Stack
          style={{
            borderTop: isRoot ? border() : null,
          }}
          direction="column"
        >
          {rows}
        </Stack>
      )
    }
  }

  if (!body) {
    body = (
      <Cell>
        <Field ctx={ctx} path={path} />
      </Cell>
    )
  }

  return isRoot ? (
    body
  ) : (
    <Stack
      style={{
        borderBottom: border(),
      }}
      justify="start"
    >
      <Cell isKey first>
        {field.title ?? path[path.length - 1]}
      </Cell>
      {body}
    </Stack>
  )
}
