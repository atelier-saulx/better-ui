import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableProps } from './types'
import { readPath } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border } from '../../../utils/vars'
import { Record } from './Record'
import { Object } from './Object'

export function Table({ ctx, path }: TableProps) {
  const { field } = readPath(ctx, path)
  const isRoot = path.length === 1

  const { type } = field

  let body: ReactNode

  if (type === 'record') {
    body = <Record ctx={ctx} path={path} />
  } else if (type === 'object') {
    body = <Object ctx={ctx} path={path} />
  }

  if (!body) {
    body = (
      <Cell>
        <Field ctx={ctx} path={path} />
      </Cell>
    )
  }

  const parentType = !isRoot && readPath(ctx, path.slice(0, -1)).field?.type

  const nestedObjectRecord =
    parentType === 'object' &&
    readPath(ctx, path.slice(0, -2)).field?.type === 'record'

  return isRoot || parentType === 'record' ? (
    body
  ) : (
    <Stack
      align="stretch"
      justify="start"
      style={{
        marginLeft: nestedObjectRecord ? -40 : 0,
        borderBottom: border(),
      }}
    >
      <Cell first={path.length < 3 || nestedObjectRecord} isKey>
        {field.title ?? path[path.length - 1]}
      </Cell>
      {body}
    </Stack>
  )
}
