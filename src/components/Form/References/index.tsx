import * as React from 'react'
import { BasedSchemaFieldReferences } from '@based/schema'
import { Stack, Button, IconPlus } from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { readPath } from '../utils.js'
import { ReferencesTable } from './Table.js'
import { ReferenceTag } from './Tag.js'

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
      <ReferencesTable
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
