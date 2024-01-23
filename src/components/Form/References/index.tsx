import * as React from 'react'
import { BasedSchemaFieldReferences } from '@based/schema'
import { Stack, Button, IconPlus } from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { readPath } from '../utils.js'
import { ReferencesTable } from './Table.js'
import { ReferenceTag } from './Tag.js'
import { ValueRef } from '../Table/Arrays/types.js'

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
  const valueRef = React.useRef<ValueRef>({ orderId: 0, value })
  valueRef.current.value = value

  const addNew = React.useCallback(async () => {
    const result = await ctx.listeners.onSelectReferences({
      path,
      value: valueRef.current.value,
      field,
      ctx,
    })

    if (Array.isArray(result)) {
      ctx.listeners.onChangeHandler(ctx, path, [
        ...valueRef.current.value,
        ...result,
      ])
    }
  }, [])

  const changeIndex = React.useCallback(
    (fromIndex: number, toIndex: number) => {
      valueRef.current.orderId++
      const n = [...valueRef.current.value]
      const target = n[fromIndex]
      n.splice(fromIndex, 1)
      n.splice(toIndex, 0, target)
      ctx.listeners.onChangeHandler(ctx, path, n)
    },
    [],
  )

  const removeItem = React.useCallback((index: number) => {
    const nValue = [...valueRef.current.value]
    nValue.splice(index, 1)
    ctx.listeners.onChangeHandler(ctx, path, nValue)
  }, [])

  const clickRef = React.useCallback((value) => {
    ctx.listeners.onClickReference({
      path,
      value,
      field,
      ctx,
    })
  }, [])

  if (variant === 'large') {
    return (
      // @ts-ignore
      <ReferencesTable
        field={field}
        onClickReference={clickRef}
        ctx={ctx}
        path={path}
        onRemove={removeItem}
        value={value}
        onNew={addNew}
        changeIndex={changeIndex}
      />
    )
  }

  return (
    <Stack
      direction="column"
      align="start"
      style={{
        width: '100%',
        // overflow: 'hidden',
      }}
    >
      <Stack grid style={{ marginTop: 12 }} display={value.length}>
        {value.map((v: Reference, index: number) => {
          return (
            <ReferenceTag
              index={index}
              changeIndex={changeIndex}
              draggable={field.sortable}
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
