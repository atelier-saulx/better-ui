import * as React from 'react'
import {
  AllowedTypes,
  BasedSchema,
  BasedSchemaContentMediaType,
  BasedSchemaFieldReference,
  BasedSchemaPartial,
} from '@based/schema'
import {
  Stack,
  Button,
  border,
  Badge,
  IconLink,
  Media,
  Text,
  color,
  ButtonProps,
  IconSearch,
  IconClose,
} from '../../index.js'
import { Path, Reference, TableCtx } from './types.js'
import { getIdentifierFieldValue, readPath } from './utils.js'
import { styled } from 'inlines'

const Select = (p: {
  field: BasedSchemaFieldReference
  onClick: ButtonProps['onClick']
  badge?: boolean
}) => {
  const icon = (
    <IconSearch
      style={{
        width: 16,
        height: 16,
        marginRight: 4,
      }}
    />
  )
  const body = (
    <Stack gap={2}>
      {p.field.allowedTypes ? (
        <>
          Select{' '}
          {p.field.allowedTypes.map((v, i) => {
            const type = typeof v === 'object' ? v.type : v
            return (
              <Text key={i} variant="body-bold" color="inherit">
                {type}
              </Text>
            )
          })}
        </>
      ) : (
        'Select item'
      )}
    </Stack>
  )
  if (p.badge) {
    return (
      <Button variant="icon-only" onClick={p.onClick}>
        <Badge color="primary-muted" prefix={icon}>
          {body}
        </Badge>
      </Button>
    )
  }
  return (
    <Button
      size="small"
      variant="neutral-transparent"
      onClick={p.onClick}
      prefix={icon}
    >
      {body}
    </Button>
  )
}

const Id = (p: { id: string; onClick: () => void }) => {
  return (
    <Button onClick={p.onClick} variant="icon-only">
      <Badge
        color="primary-muted"
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
        <Text
          singleLine
          style={{
            marginRight: 12,
            flexGrow: 1,
            width: '100%',
          }}
          variant="body-bold"
        >
          {getIdentifierFieldValue(p.value) ?? ''}
        </Text>
      </>
    )
  }
  return <Id id={p.value} onClick={p.onClick} />
}

export const getImg = (
  value: any,
  schema: BasedSchemaPartial,
  field: BasedSchemaFieldReference,
  types?: AllowedTypes,
) => {
  if (!types && field.allowedTypes) {
    types = field.allowedTypes
  }
  if (value && typeof value === 'object' && (value.id || value.type)) {
    const type =
      value.type ?? schema.prefixToTypeMapping?.[value.id.slice(0, 2)]
    if (type) {
      types = [type]
    }
  }

  if (types) {
    for (const type of types) {
      if (typeof type === 'string') {
        const t = schema?.types?.[type]
        if (t) {
          for (const key in t.fields) {
            const f = t.fields[key]
            if (f.type === 'string' && f.contentMediaType) {
              if (value[key]) {
                return value[key]
              }
            } else if (f.type === 'reference') {
              if (value[key]) {
                // @ts-ignore
                const src = getImg(value[key], ctx, f)
                if (src) {
                  return src
                }
              }
            }
          }
          if ('src' in value) {
            return value.src
          }
        }
      }
    }
  }
}

export const Image = (p: {
  ctx: TableCtx
  value: Reference
  field: BasedSchemaFieldReference
  isLarge?: boolean
}) => {
  let hasFile = false
  let src: string
  let mimeType: BasedSchemaContentMediaType

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

  if (
    typeof p.value === 'object' &&
    !src &&
    p.ctx.schema &&
    p.field.allowedTypes
  ) {
    src = getImg(p.value, p.ctx.schema, p.field)
    if (src) {
      hasFile = true
    }
  }
  if (hasFile) {
    const width = p.isLarge ? 248 : 32
    return (
      <Stack
        align={p.isLarge ? 'start' : 'center'}
        direction={p.isLarge ? 'column' : 'row'}
        justify="start"
        fitContent
        style={{
          marginTop: p.isLarge ? 0 : -4,
        }}
      >
        <styled.div
          style={{
            width,
            height: width,
            overflow: 'hidden',
            backgroundColor: color('background', 'neutral'),
            borderRadius: 4,
            border: border(),
            marginBottom: p.isLarge ? 14 : 0,
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

export function ReferenceEditable({
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
    if (isLarge) {
      return (
        <Stack justify="start" direction="column">
          <Image ctx={ctx} isLarge field={field} value={value} />
          <Stack justify="end" gap={8} fitContent>
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
            <Select badge field={field} onClick={selectRef} />
            <Button
              onClick={() => {
                ctx.listeners.onChangeHandler(ctx, path, null)
              }}
              variant="icon-only"
            >
              <IconClose />
            </Button>
          </Stack>
        </Stack>
      )
    }

    return (
      <Stack justify="start">
        <Image ctx={ctx} field={field} value={value} />
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
        <Stack justify="end" gap={8} style={{ flexGrow: 0 }}>
          <Select field={field} onClick={selectRef} />
          <Button
            onClick={() => {
              ctx.listeners.onChangeHandler(ctx, path, null)
            }}
            variant="icon-only"
          >
            <IconClose />
          </Button>
        </Stack>
      </Stack>
    )
  }

  return <Select field={field} onClick={selectRef} />
}

export function ReferenceReadOnly(p: {
  ctx: TableCtx
  path: Path
  variant?: 'large' | 'small'
}) {
  const { value, field } = readPath<BasedSchemaFieldReference>(p.ctx, p.path)
  const isLarge = p.variant === 'large'
  const id = value && typeof value === 'object' ? value.id : value
  if (id) {
    if (isLarge) {
      return (
        <Stack justify="start" direction="column">
          <Image ctx={p.ctx} isLarge field={field} value={value} />
          <Stack justify="end" gap={8} fitContent>
            <Info value={value} onClick={() => {}} />
          </Stack>
        </Stack>
      )
    }
    return (
      <Stack justify="start">
        <Image ctx={p.ctx} field={field} value={value} />
        <Info onClick={() => {}} value={value} />
      </Stack>
    )
  }
  return <Text>-</Text>
}

export function Reference({
  readOnly,
  ...p
}: {
  ctx: TableCtx
  path: Path
  variant?: 'large' | 'small'
  readOnly?: boolean
}) {
  if (readOnly) {
    return <ReferenceReadOnly {...p} />
  }
  return <ReferenceEditable {...p} />
}
