import * as React from 'react'
import {
  Table,
  useLanguage,
  useUpdate,
  Spinner,
  Container,
  FormProps,
} from '../../index.js'
import { useClient, useQuery } from '@based/react'
import { BasedSchema, BasedSchemaType, convertOldToNew } from '@based/schema'
import { isSmallField } from '../Form/utils.js'

export type BasedExplorerProps = {
  onItemClick?: (item: any) => void
  queryEndpoint?: string
  transformResults?: (data: any) => any
  query: ({
    limit,
    offset,
    sort,
    language,
  }: {
    limit: number
    offset: number
    language: string
    sort?: { key: string; dir: 'asc' | 'desc' }
  }) => any
  total?: number
  totalQuery?: any
  fields?: FormProps['fields']
}

type ActiveSub = {
  close: () => void
  limit: number
  loaded: boolean
  offset: number
  data: { data: any[] }
}

export const getTypesFromFilter = (query: any): string[] => {
  const types = []
  const walk = (obj: any) => {
    for (const k in obj) {
      if (k === '$field' && obj[k] === 'type') {
        if (obj.$operator === '=') {
          if (Array.isArray(obj.$value)) {
            types.push(...obj.$value)
          } else {
            types.push(obj.$value)
          }
        }
      }
      if (typeof obj[k] === 'object') {
        walk(obj[k])
      }
    }
  }
  if (typeof query === 'object') {
    walk(query)
  }
  return types
}

// TODO make a schema helper pkg
export const generateFromType = (type: BasedSchemaType): { query; fields } => {
  const newQuery = {}
  if (!type.fields) {
    return { query: newQuery, fields: {} }
  }

  const fields: FormProps['fields'] = {}

  // const idField = getIdentifierField({
  //   type: 'object',
  //   properties: type.fields,
  // })

  // console.log(idField)

  for (const field in type.fields) {
    const f = type.fields[field]
    if (!isSmallField(f)) {
      continue
    }
    if (field === 'type') {
      continue
    }
    if (field === 'updatedAt') {
      continue
    }

    fields[field] = { ...f }

    // if (field === idField) {
    //   fields[field].index = 1
    // }

    // if (field === 'id') {
    //   fields[field].index = -1
    // }

    if (f.type === 'timestamp' && !f.display) {
      // @ts-ignore
      fields[field].display = 'human'
    }

    if (field === 'id') {
      // @ts-ignore
      fields[field].format = 'basedId'
    }

    if (f.type === 'reference') {
      newQuery[field] = {
        id: true,
        name: true,
        src: true,
      }
    } else {
      newQuery[field] = true
    }
  }

  return { query: newQuery, fields }
}

export const generateFieldsFromQuery = (
  query: any,
  schema?: BasedSchema,
): FormProps['fields'] | undefined => {
  if (!schema) {
    return
  }
  let fields: FormProps['fields']
  const types = getTypesFromFilter(query)
  if (types.length) {
    for (const t of types) {
      const fieldType = schema.types[t]
      if (fieldType) {
        if (!fields) {
          fields = {}
        }
        Object.assign(fields, generateFromType(fieldType).fields)
      }
    }

    if (fields && types.length > 1) {
      fields.type = { type: 'string', index: -1 } // format based type
    }
  }
  console.log(fields)
  return fields
}

export function BasedExplorer({
  query,
  queryEndpoint = 'db',
  totalQuery,
  onItemClick,
  fields,
  transformResults,
}: BasedExplorerProps) {
  const client = useClient()
  const update = useUpdate()
  const [language] = useLanguage()

  const { data: rawSchema, checksum } = useQuery('db:schema')

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    return convertOldToNew(rawSchema) as BasedSchema
  }, [checksum])

  const ref = React.useRef<{
    activeSubs: Map<string, ActiveSub>
    block: { data: any[] }
    isLoading: boolean
    loadTimer?: ReturnType<typeof setTimeout>
    start: number
    end: number
    lastLoaded?: number
    sort?: { key: string; dir: 'asc' | 'desc' }
  }>({
    block: { data: [] },
    activeSubs: new Map(),
    isLoading: true,
    start: 0,
    lastLoaded: 0,
    end: 0,
  })

  const { data: totalData, loading: totalLoading } = useQuery(
    totalQuery ? queryEndpoint : null,
    totalQuery,
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

  if (totalQuery && totalLoading) {
    return (
      <Container>
        <Spinner size={32} color="secondary" />
      </Container>
    )
  }

  if (!fields && schema) {
    fields = generateFieldsFromQuery(
      query({ limit: 0, offset: 0, language }),
      schema,
    )
  }

  return (
    <Table
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
                  language,
                }),
              )
              .subscribe((d) => {
                newSub.loaded = true
                newSub.data = transformResults ? transformResults(d) : d
                updateBlocks()
              })
          }
        },
      }}
      pagination={{
        type: 'scroll',
        total: totalQuery ? totalData.total ?? 0 : ref.current.lastLoaded,

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
                  limit: limit,
                  offset: offset,
                  sort: ref.current.sort,
                  language,
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
      }}
    />
  )
}
