import React from 'react'
import { TableCtx, Path } from '../../types.js'
import { BasedSchemaField, display } from '@based/schema'
import { styled } from 'inlines'
import { isId, isFile, getContentMediaType } from '../../utils.js'
import { Text, Badge, color, Media } from '../../../../index.js'

type ReadProps = {
  ctx: TableCtx
  path: Path
  field: BasedSchemaField
  value: any
}

const Value = (p: ReadProps) => {
  if (isId(p.field)) {
    return <Badge color="informative-muted">{p.value}</Badge>
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
