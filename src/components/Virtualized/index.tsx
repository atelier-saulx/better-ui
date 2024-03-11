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
  itemHeight: number
  itemWidth: number
  start: number
  index: number
  end: number
  width: number
  pageCount: number
  total: number
}) => React.ReactNode

export type ItemSize =
  | number
  | ((size: {
      width: number
      height: number
    }) => { width?: number; height: number; rows?: number } | number)

export type VirtualizedProps = {
  pagination: Pagination
  values: any[]
  itemSize: ItemSize
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
    itemHeightProp: ItemSize
    itemHeight: number
    itemWidth: number
    width: number
    rows: number
  }>({
    start: 0,
    end: 0,
    width: 0,
    pageCount: 0,
    currentIndex: 0,
    rows: 1,
    loading: false,
    loaded: -1,
    values: [],
    itemHeight: 0,
    itemWidth: 0,
    itemHeightProp: p.itemSize,
  })

  if (typeof p.itemSize === 'number') {
    // @ts-ignore .....
    ref.current.itemHeight = p.itemSize
  }

  ref.current.pagination = p.pagination

  const update = useUpdate()

  const updateBlock = React.useCallback((index: number) => {
    ref.current.currentIndex = index
    ref.current.start = Math.max(
      index * ref.current.pageCount * ref.current.rows,
      0,
    )
    ref.current.end = Math.min(
      (index + 2) * ref.current.pageCount * ref.current.rows,
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

  React.useEffect(() => {
    updateBlock(ref.current.currentIndex)
  }, [ref.current.pagination.total])

  const sizeRef = useSize((size) => {
    if (typeof ref.current.itemHeightProp === 'function') {
      const calc = ref.current.itemHeightProp(size)
      if (typeof calc === 'number') {
        ref.current.itemHeight = calc
      } else {
        ref.current.itemHeight = calc.height
        ref.current.itemWidth = calc.width
        ref.current.rows = calc.rows ?? 1
      }
    }
    const { height, width } = size

    const n = Math.ceil(height / ref.current.itemHeight)

    ref.current.width = width

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

  // slice array
  if (ref.current.pageSize) {
    ref.current.values = p.isBlock
      ? p.values
      : p.values.slice(ref.current.start, ref.current.end)
    if (p.onSelectValues) {
      ref.current.values = p.onSelectValues(ref.current.values)
    }
  }

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
            (ref.current.pagination.total * ref.current.itemHeight) /
              ref.current.rows +
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
                width: ref.current.width,
                isLoading: p.isLoading,
                loading: ref.current.loading,
                values: ref.current.values,
                itemHeight: ref.current.itemHeight,
                itemWidth: ref.current.itemWidth,
                total: ref.current.pagination.total,
                start: ref.current.start,
                end: ref.current.end,
                pageCount: ref.current.pageCount,
                index: ref.current.currentIndex,
              })
            : null}
        </styled.div>
      </styled.div>
    </ScrollArea>
  )
}
