import * as React from 'react'
import { styled } from 'inlines'
import { ScrollArea, useSize, useUpdate } from '../../../index.js'
import {
  Path,
  TableCtx,
  Reference,
  TablePagination,
  ColSizes,
} from '../types.js'
import {
  BasedSchemaFieldArray,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { ObjectCollsRows } from '../Table/Arrays/ObjectCollumnRows.js'
import { ValueRef } from '../Table/Arrays/types.js'

type TableBodyProps = {
  pagination: TablePagination
  onClickReference: (ref: Reference) => void
  field: BasedSchemaFieldReferences
  valueRef: ValueRef
  ctx: TableCtx
  changeIndex: (fromIndex: number, toIndex: number) => void
  onRemove: (index: number) => void
  path: Path
  colFields: ColSizes
  nField: BasedSchemaFieldArray
}

const TableBodyPaged = (p: TableBodyProps) => {
  const size = React.useRef<{
    ctx?: TableCtx
    pageCount?: number
    currentIndex?: number
    p?: string
    start: number
    end: number
    pageSize?: number
  }>({
    start: 0,
    end: 0,
    pageCount: 0,
    currentIndex: 0,
  })

  const update = useUpdate()

  const updateBlock = React.useCallback((index: number) => {
    size.current.currentIndex = index
    size.current.start = Math.max(index * size.current.pageCount, 0)
    size.current.end = Math.min(
      (index + 2) * size.current.pageCount,
      p.pagination.total,
    )
    update()
  }, [])

  if (size.current.p) {
    size.current.ctx = {
      ...p.ctx,
      valueOverrides: {
        [size.current.p]: p.valueRef.value.slice(
          size.current.start,
          size.current.end,
        ),
      },
    }
  }

  const ref = useSize(({ height }) => {
    const n = Math.ceil(height / 48)
    if (n !== size.current.pageCount) {
      size.current.p = p.path.join('.')
      size.current.pageCount = n
      size.current.pageSize = n * 48
      updateBlock(0)
    }
  })

  const onScroll = React.useCallback((e) => {
    const block = Math.floor(
      e.currentTarget.scrollTop / (size.current.pageCount * 48),
    )
    if (size.current.currentIndex !== block) {
      updateBlock(block)
    }
  }, [])

  return (
    <ScrollArea
      ref={ref}
      style={{
        flexGrow: 0,
        maxHeight: '100%',
        width: '100%',
        position: 'relative',
      }}
      onScroll={onScroll}
    >
      <styled.div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          height: p.pagination.total * 48, // add bottom with load mroe
        }}
      >
        {size.current.ctx ? (
          <styled.div
            style={{
              transform: `translate(0,${size.current.currentIndex * size.current.pageSize}px)`,
            }}
          >
            <ObjectCollsRows
              onClickRow={(v: any) => p.onClickReference(v)}
              draggable={p.field.sortable}
              value={{
                value: size.current.ctx.valueOverrides[size.current.p],
                orderId: p.valueRef.orderId,
              }}
              ctx={size.current.ctx}
              changeIndex={p.changeIndex}
              removeItem={p.onRemove}
              path={p.path}
              colFields={p.colFields}
              field={p.nField}
            />
          </styled.div>
        ) : null}
      </styled.div>
    </ScrollArea>
  )
}

export const TableBody = (p: TableBodyProps) => {
  if (p.pagination && p.pagination.type === 'scroll') {
    return <TableBodyPaged {...p} />
  }

  return (
    <ObjectCollsRows
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
