import * as React from 'react'
import { Spinner, Stack, Pagination, Virtualized } from '../../../index.js'
import { Path, TableCtx, Reference, ColSizes } from '../types.js'
import {
  BasedSchemaFieldArray,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { ObjectCollsRows } from '../Table/Arrays/ObjectCollumnRows.js'
import { ValueRef } from '../Table/Arrays/types.js'

type TableBodyProps = {
  pagination: Pagination
  onClickReference: (ref: Reference) => void
  field: BasedSchemaFieldReferences
  valueRef: ValueRef
  ctx: TableCtx
  changeIndex: (fromIndex: number, toIndex: number) => void
  onRemove: (index: number) => void
  path: Path
  onSelect?: (select: any, all: boolean) => void
  selected?: Set<string>
  colFields: ColSizes
  nField: BasedSchemaFieldArray
  isBlock?: boolean
  isLoading?: boolean
}

export const TableVirtualized = (p: TableBodyProps) => {
  const ref = React.useRef<{
    ctx?: TableCtx
  }>({})

  return (
    <Virtualized
      values={p.valueRef.value}
      pagination={p.pagination}
      isLoading={p.isLoading}
      isBlock={p.isBlock}
      itemSize={48}
      onSelectValues={(v) => {
        // This is nessecary for nested fields to select the correct values..
        // legacy thing form the form before we started with complex stuff like virtual...
        ref.current.ctx = {
          ...p.ctx,
          valueOverrides: {
            [p.path.join('.')]: v,
          },
        }
        return v
      }}
    >
      {({ loading, values, isLoading }) => {
        return (
          <>
            <ObjectCollsRows
              selected={p.selected}
              onSelect={p.onSelect}
              onClickRow={(v: any) => p.onClickReference(v)}
              draggable={p.field.sortable}
              value={{
                value: values,
                orderId: p.valueRef.orderId,
              }}
              isLoading={isLoading}
              ctx={ref.current.ctx}
              changeIndex={p.changeIndex}
              removeItem={p.onRemove}
              path={p.path}
              colFields={p.colFields}
              field={p.nField}
            />
            {loading ? (
              <Stack
                justify="center"
                align="center"
                style={{
                  height: 48,
                }}
              >
                <Spinner size={24} color="secondary" />
              </Stack>
            ) : null}
          </>
        )
      }}
    </Virtualized>
  )
}

export const TableBody = (p: TableBodyProps) => {
  if (p.pagination && p.pagination.type === 'scroll') {
    return <TableVirtualized {...p} />
  }

  return (
    <ObjectCollsRows
      onSelect={p.onSelect}
      selected={p.selected}
      onClickRow={(v: any) => p.onClickReference(v)}
      draggable={p.field.sortable}
      value={p.valueRef}
      ctx={p.ctx}
      changeIndex={p.changeIndex}
      removeItem={p.onRemove}
      path={p.path}
      colFields={p.colFields}
      field={p.nField}
    />
  )
}
