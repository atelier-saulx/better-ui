import * as React from 'react'
import { Table, useUpdate } from '../../index.js'
import { useClient, useQuery } from '@based/react'
import { convertOldToNew } from '@based/schema'

export type BasedExplorerProps = {
  onItemClick?: (item: any) => void
  query: ({ limit, offset }: { limit: number; offset: number }) => {
    data: any
    total?: any
  }
  queryEndpoint?: string
}

type ActiveSub = {
  close: () => void
  limit: number
  offset: number
  data: { data: any[]; total: number }
}

export function BasedExplorer({
  query,
  queryEndpoint = 'db',
}: BasedExplorerProps) {
  const client = useClient()
  const update = useUpdate()

  const { data: schema } = useQuery('db:schema')
  const ref = React.useRef<{
    activeSubs: Map<string, ActiveSub>
    total: number
    block: { data: any[]; total: number }
    isLoading: boolean
    loadTimer?: ReturnType<typeof setTimeout>
    start: number
    end: number
  }>({
    block: { data: [], total: 0 },
    total: 0,
    activeSubs: new Map(),
    isLoading: true,
    start: 0,
    end: 0,
  })

  const updateBlocks = React.useCallback(() => {
    ref.current.isLoading = false
    const len = ref.current.end - ref.current.start
    const block: any[] = new Array(len)
    let blockFilled = 0
    for (let i = 0; i < len; i++) {
      let realI = i + ref.current.start
      ref.current.activeSubs.forEach((s, key) => {
        if (s.offset <= realI && realI < s.limit + s.offset) {
          const correction = s.offset - ref.current.start
          blockFilled++
          if (s.data.data[i - correction]) {
            block[i] = s.data.data[i - correction]
          }
        }
      })
    }
    if (blockFilled >= len) {
      ref.current.block = { data: block, total: ref.current.total }
    }
    if (ref.current.loadTimer !== null) {
      ref.current.loadTimer = null
      clearTimeout(ref.current.loadTimer)
    }
    update()
  }, [])

  return (
    <Table
      schema={schema ? convertOldToNew(schema) : undefined}
      values={ref.current?.block.data}
      isBlock
      isLoading={ref.current.isLoading}
      sort
      pagination={{
        type: 'scroll',
        total: ref.current.total,
        onPageChange: async (p) => {
          if (p.end === 0) {
            p.end = p.pageSize * 2
          }

          ref.current.start = p.start
          ref.current.end = p.end

          if (ref.current.loadTimer !== null) {
            ref.current.loadTimer = null
            clearTimeout(ref.current.loadTimer)
          }

          let timer = setTimeout(() => {
            if (timer === ref.current.loadTimer) {
              ref.current.isLoading = true
              ref.current.loadTimer = null
              update()
            }
          }, 100)
          ref.current.loadTimer = timer

          const size = 100
          const limit = size
          const offset = Math.floor(p.end / size) * size
          const id = offset + '-' + limit

          const newSub: ActiveSub = {
            limit,
            offset,
            data: {
              data: [],
              total: 0,
            },
            close: () => {},
          }

          if (!ref.current.activeSubs.has(id)) {
            newSub.close = client
              .query(
                queryEndpoint,
                query({
                  limit,
                  offset,
                }),
              )
              .subscribe((d) => {
                ref.current.total = d.total
                newSub.data = d
                updateBlocks()
              })
            ref.current.activeSubs.set(id, newSub)
          } else {
            updateBlocks()
          }
        },
      }}
    />
  )
}
