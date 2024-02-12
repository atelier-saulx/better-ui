import { BasedQuery } from '@based/client'
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

export function BasedExplorer({
  query,
  queryEndpoint = 'db',
}: BasedExplorerProps) {
  const client = useClient()
  const update = useUpdate()

  const { data: schema } = useQuery('db:schema')
  const ref = React.useRef<{
    prevSub?: ReturnType<BasedQuery['subscribe']>
    block: { data: any[]; total: number }
    total: number
  }>({
    block: { data: [], total: 0 },
    total: 0,
  })

  return (
    <Table
      schema={schema ? convertOldToNew(schema) : undefined}
      values={ref.current?.block.data}
      isBlock
      sort
      pagination={{
        type: 'scroll',
        total: ref.current.total,
        onPageChange: async (p) => {
          if (ref.current.prevSub) {
            ref.current.prevSub()
          }
          ref.current.prevSub = client
            .query(
              queryEndpoint,
              query({
                limit: p.end === 0 ? p.pageSize : p.end - p.start,
                offset: p.start,
              }),
            )
            .subscribe((d) => {
              ref.current.total = d.total
              ref.current.block = d
              update()
            })
        },
      }}
    />
  )
}
