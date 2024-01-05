import * as React from 'react'
import { BasedSchemaFieldReferences } from '@based/schema'
import { styled } from 'inlines'
import {
  Stack,
  Button,
  Text,
  color,
  IconClose,
  Badge,
  IconPlus,
  border,
  Media,
  borderRadius,
} from '../../index.js'
import { Path, TableCtx, Reference } from './types.js'
import { readPath } from './utils.js'
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
          height: width,
          overflow: 'hidden',
          backgroundColor: color('background', 'neutral'),
          borderRadius: 4,
          marginLeft: -4,
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
        paddingTop: 2,
        paddingBottom: 2,
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
        width: 48,
        height: 48,
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
            marginLeft: 4,
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
      <styled.div
        style={{
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        {p.k === 'id' ? (
          <Badge noCheckedIcon copyValue={fieldValue} color="informative-muted">
            {fieldValue}
          </Badge>
        ) : (
          fieldValue ?? null
        )}
      </styled.div>
    </Cell>
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
  const cols: React.ReactNode[] = [,]

  let hasSrc = false
  let hasName = false
  let hasTitle = false

  for (const v of value) {
    if (typeof v === 'object') {
      if ('src' in v) {
        hasSrc = true
      }
      if (!hasTitle && 'name' in v) {
        hasName = true
      }
      if ('title' in v) {
        hasTitle = true
        hasName = false
      }
    }
  }

  const fields: string[] = ['id']

  if (hasSrc) {
    fields.unshift('src')
  }

  if (hasName) {
    fields.push('name')
  }

  if (hasTitle) {
    fields.push('title')
  }

  for (const key of fields) {
    if (key === 'src') {
      cols.push(<ImageTable />)
    } else {
      cols.push(
        <Cell border isKey key={key} width={cellWidth(key)}>
          {key}
        </Cell>
      )
    }
  }

  if (value) {
    for (let i = 0; i < value.length; i++) {
      const v = typeof value === 'object' ? value[i] : { id: value[i] }
      rows.push(
        <ColStack
          key={i}
          style={{
            borderBottom: border(),
          }}
        >
          {fields.map((k) => (
            <CellContent key={k} k={k} value={v} />
          ))}
        </ColStack>
      )
    }
  }

  return (
    <Stack justify="start" align="start" direction="column">
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
