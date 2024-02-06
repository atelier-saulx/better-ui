import * as React from 'react'
import {
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
  BasedSchemaPartial,
} from '@based/schema'
import { TableCtx } from '../Form/types.js'
import { readPath } from '../Form/utils.js'
import { ReferencesTable } from '../Form/References/Table.js'
import { ValueRef } from '../Form/Table/Arrays/types.js'
import { FormProps } from '../Form/index.js'

export const Table = (p: {
  schema?: BasedSchemaPartial
  editable?: boolean
  field?: BasedSchemaFieldObject
  values?: any[]
  sortable?: boolean
  onChange?: FormProps['onChange']
  onClick?: (data: any, index: number | string) => void
  onScroll?: () => void
}) => {
  const path = ['field']

  const ctx: TableCtx = {
    fields: {
      field: { type: 'references', sortable: p.sortable },
    },
    editableReferences: p.editable,
    schema: p.schema,
    variant: 'small',
    values: {
      field: p.values || [],
    },
    listeners: {
      getDragTarget: () => undefined,
      setDragTarget: (t) => {
        return t
      },
      onChangeHandler: (ctx, path, newValue, forceUpdate) => {
        console.log('change', path, newValue)
        // new version etc
        return false
      },
      onFileUpload: async (props, updateHandler) => {},
      onClickReference: (props) => {
        if (p.onClick) {
          p.onClick(props.value, props.path[props.path.length - 1])
        }
      },
      onSelectReference: (props) => {
        return undefined
      },
      onSelectReferences(props) {
        return undefined
      },
    },
  }

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

  return (
    <ReferencesTable
      field={field}
      onClickReference={clickRef}
      ctx={ctx}
      path={path}
      onScroll={p.onScroll} // add new as option will go on top if onScroll
      valueRef={valueRef.current}
      changeIndex={changeIndex}
      alwaysUseCols
      // onNew={p.editable ? addNew : undefined}
      onRemove={p.editable ? removeItem : undefined}
    />
  )
}
