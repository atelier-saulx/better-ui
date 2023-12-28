import * as React from 'react'
import { BasedSchemaFieldReference } from '@based/schema'
import {
  Stack,
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

  let hasFile = false
  let isId = value && typeof value === 'string'
  let src: string

  const marginTop = variant === 'small' ? 0 : -4

  const isLarge = variant === 'large'

  const selectText = field.allowedTypes ? (
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
  )

  if (ctx.schema) {
    // go go go
  } else {
    if (field.allowedTypes?.includes('file')) {
      hasFile = true
      // lets go its file
      // other wise find it in ctx
    }
    if (typeof value === 'object' && value.src) {
      src = value.src
      hasFile = true
      // go go go
    }
  }

  if (hasFile) {
    const width = isLarge ? 248 : 32

    return (
      <Stack
        align={isLarge ? 'start' : 'center'}
        direction={isLarge ? 'column' : 'row'}
        style={{
          marginTop,
        }}
        onClick={() => {
          // yes
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
          <Media src={src} variant="cover" />
        </styled.div>
        <Stack
          style={{ marginTop: isLarge ? 14 : 0 }}
          justify="start"
          gap={12}
          onClick={() => {}}
        >
          <Text variant="bodyStrong">{value.name ?? value.title}</Text>
          <Badge
            prefix={
              <IconLink style={{ width: 16, height: 16, marginRight: 4 }} />
            }
          >
            {value.id}
          </Badge>
        </Stack>
      </Stack>
    )
  }

  if (isId) {
    return (
      <Stack
        justify="start"
        gap={12}
        style={{
          marginTop,
        }}
        onClick={() => {
          // yes
        }}
      >
        <Badge
          prefix={
            <IconLink style={{ width: 16, height: 16, marginRight: 4 }} />
          }
        >
          {value}
        </Badge>
        {/* <IconSearch /> */}
      </Stack>
    )
  }

  return (
    <Stack
      onClick={() => {
        // yes
      }}
    >
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
        {selectText}
      </Badge>
    </Stack>
  )
}
