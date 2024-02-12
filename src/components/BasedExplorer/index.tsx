import * as React from 'react'
import { Table, useUpdate } from '../../index.js'
import { useClient, useQuery } from '@based/react'
import { convertOldToNew } from '@based/schema'

export type BasedExplorerProps = {
  onItemClick?: (item: any) => void
  queryEndpoint?: string
  query: ({
    limit,
    offset,
    sort,
  }: {
    limit: number
    offset: number
    sort?: { key: string; dir: 'asc' | 'desc' }
  }) => {
    data: any
  }
  totalQuery?: any
}

type ActiveSub = {
  close: () => void
  limit: number
  loaded: boolean
  offset: number
  data: { data: any[] }
}

export function BasedExplorer({
  query,
  queryEndpoint = 'db',
  totalQuery,
}: BasedExplorerProps) {
  const client = useClient()
  const update = useUpdate()

  const { data: schema } = useQuery('db:schema')
  const ref = React.useRef<{
    activeSubs: Map<string, ActiveSub>
    block: { data: any[] }
    isLoading: boolean
    loadTimer?: ReturnType<typeof setTimeout>
    start: number
    end: number
    sort?: { key: string; dir: 'asc' | 'desc' }
  }>({
    block: { data: [] },
    activeSubs: new Map(),
    isLoading: true,
    start: 0,
    end: 0,
  })
  const { data: totalData, loading: totalLoading } = useQuery(
    queryEndpoint,
    totalQuery,
  )

  console.log('totalquery', totalData?.total ?? 0, totalLoading)

  const updateBlocks = React.useCallback(() => {
    ref.current.isLoading = false
    const len = ref.current.end - ref.current.start
    const block: any[] = new Array(len)
    let blockFilled = 0

    let loaded = true

    ref.current.activeSubs.forEach((s, id) => {
      const r1 = ref.current.start
      const r2 = ref.current.end
      const total = s.offset + s.limit

      if (r1 > total) {
        s.close()
        ref.current.activeSubs.delete(id)
      } else if (s.offset > r2) {
        s.close()
        ref.current.activeSubs.delete(id)
      }
    })

    for (let i = 0; i < len; i++) {
      let realI = i + ref.current.start
      ref.current.activeSubs.forEach((s, id) => {
        if (s.offset <= realI && realI < s.limit + s.offset) {
          if (!s.loaded) {
            loaded = false
          }
          const correction = s.offset - ref.current.start
          blockFilled++
          if (s.data.data[i - correction]) {
            block[i] = s.data.data[i - correction]
          }
        }
      })
    }

    if (loaded) {
      if (blockFilled >= len) {
        ref.current.block = { data: block }
      }

      if (ref.current.loadTimer !== null) {
        ref.current.loadTimer = null
        clearTimeout(ref.current.loadTimer)
      }
      update()
    }
  }, [])

  return (
    <Table
      schema={schema ? convertOldToNew(schema) : undefined}
      values={ref.current?.block.data}
      isBlock
      isLoading={ref.current.isLoading}
      sort={{
        onSort(key, dir, sort) {
          sort.sorted = { key, dir }
          ref.current.sort = { key, dir }
          for (const [id, sub] of ref.current.activeSubs) {
            sub.close()

            const newSub: ActiveSub = {
              loaded: false,
              limit: sub.limit,
              offset: sub.offset,
              data: {
                data: [],
              },
              close: () => {},
            }

            ref.current.activeSubs.set(id, newSub)

            newSub.close = client
              .query(
                queryEndpoint,
                query({
                  limit: sub.limit,
                  offset: sub.offset,
                  sort: ref.current.sort,
                }),
              )
              .subscribe((d) => {
                newSub.loaded = true
                newSub.data = d
                updateBlocks()
              })
          }
        },
      }}
      pagination={{
        type: 'scroll',
        total: totalData?.total ?? 0,
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
            loaded: false,
            offset,
            data: {
              data: [],
            },
            close: () => {},
          }

          if (!ref.current.activeSubs.has(id)) {
            ref.current.activeSubs.set(id, newSub)

            newSub.close = client
              .query(
                queryEndpoint,
                query({
                  limit,
                  offset,
                  sort: ref.current.sort,
                }),
              )
              .subscribe((d) => {
                newSub.loaded = true
                newSub.data = d
                updateBlocks()
              })
          } else {
            updateBlocks()
          }
        },
      }}
    />
  )
}
