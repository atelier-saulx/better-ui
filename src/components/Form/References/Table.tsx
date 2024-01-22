import * as React from 'react'
import { styled } from 'inlines'
import {
  Stack,
  Button,
  Text,
  color,
  Badge,
  IconPlus,
  Media,
} from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'
import {
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
  display,
} from '@based/schema'
import { DragableRow } from '../Table/DragableRow.js'

const cellWidth = (key: string) => {
  if (key === 'id') {
    return 120
  }
}

const ImageTableStyle = (p: { children?: React.ReactNode }) => {
  return (
    <Cell
      border
      style={{
        width: 52,
        height: 48,
        paddingLeft: 8,
        paddingRight: 8,
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      {p.children ? (
        <styled.div
          style={{
            width: 36,
            height: 36,
            overflow: 'hidden',
            backgroundColor: color('background', 'neutral'),
            borderRadius: 4,
          }}
        >
          {p.children}
        </styled.div>
      ) : null}
    </Cell>
  )
}

const ImageTable = ({ value }: { value?: Reference }) => {
  if (typeof value === 'object' && 'src' in value) {
    return (
      <ImageTableStyle>
        <Media src={value.src} variant="cover" type={value.mimeType} />
      </ImageTableStyle>
    )
  }
  return <ImageTableStyle />
}

const parse = (key: string, value: string | number): string | number => {
  if (value === undefined || value === '') {
    return ''
  }
  if (
    typeof value === 'number' &&
    /(date)|(time)|(createdAt)|(lastUpdated)|(birthday)/i.test(key)
  ) {
    const formated = display(Number(value), {
      type: 'timestamp',
      display: 'human',
    })
    return String(formated)
  }
  return value
}

const CellContent = (p: { k: string; value: any }) => {
  if (p.k === 'src') {
    return <ImageTable value={p.value} />
  }
  const fieldValue = p.value[p.k]
  return (
    <Cell border key={p.k} width={cellWidth(p.k)}>
      <Stack
        justify={p.k === 'id' ? 'end' : 'start'}
        style={{
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        {p.k === 'id' ? (
          <Badge color="informative-muted">{fieldValue}</Badge>
        ) : (
          <Text singleLine style={{ maxWidth: 300 }}>
            {parse(p.k, fieldValue)}
          </Text>
        )}
      </Stack>
    </Cell>
  )
}

const FIELDS = ['id', 'src', 'name', 'title']

export const ReferencesTable = ({
  value,
  onNew,
  ctx,
  path,
  onRemove,
  field,
  onClickReference,
  changeIndex,
}: {
  field: BasedSchemaFieldReferences
  value: Reference[]
  onNew: () => Promise<any>
  onRemove: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  path: Path
  changeIndex: (fromIndex: number, toIndex: number) => void
}) => {
  const rows: React.ReactNode[] = []
  const cols: React.ReactNode[] = [,]
  const hasFields: Set<string> = new Set(['id'])

  for (const v of value) {
    if (typeof v === 'object') {
      for (const k in v) {
        if (typeof v[k] !== 'object') {
          hasFields.add(k)
        }
      }
    }
  }

  const fields: string[] = []

  if (
    hasFields.size < 3 ||
    (hasFields.size === 3 && hasFields.has('id') && hasFields.has('src'))
  ) {
    return (
      <>
        <styled.div style={{ marginTop: -24 }} />
        <References variant="small" ctx={ctx} path={path} />
      </>
    )
  }

  for (const key of FIELDS) {
    if (hasFields.has(key)) {
      hasFields.delete(key)
      fields.push(key)
    }
  }

  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }

  for (const key of hasFields.values()) {
    // choose certain fields over others.. make util
    fields.push(key)
    if (fields.length > 5) {
      break
    }
    // make this a bit better
    objectSchema.properties[key] = {
      type: 'string',
      contentMediaType: key === 'src' ? 'image/*' : null,
    }
  }

  if (field.sortable) {
    cols.unshift(<div style={{ minWidth: 28 }} key="_dicon" />)
  }

  for (const key of fields) {
    // objectSchema.properties[key] = { type: }

    if (key === 'src') {
      cols.push(<ImageTable key={key} />)
    } else {
      cols.push(
        <Cell border={key !== 'id'} isKey key={key} width={cellWidth(key)}>
          {humanizeString(key === 'id' ? '' : key)}
        </Cell>
      )
    }
  }

  if (value) {
    for (let i = 0; i < value.length; i++) {
      const v =
        typeof value[i] === 'object' ? value[i] : { id: value[i] as string }
      rows.push(
        <DragableRow
          draggable={field.sortable}
          changeIndex={changeIndex}
          value={v}
          index={i}
          key={i}
          cells={fields.map((k) => {
            return <CellContent key={k} k={k} value={v} />
          })}
          removeItem={onRemove}
          onClick={() => {
            onClickReference(v)
          }}
          field={objectSchema}
          ctx={ctx}
          path={path}
        />
      )
    }
  }

  return (
    <Stack justify="start" align="start" direction="column">
      <ColStack header>{cols}</ColStack>
      {rows}
      <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
        <Button
          onClick={onNew}
          size="small"
          variant="neutral-transparent"
          prefix={<IconPlus />}
        >
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
