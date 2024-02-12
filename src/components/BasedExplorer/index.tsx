import { BasedQuery } from '@based/client'
import * as React from 'react'
import { Table, useUpdate } from '../../index.js'
import { useClient, useQuery } from '@based/react'
import { convertOldToNew } from '@based/schema'
import { ne } from '@faker-js/faker'

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
    activeSubs: ActiveSub[]

    total: number

    block: { data: any[]; total: number }

    isLoading: boolean
    loadTimer?: ReturnType<typeof setTimeout>
  }>({
    block: { data: [], total: 0 },
    total: 0,
    activeSubs: [],
    isLoading: true,
  })

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
          let hadSub = false

          const len = p.end ? p.end - p.start : p.pageSize
          const block: any[] = new Array(len)
          let total = 0

          let hasData = false
          for (let i = 0; i < ref.current.activeSubs.length; i++) {
            const s = ref.current.activeSubs[i]
            if (s.offset + s.limit < p.start || s.offset > p.end) {
              console.log('Unsub', s.offset, s.limit)
              s.close()
              ref.current.activeSubs.splice(i, 1)
              i--
            } else if (p.end < s.limit + s.offset) {
              console.log('GOT SUB', s.offset, s.limit)

              for (let j = 0; j < len; j++) {
                if (s.data.data?.[j]) {
                  hasData = true
                  block[j] = s.data.data[j]
                }
              }

              total = s.data.total

              hadSub = true
            }
          }

          if (ref.current.loadTimer !== null) {
            ref.current.loadTimer = null
            clearTimeout(ref.current.loadTimer)
          }

          if (hadSub) {
            if (hasData) {
              ref.current.isLoading = false // prob
              ref.current.block = { data: block, total }
              update()
            }
            return
          }

          let timer = setTimeout(() => {
            if (timer === ref.current.loadTimer) {
              ref.current.isLoading = true
              ref.current.loadTimer = null
              update()
            }
          }, 100)
          ref.current.loadTimer = timer

          const size = 31

          const limit = size
          const offset = Math.floor(p.end / size) * size

          console.log('make sub', offset, limit)

          const newSub: ActiveSub = {
            limit,
            offset,
            data: {
              data: [],
              total: 0,
            },
            close: () => {},
          }

          newSub.close = client
            .query(
              queryEndpoint,
              query({
                limit,
                offset,
              }),
            )
            .subscribe((d) => {
              ref.current.isLoading = false
              ref.current.total = d.total
              newSub.data = d

              const len = p.end ? p.end - p.start : p.pageSize
              const block: any[] = new Array(len)

              let blockFilled = false

              console.log(p.start, p.end)

              for (let i = 0; i < len; i++) {
                // select form active subs
                for (const s of ref.current.activeSubs) {
                  if (
                    s.offset <= p.start &&
                    i <= s.limit - (p.start - s.offset)
                  ) {
                    if (s.data.data[i]) {
                      blockFilled = true
                      block[i] = s.data.data[i]
                    }
                  } else if (s.offset <= p.start + i) {
                    console.log(
                      'hello i am a second block',
                      i,
                      p.start,
                      p.end,
                      s.offset,
                      s.limit,
                    )
                    console.log(i, i - p.start)

                    if (s.data.data?.[i - p.start]) {
                      blockFilled = true

                      block[i] = s.data.data[i - p.start]
                    }
                  }
                }
              }

              console.log('hello block', block)
              if (blockFilled) {
                ref.current.block = { data: block, total: d.total }
              }

              if (ref.current.loadTimer !== null) {
                ref.current.loadTimer = null
                clearTimeout(ref.current.loadTimer)
              }

              update()
            })

          ref.current.activeSubs.push(newSub)
        },
      }}
    />
  )
}
