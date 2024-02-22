import React from 'react'
import { TableCtx, Path } from '../../types.js'
import { BasedSchemaField, display } from '@based/schema'
import { styled } from 'inlines'
import { isId, isFile, isType, getContentMediaType } from '../../utils.js'
import {
  Text,
  Badge,
  color,
  BadgeId,
  Media,
  border,
  Stack,
  borderRadius,
} from '../../../../index.js'
import { Reference } from '../../Reference.js'

type ReadProps = {
  ctx: TableCtx
  path: Path
  field: BasedSchemaField
  value: any
}

const Value = (p: ReadProps) => {
  if (isType(p.field)) {
    return <Badge color="auto-muted">{p.value}</Badge>
  }

  if (isId(p.field)) {
    return <BadgeId id={p.value} />
  }

  if (isFile(p.field)) {
    return (
      <styled.div
        style={{
          width: 36,
          height: 36,
          overflow: 'hidden',
          backgroundColor: color('background', 'neutral'),
          borderRadius: 4,
        }}
      >
        <Media
          src={p.value}
          variant="cover"
          type={getContentMediaType(p.field)}
        />
      </styled.div>
    )
  }

  if (
    (p.field.type === 'string' || p.field.type === 'text') &&
    p.field.format === 'rgbColor'
  ) {
    return (
      <Stack justify="start" gap={16}>
        <styled.div
          style={{
            flexShrink: 0,
            flexGrow: 0,
            height: 24,
            border: border(),
            width: 24,
            borderRadius: borderRadius('tiny'),
            backgroundColor: p.value ?? color('background', 'muted'),
          }}
        />
        <Text variant="caption">{p.value}</Text>
      </Stack>
    )
  }

  if (p.field.type === 'reference') {
    return <Reference readOnly variant="small" ctx={p.ctx} path={p.path} />
  }

  if (typeof p.value === 'object') {
    return '-'
  }

  return <Text singleLine>{display(p.value, p.field) ?? ''}</Text>
}

export function ReadOnlyField(p: ReadProps) {
  return (
    <styled.div
      style={{
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <Value {...p} />
    </styled.div>
  )
}
