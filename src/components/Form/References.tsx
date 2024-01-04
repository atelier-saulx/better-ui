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
  borderRadius,
} from '../../index.js'
import { Path, TableCtx, Reference } from './types.js'
import { readPath } from './utils.js'

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
  const marginTop = variant === 'small' ? 12 : 0

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

  return (
    <Stack direction="column" align="start">
      <Stack grid style={{ marginTop }} display={value.length}>
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
