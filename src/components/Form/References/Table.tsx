import * as React from 'react'
import { styled } from 'inlines'
import {
  Stack,
  Button,
  Text,
  color,
  Badge,
  IconPlus,
  border,
  Media,
} from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'

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
            {fieldValue}
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
  onClickReference,
}: {
  value: Reference[]
  onNew: () => Promise<any>
  onRemove: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  path: Path
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

  for (const key of hasFields.values()) {
    fields.push(key)
    if (fields.length >= 6) {
      break
    }
  }

  for (const key of fields) {
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
      const v = typeof value[i] === 'object' ? value[i] : { id: value[i] }
      rows.push(
        <ColStack
          onClick={() => onClickReference(value[i])}
          key={i}
          onRemove={() => {
            onRemove(i)
          }}
          style={{
            borderBottom: border(),
          }}
        >
          {fields.map((k) => {
            return <CellContent key={k} k={k} value={v} />
          })}
        </ColStack>
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
