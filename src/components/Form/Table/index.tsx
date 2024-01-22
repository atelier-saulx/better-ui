import React from 'react'
import { styled } from 'inlines'
import { BasedSchemaField } from '@based/schema'
import { Stack, border, color, Text } from '../../../index.js'
import { TableProps } from '../types.js'
import {
  readPath,
  readParentField,
  getKeyWidth,
  readParentType,
  getTitle,
} from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { Record } from './Record.js'
import { Object } from './Object.js'
import { Arrays } from './Arrays/index.js'

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
    return <Arrays ctx={ctx} path={path} />
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
      <Stack style={{ borderTop: border(), width: '100%' }}>
        <Body ctx={ctx} path={path} />
      </Stack>
    )
  }

  const parent = readParentField(ctx, path, 1)

  if (parent.type === 'record' || parent.type === 'array') {
    return <Body ctx={ctx} path={path} />
  }

  return (
    <Stack
      align="stretch"
      justify="start"
      style={{
        width: '100%',
      }}
    >
      <Title ctx={ctx} path={path} parent={parent} />
      <Body ctx={ctx} path={path} />
    </Stack>
  )
}
