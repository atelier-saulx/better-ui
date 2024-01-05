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
    const width = 32
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
  onClickReference,
}: {
  value: Reference
  onRemove: () => void
  onClickReference: (ref: Reference) => void
}) => {
  return (
    <Stack
      gap={12}
      justify="start"
      style={{
        height: 40,
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
      onClick={() => {
        onClickReference(value)
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

const RefList = ({
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
          {key === 'id' ? '' : key}
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
          style={{
            borderBottom: border(),
            '& >:nth-last-child(2)': {
              borderRight: '0px solid transparent !important',
            },
            '& >:nth-last-child(1)': {
              opacity: 0,
              transition: 'opacity 0.1s',
            },

            '&:hover': {
              backgroundColor: `${color('background', 'muted')} !important`,
              '& >:nth-last-child(1)': {
                opacity: 1,
              },
            },
          }}
        >
          {fields.map((k) => {
            return <CellContent key={k} k={k} value={v} />
          })}
          <Button
            onClick={() => {
              onRemove(i)
            }}
            variant="icon-only"
          >
            <IconClose style={{ marginRight: 8, marginLeft: 8 }} />
          </Button>
        </ColStack>
      )
    }
  }

  return (
    <Stack justify="start" align="start" direction="column">
      <ColStack
        style={{
          background: color('background', 'muted'),
          borderBottom: border(),
          '& >:nth-last-child(2)': {
            borderRight: '0px solid transparent !important',
          },
        }}
      >
        {cols}
        <Button
          onClick={() => {}}
          style={{
            opacity: 0,
          }}
          variant="icon-only"
        >
          <IconClose style={{ marginRight: 8, marginLeft: 8 }} />
        </Button>
      </ColStack>
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

  const removeItem = (index: number) => {
    const nValue = [...value]
    nValue.splice(index, 1)
    ctx.listeners.onChangeHandler(ctx, path, nValue)
  }

  const clickRef = (value) => {
    ctx.listeners.onClickReference({
      path,
      value,
      field,
      ctx,
    })
  }

  if (variant === 'large') {
    return (
      <RefList
        onClickReference={clickRef}
        ctx={ctx}
        path={path}
        onRemove={removeItem}
        value={value}
        onNew={addNew}
      />
    )
  }

  return (
    <Stack direction="column" align="start">
      <Stack grid style={{ marginTop: 12 }} display={value.length}>
        {value.map((v: Reference, index: number) => {
          return (
            <ReferenceTag
              onClickReference={clickRef}
              key={index}
              value={v}
              onRemove={() => {
                removeItem(index)
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
