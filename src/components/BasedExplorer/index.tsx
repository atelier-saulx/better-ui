import * as React from 'react'
import {
  Table,
  useLanguage,
  useUpdate,
  border,
  FormProps,
  Stack,
  Button,
  borderRadius,
  color,
  PageHeader,
  Pagination,
  IconPlus,
  SearchInput,
  Grid,
} from '../../index.js'
import { useClient, useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import {
  generateFieldsFromQuery,
  generateFromType,
  getTypesFromFilter,
} from './generator.js'

export { generateFieldsFromQuery, generateFromType, getTypesFromFilter }

export type QueryFn = ({
  limit,
  offset,
  sort,
  language,
  filter,
}: {
  limit: number
  offset: number
  filter?: string
  language: string
  sort?: { key: string; dir: 'asc' | 'desc' }
}) => any

export type BasedExplorerHeaderComponent = (p: {
  total: number
  start: number
  end: number
  data: any[]
}) => React.ReactNode

const DefaultInfo = ({ total, start, end }) =>
  `Showing ${start} - ${end} out of a ${total} items`

export type BasedExplorerProps = {
  header?: React.ReactNode | BasedExplorerHeaderComponent
  info?: React.ReactNode | BasedExplorerHeaderComponent | true
  onItemClick?: (item: any) => void
  queryEndpoint?: string
  variant?: 'grid' | 'table'
  transformResults?: (data: any) => any
  sort?: { key: string; dir: 'asc' | 'desc' }
  query: QueryFn
  total?: number
  totalQuery?: ((p: { filter?: string }) => any) | false
  fields?:
    | FormProps['fields']
    | ((fields: FormProps['fields']) => FormProps['fields'])
  filter?: boolean
  addItem?: (p: {
    total: number
    start: number
    end: number
    data: any[]
  }) => Promise<void>
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
  onItemClick,
  filter,
  fields: fieldsProp,
  transformResults,
  header,
  info,
  variant,
  addItem,
  sort,
}: BasedExplorerProps) {
  const client = useClient()
  const update = useUpdate()
  const [language] = useLanguage()
  const { data: rawSchema, checksum } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    const newSchema = convertOldToNew(rawSchema) as BasedSchema
    return newSchema
  }, [checksum])

  const ref = React.useRef<{
    activeSubs: Map<string, ActiveSub>
    block: { data: any[] }
    isLoading: boolean
    loadTimer?: ReturnType<typeof setTimeout>
    start: number
    end: number
    filter?: string
    lastLoaded?: number
    query?: QueryFn
    sort?: { key: string; dir: 'asc' | 'desc' }
  }>({
    block: { data: [] },
    activeSubs: new Map(),
    isLoading: true,
    start: 0,
    lastLoaded: 0,
    end: 0,
    sort,
    query,
  })

  if (totalQuery === undefined) {
    totalQuery = (p) => {
      const q = query({ filter: p.filter, limit: 0, offset: 0, language })
      if (q.data?.$list?.$find?.$filter && q.data?.$list?.$find.$traverse) {
        return {
          total: {
            $aggregate: {
              $function: 'count',
              $traverse: q.data?.$list?.$find.$traverse,
              $filter: q.data.$list.$find.$filter,
            },
          },
        }
      }
      console.warn('connect construct totalQuery')
      return null
    }
  }

  const totalQueryPayload = totalQuery
    ? totalQuery({ filter: ref.current.filter })
    : null

  const { data: totalData, loading: totalLoading } = useQuery(
    totalQuery && totalQueryPayload ? queryEndpoint : null,
    totalQueryPayload,
  )

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
      ref.current.activeSubs.forEach((s) => {
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

  const updateSubs = React.useCallback(() => {
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
          ref.current.query({
            limit: sub.limit,
            offset: sub.offset,
            sort: ref.current.sort,
            language,
            filter: ref.current.filter,
          }),
        )
        .subscribe((d) => {
          newSub.loaded = true
          newSub.data = transformResults ? transformResults(d) : d
          updateBlocks()
        })
    }
  }, [])

  let fields
  if (typeof fieldsProp === 'object') {
    fields = fieldsProp
  } else if (schema) {
    fields = generateFieldsFromQuery(
      query({ limit: 0, offset: 0, language }),
      schema,
    )
    if (typeof fieldsProp === 'function') {
      fields = fieldsProp(fields)
    }
  }

  if (!fieldsProp && schema) {
    fields = generateFieldsFromQuery(
      query({ limit: 0, offset: 0, language }),
      schema,
    )
  }

  const parsedTotal = totalQuery
    ? totalData?.total ?? 0
    : ref.current.lastLoaded

  const useHeader = info || header || addItem || filter

  const pagination = React.useMemo<Pagination>(
    () => ({
      type: 'scroll',
      total: parsedTotal,
      loadMore: totalQuery
        ? undefined
        : async (x) => {
            ref.current.lastLoaded += x.pageSize
          },
      onPageChange: async (p) => {
        if (p.end === 0 && !totalQuery) {
          p.end = p.pageSize * 2
        }
        if (ref.current.lastLoaded < p.end) {
          ref.current.lastLoaded = p.end
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
        if (!ref.current.activeSubs.has(id)) {
          const newSub: ActiveSub = {
            limit,
            loaded: false,
            offset,
            data: {
              data: [],
            },
            close: () => {},
          }
          ref.current.activeSubs.set(id, newSub)
          newSub.close = client
            .query(
              queryEndpoint,
              ref.current.query({
                limit: limit,
                offset: offset,
                sort: ref.current.sort,
                language,
                filter: ref.current.filter,
              }),
            )
            .subscribe((d) => {
              newSub.loaded = true
              newSub.data = transformResults ? transformResults(d) : d
              updateBlocks()
            })
        } else {
          updateBlocks()
        }
      },
    }),
    [!totalQuery, parsedTotal, queryEndpoint],
  )

  const viewer =
    variant === 'grid' ? (
      <Grid
        schema={schema ?? undefined}
        style={
          useHeader
            ? {
                border: border(),
                borderRadius: borderRadius('tiny'),
                background: color('background', 'screen'),
              }
            : undefined
        }
        values={ref.current?.block.data}
        isBlock
        fields={fields}
        isLoading={ref.current.isLoading}
        pagination={pagination}
      />
    ) : (
      <Table
        style={
          useHeader
            ? {
                border: border(),
                borderRadius: borderRadius('tiny'),
                background: color('background', 'screen'),
              }
            : undefined
        }
        field={
          fields
            ? {
                type: 'object',
                properties: fields,
              }
            : undefined
        }
        schema={schema ?? undefined}
        values={ref.current?.block.data}
        isBlock
        isLoading={ref.current.isLoading}
        onClick={onItemClick}
        sort={{
          sorted: ref.current.sort,
          onSort(key, dir, sort) {
            sort.sorted = { key, dir }
            ref.current.sort = { key, dir }
            updateSubs()
          },
        }}
        pagination={pagination}
      />
    )

  if (useHeader) {
    const headerProps = {
      total: parsedTotal,
      start: ref.current.start,
      end: ref.current.end,
      data: ref.current?.block.data,
    }
    return (
      <Stack direction="column" padding={32} style={{ height: '100%' }}>
        <PageHeader
          suffix={
            <Stack gap={32}>
              {filter ? (
                <SearchInput
                  loading={ref.current.filter && totalLoading}
                  value={ref.current.filter}
                  onChange={(v) => {
                    ref.current.filter = v
                    updateSubs()
                  }}
                  placeholder="Filter..."
                  style={{ width: 300 }}
                />
              ) : null}
              {addItem ? (
                <Button
                  onClick={() => {
                    return addItem(headerProps)
                  }}
                  prefix={<IconPlus />}
                >
                  Add Item
                </Button>
              ) : null}
            </Stack>
          }
          title={typeof header === 'function' ? header(headerProps) : header}
          description={
            info === true
              ? DefaultInfo(headerProps)
              : typeof info === 'function'
                ? info(headerProps)
                : info
          }
        />
        {viewer}
      </Stack>
    )
  }
  return viewer
}
