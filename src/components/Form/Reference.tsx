import * as React from 'react'
import {
  BasedSchemaContentMediaType,
  BasedSchemaFieldReference,
} from '@based/schema'
import {
  Stack,
  Button,
  Badge,
  IconLink,
  Media,
  Text,
  color,
  IconSearch,
} from '../../index.js'
import { Path, Reference, TableCtx } from './types.js'
import { readPath } from './utils.js'
import { styled } from 'inlines'

const SelectBadge = ({ field }: { field: BasedSchemaFieldReference }) => {
  return (
    <Badge
      color="informative-muted"
      prefix={
        <IconSearch
          style={{
            width: 16,
            height: 16,
            marginRight: 4,
          }}
        />
      }
    >
      {field.allowedTypes ? (
        <>
          Select{' '}
          {field.allowedTypes.map((v, i) => {
            const type = typeof v === 'object' ? v.type : v
            return (
              <Text color="inherit" key={i} variant="bodyStrong">
                {type}
              </Text>
            )
          })}
        </>
      ) : (
        'Select item'
      )}
    </Badge>
  )
}

const Id = (p: { id: string; onClick: () => void }) => {
  return (
    <Button onClick={p.onClick} variant="icon-only">
      <Badge
        prefix={<IconLink style={{ width: 16, height: 16, marginRight: 4 }} />}
      >
        {p.id}
      </Badge>
    </Button>
  )
}

const Info = (p: { value: Reference; onClick: () => void }) => {
  if (typeof p.value === 'object') {
    return (
      <>
        <Text style={{ marginRight: 12 }} variant="bodyStrong">
          {p.value.name ?? p.value.title}
        </Text>
        <Id id={p.value.id} onClick={p.onClick} />
      </>
    )
  }
  return <Id id={p.value} onClick={p.onClick} />
}

export const Image = (p: {
  ctx: TableCtx
  value: Reference
  field: BasedSchemaFieldReference
  variant: 'large' | 'small'
}) => {
  let hasFile = false
  let src: string
  let mimeType: BasedSchemaContentMediaType

  const marginTop = p.variant === 'small' ? 0 : -4
  const isLarge = p.variant === 'large'

  if (p.ctx.schema) {
    // go go go
  } else {
    if (p.field.allowedTypes?.includes('file')) {
      hasFile = true
    }
    if (typeof p.value === 'object' && p.value.src) {
      src = p.value.src
      hasFile = true
      if (p.value.mimeType) {
        mimeType = p.value.mimeType
      }
    }
  }

  if (hasFile) {
    const width = isLarge ? 248 : 32
    return (
      <Stack
        align={isLarge ? 'start' : 'center'}
        direction={isLarge ? 'column' : 'row'}
        justify="start"
        style={{
          marginTop,
        }}
      >
        <styled.div
          style={{
            width,
            height: width,
            overflow: 'hidden',
            backgroundColor: color('background', 'neutral'),
            borderRadius: 4,
            marginBottom: isLarge ? 14 : 0,
            marginRight: 10,
          }}
        >
          <Media src={src} variant="cover" type={mimeType} />
        </styled.div>
      </Stack>
    )
  }

  return null
}

export function Reference({
  ctx,
  path,
  variant = 'large',
}: {
  ctx: TableCtx
  path: Path
  variant?: 'large' | 'small'
}) {
  const { value, field } = readPath<BasedSchemaFieldReference>(ctx, path)
  const isLarge = variant === 'large'
  const id = value && typeof value === 'object' ? value.id : value

  const selectRef = React.useCallback(async () => {
    const result = await ctx.listeners.onSelectReference({
      path,
      value,
      field,
      ctx,
    })
    if (result === undefined) {
      return
    }
    let newId: string | void
    if (typeof result === 'object') {
      newId = result.id
    } else {
      newId = result
    }
    if (newId !== id) {
      ctx.listeners.onChangeHandler(ctx, path, result)
    }
  }, [id])

  if (id) {
    return (
      <Stack direction={isLarge ? 'column' : 'row'}>
        <Image ctx={ctx} variant={variant} field={field} value={value} />
        <Stack justify={isLarge ? 'start' : 'between'}>
          <Info
            value={value}
            onClick={() => {
              ctx.listeners.onClickReference({
                path,
                value,
                field,
                ctx,
              })
            }}
          />
          <Button
            style={{ marginLeft: 8 }}
            variant="icon-only"
            onClick={selectRef}
          >
            <SelectBadge field={field} />
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Button variant="icon-only" onClick={selectRef}>
      <SelectBadge field={field} />
    </Button>
  )
}
