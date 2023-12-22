import * as React from 'react'
import { BasedSchemaFieldReference } from '@based/schema'
import { Stack } from '../Stack'
import { Path, TableCtx } from './Table/types'
import { readPath } from './Table'
import { Badge } from '../Badge'
import { IconLink } from '../Icons'
import { Media } from '../Media'
import { Text } from '../Text'
import { styled } from 'inlines'
import { color } from '../../src/utils/colors'

export function Reference({ ctx, path }: { ctx: TableCtx; path: Path }) {
  const { value, field } = readPath<BasedSchemaFieldReference>(ctx, path)

  let hasFile = false
  let isId = value && typeof value === 'string'
  let src: string

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
    return (
      <>
        <styled.div
          style={{
            width: 248,
            height: 248,
            overflow: 'hidden',
            backgroundColor: color('background', 'neutral'),
            borderRadius: 4,
            marginTop: -4,
          }}
        >
          <Media src={src} variant="cover" />
        </styled.div>
        <Stack
          style={{ marginTop: 14 }}
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
      </>
    )
  }

  // add remove button

  if (isId) {
    return (
      <Stack
        justify="start"
        gap={12}
        style={{
          marginTop: -4,
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

  // selectReference OR action

  // if hasFile

  // if ()

  return <Stack>x</Stack>
}
