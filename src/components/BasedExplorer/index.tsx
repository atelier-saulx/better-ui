import * as React from 'react'
import {
  Table,
  useLanguage,
  useUpdate,
  border,
  FormProps,
  Stack,
  Button,
  color,
  PageHeader,
  Pagination,
  IconPlus,
  SelectInput,
  SearchInput,
  Grid,
  SelectInputProps,
  IconViewTable,
  IconViewLayoutGrid,
  List,
  borderRadius,
  IconListBullet,
  Calendar,
  IconCalendar,
} from '../../index.js'
import { styled } from 'inlines'
import { useClient, useQuery } from '@based/react'
import { BasedSchema, convertOldToNew } from '@based/schema'
import {
  generateFieldsFromQuery,
  generateFromType,
  getTypesFromFilter,
} from './generator.js'
import { FieldRenderFunction } from '../Form/Table/Field/ReadOnly.js'
export { generateFieldsFromQuery, generateFromType, getTypesFromFilter }

type ExplorerRef = {
  activeSubs: Map<string, ActiveSub>
  block: { data: any[] }
  isLoading: boolean
  loadTimer?: ReturnType<typeof setTimeout>
  start: number
  end: number
  filter?: string
  dragOver?: boolean
  lastLoaded?: number
  query?: QueryFn
  sort?: { key: string; dir: 'asc' | 'desc' }
  selected?: any
  selectedItems?: Set<string>
}

type ExplorerQueryProps = {
  selected?: any
  limit: number
  offset: number
  filter?: string
  language: string
  sort?: { key: string; dir: 'asc' | 'desc' }
}

type ExplorerProps = {
  total: number
  start: number
  end: number
  data: any[]
  filter?: string
  sort?: { key: string; dir: 'asc' | 'desc' }
  selected?: any
}

export type QueryFn = ({
  limit,
  offset,
  sort,
  language,
  filter,
  selected,
}: ExplorerQueryProps) => any

export type BasedExplorerHeaderComponent = (p: ExplorerProps) => React.ReactNode

type Variant = 'table' | 'grid' | 'list' | 'calendar'

const DefaultInfo = ({ total, start, end }) =>
  `Showing ${start} - ${end} out of a ${total} items`

export type SelectedItems = { type: 'exclude' | 'include'; items: Set<string> }

export type BasedExplorerProps = {
  header?: React.ReactNode | BasedExplorerHeaderComponent
  info?: React.ReactNode | BasedExplorerHeaderComponent | true
  onItemClick?: (item: any) => void
  queryEndpoint?: string
  totalQueryEndpoint?: string
  onDrop?: (files: File[]) => void
  variant?: Variant | Variant[]
  select?: SelectInputProps['options']
  transformResults?: (data: any) => any
  onSelectItem?: (
    selectedItems: SelectedItems,
    clearSelectedItems: () => void,
  ) => boolean
  SelectItemsActionsComponent?: React.FC<any>
  selectItemsAction?: {
    label: React.ReactNode
    action: (
      selectedItems: SelectedItems,
      clearSelectedItems: () => void,
    ) => Promise<void> | void
  }
  db?: string
  sort?: {
    key: string
    dir: 'asc' | 'desc'
    exclude?: string[]
    include?: string[]
  }
  query: QueryFn
  total?: number
  totalQuery?: ((p: ExplorerQueryProps) => any) | false
  fields?: {
    [key: string]: { render?: FieldRenderFunction }
  } & (
    | FormProps['fields']
    | ((fields: FormProps['fields']) => FormProps['fields'])
  )
  filter?: boolean
  addItem?: (p: ExplorerProps) => Promise<void>
  calendar?: {
    labelField: string
    startField: string
    endField: string
    height?: number
  }
  suffix?: (v: any) => React.ReactNode
}

type ActiveSub = {
  close: () => void
  limit: number
  loaded: boolean
  offset: number
  data: { data: any[] }
}

type MutlipleVariants = Variant[]

const isMultipleVariants = (
  variant: BasedExplorerProps['variant'],
): variant is MutlipleVariants => {
  return Array.isArray(variant)
}

export const ViewSwitcher = (p: {
  variant: MutlipleVariants
  selectedVariant: Variant
  onChange: (v: Variant) => void
}) => {
  return (
    <Stack
      gap={2}
      fitContent
      style={{
        padding: 4,
        borderRadius: borderRadius('medium'),
        background: color('background', 'neutral'),
      }}
    >
      {[...p.variant].sort().map((v) => {
        const Icon =
          v === 'table'
            ? IconViewTable
            : v === 'grid'
              ? IconViewLayoutGrid
              : v === 'calendar'
                ? IconCalendar
                : IconListBullet

        return (
          <Button
            key={v}
            onClick={() => {
              p.onChange(v)
            }}
            prefix={
              <Stack
                style={{
                  paddingTop: 4,
                  paddingBottom: 4,
                  boxShadow:
                    p.selectedVariant === v
                      ? '0px 1px 2px rgba(0,0,0,0.1)'
                      : 'none',
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: borderRadius('tiny'),
                  background:
                    p.selectedVariant === v
                      ? color('background', 'screen')
                      : '',
                  // color: color('content', 'secondary'),
                }}
              >
                <Icon />
              </Stack>
            }
            variant="icon-only"
          />
        )
      })}
    </Stack>
  )
}

const selectedItemsLabel = (ref: ExplorerRef, total: number) => {
  const selectedItems = ref.selectedItems
  if (!selectedItems) {
    return ''
  }
  if (selectedItems.has('*')) {
    if (total) {
      return total + 1 - selectedItems.size
    }
    return '*'
  }
  return selectedItems.size
}

export function BasedExplorer({
  query,
  queryEndpoint = 'db',
  totalQuery,
  totalQueryEndpoint,
  select,
  onSelectItem,
  onItemClick,
  filter,
  fields: fieldsProp,
  onDrop,
  selectItemsAction,
  SelectItemsActionsComponent,
  transformResults,
  header,
  info,
  variant = 'table',
  addItem,
  sort,
  calendar,
  suffix,
  db = 'default',
}: BasedExplorerProps) {
  const client = useClient()
  const update = useUpdate()
  const [language] = useLanguage()
  const { data: rawSchema, checksum } = useQuery('db:schema', { db })
  const isMultiVariant = isMultipleVariants(variant)
  const [selectedVariant, setVariant] = React.useState<Variant>(
    isMultiVariant ? variant[0] : variant,
  )

  const schema = React.useMemo(() => {
    if (!rawSchema) return
    const newSchema = convertOldToNew(rawSchema) as BasedSchema
    return newSchema
  }, [checksum])

  const ref = React.useRef<ExplorerRef>({
    dragOver: false,
    block: { data: [] },
    activeSubs: new Map(),
    isLoading: true,
    start: 0,
    lastLoaded: 0,
    end: 0,
    sort,
    query,
    selectedItems: onSelectItem ? new Set() : null,
    selected: select
      ? typeof select[0] === 'string'
        ? select[0]
        : select[0].value
      : null,
  })

  if (totalQuery === undefined) {
    totalQuery = (p) => {
      const q = query({
        filter: p.filter,
        limit: 0,
        offset: 0,
        language,
        selected: ref.current.selected,
      })
      if (q.data?.$list?.$find?.$filter && q.data.$list.$find.$traverse) {
        const t: any = {
          total: {
            $aggregate: {
              $function: 'count',
              $traverse: q.data.$list.$find.$traverse,
              $filter: q.data.$list.$find.$filter,
            },
          },
        }

        if (q.$db) {
          t.$db = q.$db
        }

        if (q.$id) {
          t.$id = q.$id
        }

        return t
      }
      return null
    }
  }

  const totalQueryPayload = totalQuery
    ? totalQuery({
        limit: ref.current.end - ref.current.start,
        offset: ref.current.start,
        sort: ref.current.sort,
        language,
        filter: ref.current.filter,
        selected: ref.current.selected,
      })
    : null

  const { data: totalData, loading: totalLoading } = useQuery(
    totalQuery && totalQueryPayload
      ? totalQueryEndpoint ?? queryEndpoint
      : null,
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
          // @ts-ignore
          queryEndpoint,
          ref.current.query({
            limit: sub.limit,
            offset: sub.offset,
            sort: ref.current.sort,
            language,
            filter: ref.current.filter,
            selected: ref.current.selected,
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
      query({ limit: 0, offset: 0, language, selected: ref.current.selected }),
      schema,
    )
    if (typeof fieldsProp === 'function') {
      fields = fieldsProp(fields)
    }
  }

  if (!fieldsProp && schema) {
    fields = generateFieldsFromQuery(
      query({ limit: 0, offset: 0, language, selected: ref.current.selected }),
      schema,
    )
  }

  const parsedTotal = totalQuery
    ? // @ts-ignore
      totalData?.total ?? 0
    : ref.current.lastLoaded

  const useHeader = info || header || addItem || filter || select

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
              // @ts-ignore
              queryEndpoint,
              ref.current.query({
                limit: limit,
                offset: offset,
                sort: ref.current.sort,
                language,
                filter: ref.current.filter,
                selected: ref.current.selected,
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

  console.log('flap', ref.current?.block.data)

  React.useEffect(() => {
    if (selectedVariant === 'calendar') {
      pagination.onPageChange({
        index: 0,
        pageSize: parsedTotal,
        start: 0,
        end: parsedTotal,
      })
    }
  }, [selectedVariant, parsedTotal])

  const style = useHeader
    ? {
        borderTop: border(),
      }
    : undefined

  let viewer =
    selectedVariant === 'list' ? (
      <List
        onClick={onItemClick}
        schema={schema ?? undefined}
        style={style}
        values={ref.current?.block.data}
        isBlock
        fields={fields}
        isLoading={ref.current.isLoading}
        pagination={pagination}
        suffix={suffix}
      />
    ) : selectedVariant === 'grid' ? (
      <Grid
        onClick={onItemClick}
        schema={schema ?? undefined}
        style={style}
        values={ref.current?.block.data}
        isBlock
        fields={fields}
        isLoading={ref.current.isLoading}
        pagination={pagination}
      />
    ) : selectedVariant === 'calendar' ? (
      <div
        style={{
          padding: '24px',
          width: '100%',
          flex: 1,
          borderTop: border(),
          overflow: 'hidden',
        }}
      >
        <Calendar
          data={ref.current?.block.data ?? []}
          onItemClick={onItemClick}
          height={600}
          startField="createdAt"
          labelField="name"
          endField="updatedAt"
          showTooltip
          {...calendar}
        />
      </div>
    ) : (
      <Table
        onSelect={
          onSelectItem
            ? (v, all) => {
                const selectedItems = ref.current.selectedItems
                if (all) {
                  if (selectedItems.has('*')) {
                    selectedItems.clear()
                  } else {
                    selectedItems.clear()
                    selectedItems.add('*')
                  }
                } else {
                  if (selectedItems.has(v.id)) {
                    selectedItems.delete(v.id)
                  } else {
                    selectedItems.add(v.id)
                  }
                }

                if (selectedItems.has('*')) {
                  onSelectItem(
                    {
                      type: 'exclude',
                      items: new Set(
                        [...selectedItems].filter((v) => v !== '*'),
                      ),
                    },
                    () => {
                      selectedItems.clear()
                      update()
                    },
                  )
                } else {
                  onSelectItem(
                    {
                      type: 'include',
                      items: selectedItems,
                    },
                    () => {
                      selectedItems.clear()
                      update()
                    },
                  )
                }
                update()
              }
            : null
        }
        selected={ref.current.selectedItems}
        style={style}
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
          ...(sort?.exclude && { exclude: new Set(sort.exclude) }),
          ...(sort?.include && { include: new Set(sort.include) }),
        }}
        pagination={pagination}
      />
    )

  if (onDrop) {
    viewer = (
      <styled.div
        onDragOver={(event) => {
          event.stopPropagation()
          event.preventDefault()
          ref.current.dragOver = true
          update()
        }}
        onDragLeave={(event) => {
          event.stopPropagation()
          event.preventDefault()
          ref.current.dragOver = false
          update()
        }}
        onDrop={(event) => {
          event.stopPropagation()
          event.preventDefault()
          const dt = event.dataTransfer
          const files = dt.files
          onDrop(files)
          ref.current.dragOver = false
          update()
        }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: ref.current.dragOver
            ? color('background', 'primary')
            : null,
        }}
      >
        {viewer}
      </styled.div>
    )
  }

  if (useHeader) {
    const headerProps: ExplorerProps = {
      total: parsedTotal,
      start: ref.current.start,
      end: ref.current.end,
      data: ref.current?.block.data,
      selected: ref.current.selected,
      filter: ref.current.filter,
    }
    return (
      <Stack direction="column" style={{ height: '100%' }}>
        <PageHeader
          padding={24}
          suffix={
            <styled.div>
              <Stack gap={24}>
                {isMultiVariant ? (
                  <ViewSwitcher
                    variant={variant}
                    selectedVariant={selectedVariant}
                    onChange={setVariant}
                  />
                ) : null}
                {select ? (
                  <Stack fitContent justify="end" gap={2}>
                    {select ? (
                      <styled.div>
                        <SelectInput
                          variant="small"
                          value={ref.current.selected}
                          options={select}
                          onChange={(value) => {
                            ref.current.selected = value
                            updateSubs()
                          }}
                        />
                      </styled.div>
                    ) : null}
                    {}
                  </Stack>
                ) : null}
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
                {selectItemsAction || SelectItemsActionsComponent ? (
                  <SelectItemAction
                    update={update}
                    SelectItemsActionComponent={SelectItemsActionsComponent}
                    selectItemsAction={selectItemsAction}
                    expRef={ref}
                    totalData={totalData}
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
            </styled.div>
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

const SelectItemAction = (p: {
  selectItemsAction: {
    label: React.ReactNode
    action: (
      selectedItems: SelectedItems,
      clearSelectedItems: () => void,
    ) => Promise<void> | void
  }
  SelectItemsActionComponent: React.FC<any>
  update: () => void
  expRef: React.MutableRefObject<ExplorerRef>
  totalData: any
}): React.ReactNode => {
  const selectedLabel = selectedItemsLabel(p.expRef.current, p.totalData?.total)

  if (!selectedLabel) {
    return null
  }

  if (p.SelectItemsActionComponent) {
    return (
      <p.SelectItemsActionComponent
        selectedItems={p.expRef.current.selectedItems}
        totalData={p.totalData}
        selectItemsAction={p.selectItemsAction}
        update={p.update}
        selectedAmount={selectedLabel}
      />
    )
  }

  return (
    <Button
      variant="primary-muted"
      onClick={() => {
        const selectedItems = p.expRef.current.selectedItems
        return p.selectItemsAction.action(
          selectedItems.has('*')
            ? {
                type: 'exclude',
                items: new Set([...selectedItems].filter((v) => v !== '*')),
              }
            : {
                type: 'include',
                items: selectedItems,
              },
          () => {
            selectedItems.clear()
            p.update()
          },
        )
      }}
    >
      {p.selectItemsAction.label}
      {` (${selectedLabel})`}
    </Button>
  )
}
