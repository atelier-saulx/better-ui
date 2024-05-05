import React, { ReactNode, useRef } from 'react'
import { TableCtx, Path } from '../../types.js'
import { BasedSchemaField, display } from '@based/schema'
import { styled, keyframes } from 'inlines'
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

const animation = keyframes({
  '0%': {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  '30%': {
    backgroundColor: color('background', 'primary2'),
  },
  '100%': {
    backgroundColor: color('background', 'primary2'),
  },
})

export type FieldRenderFunction = ({
  path,
  field,
  value,
}: {
  path: Path
  field: { render?: FieldRenderFunction } & BasedSchemaField
  value: any
}) => React.ReactNode

type ReadProps = {
  ctx: TableCtx
  path: Path
  field: { render?: FieldRenderFunction } & BasedSchemaField
  value: any
}

function formatNumberWithCommas(num: number): string {
  const numString: string = num.toString()
  const parts: string[] = []

  for (let i = numString.length - 1, j = 0; i >= 0; i--, j++) {
    if (j > 0 && j % 3 === 0) {
      parts.unshift(',')
    }
    parts.unshift(numString[i])
  }

  return parts.join('')
}

function NumberDisplay({ p }: { p: ReadProps }) {
  const ref = useRef()
  const x = p.value ?? 0

  let nval = p.value !== ref.current && ref.current
  // @ts-ignore
  ref.current = p.value

  return (
    <Text
      variant="caption"
      color="inherit"
      weight="normal"
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'end',
        position: 'relative',
        alignItems: 'center',
        color: 'black',
        fontFamily: 'Monaco',
        animationTimingFunction: 'linear',
        animationIterationCount: 1,
        animationDuration: '1s',
        animationName: nval ? animation : null,
      }}
      singleLine
    >
      {formatNumberWithCommas(x)}
    </Text>
  )
}

const Value = (p: ReadProps) => {
  if (typeof p.field.render === 'function') {
    const { path, field, value } = p
    return p.field.render({ path, field, value })
  }

  if (p.field.type === 'number') {
    // @ts-ignore
    if (p.field.display === 'number') {
      return <NumberDisplay p={p} />
    }

    return <Text singleLine>{display(p.value, p.field) ?? ''}</Text>
  }

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
