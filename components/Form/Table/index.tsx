import React from 'react'
import { styled } from 'inlines'
import { BasedSchemaField } from '@based/schema'
import { Stack } from '../../Stack'
import { TableProps } from './types'
import {
  readPath,
  readParentField,
  getKeyWidth,
  readParentType,
  getTitle,
} from '../utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/colors'
import { Record } from './Record'
import { Object } from './Object'
import { Array } from './Array'
import { Text } from '../../Text'

export * from '../utils'

function Title({
  ctx,
  path,
  parent,
}: TableProps & { parent: BasedSchemaField }) {
  const { field } = readPath(ctx, path)
  const isNestedArray = readParentType(ctx, path, 3) === 'array'
  return (
    <Cell
      border
      isKey
      width={getKeyWidth(parent) + (isNestedArray ? 60 : 0)}
      style={{
        background: color('background', 'muted'),
        borderBottom: border(),
        paddingLeft: isNestedArray ? 60 : 20,
      }}
    >
      <styled.div style={{ marginBottom: 8, marginTop: 8 }}>
        {getTitle(path[path.length - 1], field)}
        {field.description ? (
          <Text style={{ marginTop: -2 }} color="secondary">
            {field.description}
          </Text>
        ) : null}
      </styled.div>
    </Cell>
  )
}

function Body({ ctx, path }: TableProps) {
  const {
    field: { type },
  } = readPath(ctx, path)
  if (type === 'record') {
    return <Record ctx={ctx} path={path} />
  }

  if (type === 'object') {
    return <Object ctx={ctx} path={path} />
  }

  if (type === 'array') {
    return <Array ctx={ctx} path={path} />
  }

  return (
    <Cell
      style={{
        borderBottom: border(),
      }}
    >
      <Field ctx={ctx} path={path} />
    </Cell>
  )
}

export function Table({ ctx, path }: TableProps) {
  if (path.length === 1) {
    return (
      <Stack style={{ borderTop: border() }}>
        <Body ctx={ctx} path={path} />
      </Stack>
    )
  }

  const parent = readParentField(ctx, path, 1)

  if (parent.type === 'record' || parent.type === 'array') {
    return <Body ctx={ctx} path={path} />
  }

  /*
   const paddingLeft =
            valuesField.type === 'array' &&
            valuesField.values.type === 'object' &&
            !useCols(valuesField.values)
              ? 20
              : 0
  */

  return (
    <Stack align="stretch" justify="start">
      <Title ctx={ctx} path={path} parent={parent} />
      <Body ctx={ctx} path={path} />
    </Stack>
  )
}
