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
import { Path, TableCtx } from './types.js'
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

const InfoBadge = ({ value }: { value: any }) => {
  if (typeof value === 'object') {
    return (
      <>
        <Text variant="bodyStrong">{value.name ?? value.title}</Text>
        <Badge
          prefix={
            <IconLink style={{ width: 16, height: 16, marginRight: 4 }} />
          }
        >
          {value.id}
        </Badge>
      </>
    )
  }

  return (
    <Badge
      prefix={<IconLink style={{ width: 16, height: 16, marginRight: 4 }} />}
    >
      {value}
    </Badge>
  )
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
  const marginTop = variant === 'small' ? 0 : -4
  const isLarge = variant === 'large'
  const isId = value && typeof value === 'string'
  const id = value && typeof value === 'object' ? value.id : value

  let hasFile = false
  let src: string
  let mimeType: BasedSchemaContentMediaType

  if (ctx.schema) {
    // go go go
  } else {
    if (field.allowedTypes?.includes('file')) {
      hasFile = true
    }
    if (typeof value === 'object' && value.src) {
      src = value.src
      hasFile = true
      if (value.mimeType) {
        mimeType = value.mimeType
      }
    }
  }

  const selectRef = React.useCallback(async () => {
    const result = await ctx.listeners.onSelectReference(
      path,
      value,
      field,
      ctx
    )
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

  if (hasFile) {
    const width = isLarge ? 248 : 32
    return (
      <Stack
        align={isLarge ? 'start' : 'center'}
        direction={isLarge ? 'column' : 'row'}
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
          }}
        >
          <Media src={src} variant="cover" type={mimeType} />
        </styled.div>
        <Button variant="icon-only" onClick={selectRef}>
          <Stack
            style={{ marginTop: isLarge ? 14 : 0 }}
            justify="start"
            gap={12}
          >
            {value ? (
              <InfoBadge value={value} />
            ) : (
              <SelectBadge field={field} />
            )}
          </Stack>
        </Button>
      </Stack>
    )
  }

  if (isId) {
    return (
      <Button variant="icon-only" onClick={selectRef}>
        <InfoBadge value={value} />
      </Button>
    )
  }

  return (
    <Button variant="icon-only" onClick={selectRef}>
      <SelectBadge field={field} />
    </Button>
  )
}
