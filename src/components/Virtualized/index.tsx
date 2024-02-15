import * as React from 'react'
import { styled } from 'inlines'
import { useUpdate, useSize, ScrollArea } from '../../index.js'

export type Pagination = {
  type: 'scroll' | 'button'
  total?: number
  onScroll?: (y: number, page: number, pageSize: number) => void
  onPageChange?: (p: {
    index: number
    pageSize: number
    start: number
    end: number
  }) => Promise<void>
  loadMore?: (p: {
    index: number
    pageSize: number
    start: number
    end: number
  }) => Promise<void>
}

export type VirtualizedRenderer = (p: {
  values: any[]
  isLoading?: boolean
  loading: boolean
}) => {}

export type VirtualizedProps = {
  pagination: Pagination
  values: any[]
  itemHeight?: number // can be a function
  isBlock?: boolean
  isLoading?: boolean
  children: VirtualizedRenderer
  onSelectValues?: (values: any[]) => any[]
}

export function Virtualized(p: VirtualizedProps) {
  const ref = React.useRef<{
    pageCount?: number
    currentIndex?: number
    p?: string
    start: number
    end: number
    pageSize?: number
    pagination?: Pagination
    loading: boolean
    loaded: number
    values: any[]
    itemHeight: number
  }>({
    start: 0,
    end: 0,
    pageCount: 0,
    currentIndex: 0,
    loading: false,
    loaded: -1,
    values: [],
    itemHeight: p.itemHeight ?? 0,
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

  if (ref.current.pageSize) {
    ref.current.values = p.isBlock
      ? p.values
      : p.values.slice(ref.current.start, ref.current.end)
    if (p.onSelectValues) {
      ref.current.values = p.onSelectValues(ref.current.values)
    }
  }

  React.useEffect(() => {
    updateBlock(ref.current.currentIndex)
  }, [ref.current.pagination.total])

  const sizeRef = useSize(({ height, width }) => {
    // can call itemHeight here!
    const n = Math.ceil(height / ref.current.itemHeight)
    if (n !== ref.current.pageCount) {
      ref.current.pageCount = n
      ref.current.pageSize = n * ref.current.itemHeight
      updateBlock(0)
    }
  })

  const onScroll = React.useCallback((e) => {
    const y = e.currentTarget.scrollTop
    const block = Math.floor(
      y / (ref.current.pageCount * ref.current.itemHeight),
    )
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
            ref.current.pagination.total * ref.current.itemHeight +
            (ref.current.pagination.loadMore ? ref.current.itemHeight : 0), // add bottom with load mroe
        }}
      >
        <styled.div
          style={{
            transform: `translate(0,${ref.current.currentIndex * ref.current.pageSize}px)`,
          }}
        >
          {ref.current.itemHeight
            ? p.children({
                isLoading: p.isLoading,
                loading: ref.current.loading,
                values: ref.current.values,
              })
            : null}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
