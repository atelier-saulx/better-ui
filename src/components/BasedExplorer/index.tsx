import { BasedQuery } from '@based/client'
import * as React from 'react'
import { Table } from '../../index.js'
import { useClient, useQuery } from '@based/react'

// TODO bugs on table:
// if the initial page of items doesnt fill the table then loadmore never gets called

export type BasedExplorerProps = {
  type: 'table'
  onItemClick?: (item: any) => void
  query: ({ limit, offset }: { limit: number; offset: number }) => any
  queryEndpoint?: string
}

export function BasedExplorer({
  query,
  queryEndpoint = 'db',
}: BasedExplorerProps) {
  const client = useClient()
  const querySubscriptions = React.useRef<
    (ReturnType<typeof BasedQuery.prototype.subscribe> | null)[]
  >([])
  const [data, setData] = React.useState<any[]>([])
  const flatData = data.flatMap((e) => e?.data ?? [])
  const { data: schema, loading: schemaLoading } = useQuery('db:schema')

  function fetchPage({ limit, offset }: any) {
    const index = querySubscriptions.current.length

    querySubscriptions.current[index] = client
      .query(queryEndpoint, query({ limit: limit, offset: offset }))
      .subscribe((chunk) => {
        setData((prevData) => {
          const newData = [...prevData]
          newData[index] = chunk
          return newData
        })
      })
  }

  return (
    <div style={{ height: 500 }}>
      <Table
        values={flatData}
        schema={schema}
        pagination={{
          type: 'scroll',
          total: flatData.length,
          onPageChange: async (p) => {
            fetchPage({
              offset: p.start,
              limit: p.end === 0 ? p.pageSize : p.end - p.start,
            })
          },
        }}
        sort
      />
    </div>
  )
}
