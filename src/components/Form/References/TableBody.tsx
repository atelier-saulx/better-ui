import * as React from 'react'
import { styled } from 'inlines'
import {
  ScrollArea,
  Spinner,
  Stack,
  useSize,
  useUpdate,
} from '../../../index.js'
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
  isBlock?: boolean
  isLoading?: boolean
}

const TableBodyPaged = (p: TableBodyProps) => {
  const ref = React.useRef<{
    ctx?: TableCtx
    pageCount?: number
    currentIndex?: number
    p?: string
    start: number
    end: number
    pageSize?: number
    pagination?: TablePagination
    loading: boolean
    loaded: number
  }>({
    start: 0,
    end: 0,
    pageCount: 0,
    currentIndex: 0,
    loading: false,
    loaded: -1,
  })

  ref.current.pagination = p.pagination

  const update = useUpdate()

  const updateBlock = React.useCallback((index: number) => {
    ref.current.currentIndex = index
    ref.current.start = Math.max(index * ref.current.pageCount, 0)
    ref.current.end = Math.min(
      (index + 2) * ref.current.pageCount,
      ref.current.pagination.total,
    )
    ref.current.pagination.onPageChange?.({
      index,
      pageSize: ref.current.pageCount,
      start: ref.current.start,
      end: ref.current.end,
    })
    update()
  }, [])

  if (ref.current.p) {
    ref.current.ctx = {
      ...p.ctx,
      valueOverrides: {
        [ref.current.p]: p.isBlock
          ? p.valueRef.value
          : p.valueRef.value.slice(ref.current.start, ref.current.end),
      },
    }
  }

  React.useEffect(() => {
    updateBlock(ref.current.currentIndex)
  }, [ref.current.pagination.total])

  const sizeRef = useSize(({ height, width }) => {
    const n = Math.ceil(height / 48)
    if (n !== ref.current.pageCount) {
      ref.current.p = p.path.join('.')
      ref.current.pageCount = n
      ref.current.pageSize = n * 48
      updateBlock(0)
    }
  })

  const onScroll = React.useCallback((e) => {
    const y = e.currentTarget.scrollTop
    const block = Math.floor(y / (ref.current.pageCount * 48))
    if (ref.current.pagination.loadMore) {
      const total = ref.current.pagination.total

      if (
        e.currentTarget.scrollHeight - y - e.currentTarget.clientHeight <= 0 &&
        !ref.current.loading &&
        ref.current.loaded < total
      ) {
        ref.current.loading = true
        update()
        ref.current.pagination
          .loadMore({
            index: block,
            pageSize: ref.current.pageCount,
            start: ref.current.start,
            end: ref.current.end,
          })
          .finally(() => {
            if (ref.current.loaded < total) {
              ref.current.loaded = total
            }
            ref.current.loading = false
            updateBlock(block)
          })
      }
    }

    if (ref.current.pagination.onScroll) {
      ref.current.pagination.onScroll(y, block, ref.current.pageCount)
    }

    if (ref.current.currentIndex !== block) {
      updateBlock(block)
    }
  }, [])

  return (
    <ScrollArea
      ref={sizeRef}
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
          height:
            ref.current.pagination.total * 48 +
            (ref.current.pagination.loadMore ? 48 : 0), // add bottom with load mroe
        }}
      >
        {ref.current.ctx ? (
          <styled.div
            style={{
              transform: `translate(0,${ref.current.currentIndex * ref.current.pageSize}px)`,
            }}
          >
            <ObjectCollsRows
              onClickRow={(v: any) => p.onClickReference(v)}
              draggable={p.field.sortable}
              value={{
                value: ref.current.ctx.valueOverrides[ref.current.p],
                orderId: p.valueRef.orderId,
              }}
              isLoading={p.isLoading}
              ctx={ref.current.ctx}
              changeIndex={p.changeIndex}
              removeItem={p.onRemove}
              path={p.path}
              colFields={p.colFields}
              field={p.nField}
            />
            {ref.current.loading ? (
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
