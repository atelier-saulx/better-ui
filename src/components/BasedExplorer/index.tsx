import { BasedQuery } from '@based/client'
import * as React from 'react'
import { Table } from '../../index.js'
import { useClient, useQuery } from '@based/react'

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

  function fetchPage() {
    const index = querySubscriptions.current.length

    querySubscriptions.current[index] = client
      .query(queryEndpoint, query({ limit: 100, offset: 0 }))
      .subscribe((chunk) => {
        setData((prevData) => {
          const newData = [...prevData]
          newData[index] = chunk
          return newData
        })
      })
  }

  React.useEffect(() => {
    fetchPage()
  }, [])

  console.log(schema, flatData)

  return (
    <div style={{ height: 500 }}>
      <Table
        values={flatData}
        // pagination={{
        //   type: 'scroll',
        //   loadMore: async () => {
        //     console.log('loadmore called')
        //   },
        // }}
      />
    </div>
  )
}
