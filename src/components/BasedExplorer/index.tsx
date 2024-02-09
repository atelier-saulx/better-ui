import { BasedQuery } from '@based/client'
import * as React from 'react'
import { Table } from '../../index.js'
import { useClient, useQuery } from '@based/react'

export type BasedExplorerProps = {
  type: 'table'
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
  const querySubscriptions = React.useRef<
    (ReturnType<typeof BasedQuery.prototype.subscribe> | null)[]
  >([])
  const [data, setData] = React.useState<any[]>([])
  const flatData = data.flatMap((e) => e?.data ?? [])
  const total = data?.[0]?.total ?? flatData.length
  const { data: schema } = useQuery('db:schema')

  function fetchPage({ limit, offset }: any) {
    const index = querySubscriptions.current.length

    querySubscriptions.current[index] = client
      .query(queryEndpoint, query({ limit: limit, offset: offset }))
      .subscribe((chunk) => {
        console.log('fetchpage', offset, chunk)

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
        schema={schema}
        values={flatData}
        sort
        pagination={{
          type: 'scroll',
          total: total,
          onPageChange: async (p) => {
            fetchPage({
              offset: p.start,
              limit: p.end === 0 ? p.pageSize : p.end - p.start,
            })
          },
        }}
      />
    </div>
  )
}
