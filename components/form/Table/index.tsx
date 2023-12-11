import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableProps } from './types'
import { readPath, readType } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border } from '../../../utils/vars'
import { Record } from './Record'
import { Object } from './Object'
import { Array } from './Array'

export * from './utils'

export function Table({ ctx, path }: TableProps) {
  const { field } = readPath(ctx, path)
  const { type } = field

  const isRoot = path.length === 1

  let body: ReactNode

  if (type === 'record') {
    body = <Record ctx={ctx} path={path} />
  } else if (type === 'object') {
    body = <Object ctx={ctx} path={path} />
  } else if (type === 'array') {
    body = <Array ctx={ctx} path={path} />
  }

  if (!body) {
    body = (
      <Cell>
        <Field ctx={ctx} path={path} />
      </Cell>
    )
  }

  // FIXME: for borders... still not perfect
  const parentType = !isRoot && readType(ctx, path, 1)
  const ancestorType = parentType === 'object' && readType(ctx, path, 2)

  return isRoot || parentType === 'record' || parentType === 'array' ? (
    body
  ) : (
    <Stack
      align="stretch"
      justify="start"
      style={{
        // marginLeft:
        //   ancestorType === 'record' || ancestorType === 'array' ? -40 : 0,
        borderBottom: border(),
      }}
    >
      <Cell
        // first={
        //   path.length < 3 ||
        //   ancestorType === 'record' ||
        //   ancestorType === 'array' ||
        //   parentType === 'array'
        // }
        border
        isKey
        objectKey
      >
        {field.title ?? path[path.length - 1]}
      </Cell>
      {body}
    </Stack>
  )
}
