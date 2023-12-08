import React, { ReactNode } from 'react'
import { Stack } from '../../layout'
import { TableCtx, Path } from './types'
import { readPath, useCols } from './utils'
import { Cell } from './Cell'
import { Field } from './Field'
import { border, color } from '../../../utils/vars'
import { StringInput } from './StringInput'
import { Button } from '../../button'
import { styled } from 'inlines'
import { Plus } from '../../icons'

export function Table({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { field, value } = readPath(ctx, path)
  const isRoot = path.length === 1
  const { type } = field

  let body: ReactNode

  if (type === 'record') {
    const valuesField = field.values
    if (valuesField.type === 'object') {
      const cols = useCols(valuesField)
      if (cols) {
        const rows: ReactNode[] = []
        const cols: ReactNode[] = [
          <Cell first isKey key={'key'}>
            key
          </Cell>,
        ]
        for (const key in valuesField.properties) {
          cols.push(
            <Cell key={key}>{valuesField.properties[key].title ?? key}</Cell>
          )
        }
        if (value) {
          for (const key in value) {
            const cells: ReactNode[] = [
              <Cell first isKey key={'key'}>
                <StringInput value={key} />
              </Cell>,
            ]
            for (const k in value[key]) {
              cells.push(
                <Cell>
                  <Field ctx={ctx} path={[...path, key, k]} />
                </Cell>
              )
            }
            rows.push(
              <Stack
                style={{
                  borderBottom: border(),
                }}
                justify="start"
              >
                {cells}
              </Stack>
            )
          }
        }

        body = (
          <Stack
            justify="start"
            align="start"
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
              {cols}
            </Stack>
            {rows}
            <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
              <Button
                size="small"
                variant="neutral-transparent"
                prefix={<Plus />}
              >
                Add
              </Button>
            </styled.div>
          </Stack>
        )
      } else {
        // bla
      }
    } else if (valuesField.type === 'string') {
      const rows: ReactNode[] = []
      const cols: ReactNode[] = [
        <Cell first isKey key={'key'}>
          key
        </Cell>,
        <Cell first isKey key={'value'}>
          value
        </Cell>,
      ]
      if (value) {
        for (const key in value) {
          rows.push(
            <Stack
              style={{
                borderBottom: border(),
              }}
              justify="start"
            >
              <Cell first isKey key={'key'}>
                <StringInput value={key} />
              </Cell>
              <Cell>
                <Field ctx={ctx} path={[...path, key]} />
              </Cell>
            </Stack>
          )
        }
      }
      body = (
        <Stack
          justify="start"
          align="start"
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
            {cols}
          </Stack>
          {rows}
          <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
            <Button
              size="small"
              variant="neutral-transparent"
              prefix={<Plus />}
            >
              Add
            </Button>
          </styled.div>
        </Stack>
      )
    }
  } else if (type === 'object') {
    const cols = useCols(field)
    if (cols) {
      const cells: ReactNode[] = []
      const cols: ReactNode[] = []
      let first = true
      for (const key in field.properties) {
        cols.push(
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
            {cols}
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
        rows.push(<Table key={key} ctx={ctx} path={[...path, key]} />)
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
