import * as React from 'react'
import {
  BasedSchemaField,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
  BasedSchemaPartial,
} from '@based/schema'
import { TableCtx, TableSort } from '../Form/types.js'
import { readPath } from '../Form/utils.js'
import { ReferencesTable } from '../Form/References/Table.js'
import { ValueRef } from '../Form/Table/Arrays/types.js'
import { useUpdate, Pagination, ScrollArea } from '../../index.js'
import { Style } from 'inlines'

type Changes = {
  updated: any[] // rows that changed
  removed: any[]
  added: any[]
}

export const Table = (p: {
  pagination?: Pagination | true
  sort?: TableSort | true
  schema?: BasedSchemaPartial
  field?: BasedSchemaFieldObject & {
    properties: {
      [name: string]: BasedSchemaField & {
        width?: number | string
        sticky?: boolean
      }
    }
  }
  showAllCols?: boolean
  style?: Style
  isLoading?: boolean
  selected?: Set<string>
  onSelect?: (select: any, all?: boolean) => void
  values?: any[]
  sortable?: boolean // maybe rename to orderable (everywhere)
  onClick?: (data: any, index: number | string) => void
  isBlock?: boolean
  editableRef?: {
    onChange: (changes: Changes) => void
    clear: () => void
    changes: Changes
  }
}) => {
  if (p.editableRef) {
    p.editableRef.clear ??= () => {}
  }

  const update = useUpdate()
  const path = ['field']
  const ctx: TableCtx = {
    fields: {
      field: { type: 'references', sortable: p.sortable },
    },
    // @ts-ignore
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

  const sortRef = React.useRef<TableSort>(
    p.sort === true
      ? {
          exclude: new Set(['src']),
          onSort: (key, dir, sort) => {
            sort.sorted = { key, dir }
            valueRef.current.value.sort((a, b) => {
              return (
                (a[key] > b[key] ? -1 : a[key] === b[key] ? 0 : 1) *
                (dir === 'asc' ? -1 : 1)
              )
            })
            update()
          },
        }
      : p.sort,
  )

  const table = (
    <ReferencesTable
      style={p.style}
      sortByFields={sortRef.current}
      field={field}
      fieldSchema={p.field}
      onClickReference={clickRef}
      ctx={ctx}
      path={path}
      selected={p.selected}
      onSelect={p.onSelect}
      valueRef={valueRef.current}
      changeIndex={changeIndex}
      isLoading={p.isLoading}
      showAllCols={p.showAllCols}
      alwaysUseCols
      isBlock={p.isBlock}
      // @ts-ignore
      onRemove={p.editable ? removeItem : undefined}
      pagination={
        p.pagination === true
          ? {
              type: 'scroll',
              total: valueRef.current.value.length,
            }
          : p.pagination
      }
    />
  )

  if (p.showAllCols) {
    return <ScrollArea>{table}</ScrollArea>
  }

  return table
}
