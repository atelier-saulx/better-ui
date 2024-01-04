import * as React from 'react'
import { BasedSchemaFieldReferences } from '@based/schema'
import {
  Stack,
  Button,
  Text,
  color,
  IconClose,
  IconPlus,
  border,
  Media,
  borderRadius,
} from '../../index.js'
import { Path, TableCtx, Reference } from './types.js'
import { readPath } from './utils.js'
import { styled } from 'inlines'
import { Cell } from './Table/Cell.js'
import { ColStack } from './Table/ColStack.js'

const Info = ({ value }: { value: Reference }) => {
  if (typeof value === 'object') {
    const title = value.name ?? value.title
    if (title) {
      return (
        <>
          <Text variant="bodyStrong">{title}</Text>
          <Text>{value.id}</Text>
        </>
      )
    }
    return <Text>{value.id}</Text>
  }
  return <Text>{value}</Text>
}

const Image = ({ value }: { value: Reference }) => {
  if (typeof value !== 'object') {
    return null
  }

  if ('src' in value) {
    const width = 24
    return (
      <styled.div
        style={{
          width,
          margin: -4,
          height: width,
          overflow: 'hidden',
          backgroundColor: color('background', 'neutral'),
          borderRadius: 4,
        }}
      >
        <Media src={value.src} variant="cover" type={value.mimeType} />
      </styled.div>
    )
  }

  return null
}

const ReferenceTag = ({
  value,
  onRemove,
}: {
  value: Reference
  onRemove: () => void
}) => {
  return (
    <Stack
      gap={12}
      justify="start"
      style={{
        width: 'auto',
        padding: 2,
        color: color('content', 'secondary'),
        paddingLeft: 8,
        paddingRight: 8,
        border: border(),
        backgroundColor: color('background', 'muted'),
        borderRadius: borderRadius('tiny'),
      }}
    >
      <Image value={value} />
      <Info value={value} />
      <Button
        onClick={() => {
          onRemove()
        }}
        variant="icon-only"
      >
        <IconClose />
      </Button>
    </Stack>
  )
}

const RefList = ({
  value,
  onNew,
}: {
  value: Reference[]
  onNew: () => Promise<any>
}) => {
  const rows: React.ReactNode[] = []
  const cols: React.ReactNode[] = []

  const fields = new Set(['id'])

  for (const v of value) {
    if (typeof v === 'object') {
      const keys = Object.keys(v)
      for (const k of keys) {
        fields.add(k)
      }
    }
  }

  for (const key of fields.values()) {
    cols.push(
      <Cell border isKey key={key}>
        {key}
      </Cell>
    )
  }

  if (value) {
    for (let i = 0; i < value.length; i++) {
      const cells: React.ReactNode[] = []

      const v = typeof value === 'object' ? value[i] : { id: value[i] }

      for (const key of fields.values()) {
        cells.push(
          <Cell border key={key}>
            <styled.div
              style={{
                paddingLeft: 12,
                paddingRight: 12,
              }}
            >
              {key === 'src' ? <Image value={v} /> : v[key] ?? null}
            </styled.div>
          </Cell>
        )
      }
      rows.push(
        <ColStack
          key={i}
          style={{
            borderBottom: border(),
          }}
        >
          {cells}
        </ColStack>
      )
    }
  }

  return (
    <Stack
      justify="start"
      align="start"
      direction="column"
      style={{
        borderBottom: border(),
      }}
    >
      {cols.length ? (
        <ColStack
          style={{
            background: color('background', 'muted'),
            borderBottom: border(),
          }}
        >
          {cols}
        </ColStack>
      ) : null}
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

export function References({
  ctx,
  path,
  variant = 'large',
}: {
  ctx: TableCtx
  path: Path
  variant?: 'large' | 'small'
}) {
  const { value = [], field } = readPath<BasedSchemaFieldReferences>(ctx, path)

  const addNew = React.useCallback(async () => {
    const result = await ctx.listeners.onSelectReferences({
      path,
      value,
      field,
      ctx,
    })

    if (Array.isArray(result)) {
      ctx.listeners.onChangeHandler(ctx, path, [...value, ...result])
    }
  }, [])

  if (variant === 'large') {
    return <RefList value={value} onNew={addNew} />
  }

  return (
    <Stack direction="column" align="start">
      <Stack grid style={{ marginTop: 12 }} display={value.length}>
        {value.map((v: Reference, index: number) => {
          return (
            <ReferenceTag
              key={index}
              value={v}
              onRemove={() => {
                const nValue = [...value]
                nValue.splice(index, 1)
                ctx.listeners.onChangeHandler(ctx, path, nValue)
              }}
            />
          )
        })}
      </Stack>
      <Stack style={{ height: 52, width: 'auto' }}>
        <Button
          size="small"
          onClick={addNew}
          variant="icon-only"
          prefix={<IconPlus />}
        >
          Add
        </Button>
      </Stack>
    </Stack>
  )
}
