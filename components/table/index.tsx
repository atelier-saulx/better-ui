import * as React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtual } from '@tanstack/react-virtual'
import { NumberFormat, prettyNumber } from '@based/pretty-number'
import { DateFormat, prettyDate } from '@based/pretty-date'
import { useCallbackRef } from '../../utils/hooks/use-callback-ref'
import { SortAsc, SortDesc } from '../icons'
import { Badge } from '../badge'
import { Thumbnail } from '../thumbnail'
import { styled } from 'inlines'

type RenderAs =
  | 'badge'
  | 'image'
  | 'avatar'
  | 'toggle'
  | NumberFormat
  | DateFormat
  | 'text'
  | ((row: any) => React.ReactNode)

type TableColumn = {
  key: string
  header: string
  renderAs?: RenderAs
}

export type TableProps = {
  data: any
  columns?: TableColumn[]
  onScrollToBottom?: () => void
  onVisibleElementsChange?: (visibleElements: number[]) => void
  rowAction?: (row: any) => React.ReactNode
  onRowClick?: (row: any) => void
}

export function Table({
  data,
  columns: columnsProp,
  rowAction,
  onScrollToBottom: onScrollToBottomProp,
  onVisibleElementsChange: onVisibleElementsChangeProp,
  onRowClick: onRowClickProp,
}: TableProps) {
  const columns = React.useMemo(() => {
    return [
      ...(columnsProp ?? generateColumDefinitionsFromData(data[0] ?? {})),
      ...(rowAction
        ? [
            {
              align: 'end',
              id: 'internal_row_action',
              header: '',
              renderAs: rowAction,
            },
          ]
        : []),
    ]
  }, [columnsProp, data])

  const table = useReactTable({
    data,
    columns: columns.map((c) => {
      if ('id' in c) {
        return {
          id: c.id,
          header: c.header,
          cell: ({ row }) => c.renderAs(row.original),
        }
      }

      return {
        header: c.header,
        accessorKey: c.key,
        cell: ({ row }) => renderCell(c.key, row.original, c.renderAs),
      }
    }),
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  const { rows } = table.getRowModel()

  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const { totalSize, virtualItems } = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    estimateSize: React.useCallback(() => 61, []),
    overscan: 10,
  })

  const paddingTop = virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0)
      : 0

  const onVisibleElementsChange = useCallbackRef(onVisibleElementsChangeProp)
  React.useEffect(() => {
    if (onVisibleElementsChange) {
      onVisibleElementsChange(virtualItems.map((e) => e.index))
    }
  }, [onVisibleElementsChange, virtualItems])

  const onScrollToBottom = useCallbackRef(onScrollToBottomProp)
  const handleScroll = React.useCallback(
    (containerRefElement: HTMLDivElement) => {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement

      if (onScrollToBottom) {
        if (scrollHeight - scrollTop - clientHeight < 300) {
          onScrollToBottom()
        }
      }
    },
    [onScrollToBottom]
  )
  const onRowClick = useCallbackRef(onRowClickProp)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{ height: '100%', width: '100%', overflow: 'auto' }}
        onScroll={(e) => handleScroll(e.target as HTMLDivElement)}
      >
        <div
          ref={tableContainerRef}
          style={{
            minWidth: 650,
          }}
        >
          <table
            style={{
              height: '100%',
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
            }}
          >
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualItems
                .map((row) => rows[row.index])
                .map((row, index) => {
                  return (
                    <tr
                      onClick={(e) => {
                        if (onRowClick) {
                          onRowClick(row.original)
                        }
                      }}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            style={{
                              boxSizing: 'border-box',
                              height: 61,
                              borderBottom:
                                index !== virtualItems.length - 1
                                  ? `1px solid var(--interactive-secondary)`
                                  : undefined,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: '100%',
                              ...(cell.column.columnDef.id ===
                              'internal_row_action'
                                ? {
                                    background: 'var(--background-screen)',
                                    padding: '0 4px',
                                  }
                                : {
                                    padding: '0 12px',
                                  }),
                            }}
                            key={cell.id}
                          >
                            <div
                              style={{
                                display: 'flex',
                                justifyContent:
                                  (cell.column.columnDef as any).align ??
                                  'start',
                                alignItems: 'center',
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
            <thead
              style={{
                position: 'sticky',
                top: 0,
                margin: 0,
                textAlign: 'left',
                background: 'var(--background-screen)',
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        style={{
                          padding: '0 12px',
                          height: 42,
                          boxSizing: 'border-box',
                          borderTop: `1px solid var(--interactive-secondary)`,
                          borderBottom: `1px solid var(--interactive-secondary)`,
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <styled.div
                            onClick={header.column.getToggleSortingHandler()}
                            style={{
                              display: 'flex',
                              height: '100%',
                              justifyContent:
                                (header.column.columnDef as any).align ??
                                'start',
                              alignItems: 'center',
                              userSelect: 'none',
                              cursor: header.column.getCanSort()
                                ? 'pointer'
                                : 'default',
                              fontSize: 14,
                              lineHeight: '24px',
                              fontWeight: 500,
                              color: header.column.getIsSorted()
                                ? 'var(--content-primary)'
                                : 'var(--content-secondary)',
                              '&:hover': {
                                color: 'var(--content-primary)',
                              },
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <SortAsc style={{ marginLeft: 8 }} />,
                              desc: <SortDesc style={{ marginLeft: 8 }} />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </styled.div>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}

function renderCell(key: string, row: any, renderAs: RenderAs = 'text') {
  if (renderAs === 'badge')
    return (
      <Badge
        color={key === 'id' ? 'informative-muted' : 'auto-muted'}
        copyValue={key === 'id' ? row[key] : undefined}
      >
        {row[key]}
      </Badge>
    )

  if (renderAs === 'avatar') {
    const value = row[key]

    if (value.length > 2) {
      return <Thumbnail src={value} />
    }

    return <Thumbnail text={value} />
  }

  if (
    renderAs === 'date' ||
    renderAs === 'date-time' ||
    renderAs === 'date-time-human' ||
    renderAs === 'date-time-text'
  ) {
    return (
      <span style={{ fontSize: 14, lineHeight: '24px', fontWeight: 500 }}>
        {prettyDate(row[key], renderAs)}
      </span>
    )
  }

  if (
    renderAs === 'number-short' ||
    renderAs === 'number-human' ||
    renderAs === 'number-ratio' ||
    renderAs === 'number-bytes' ||
    renderAs === 'number-euro' ||
    renderAs === 'number-dollar' ||
    renderAs === 'number-pound'
  ) {
    return (
      <span style={{ fontSize: 14, lineHeight: '24px', fontWeight: 500 }}>
        {prettyNumber(row[key], renderAs)}
      </span>
    )
  }

  if (typeof renderAs === 'function') return renderAs(row)

  if (typeof row[key] === 'object') {
    ;<span style={{ fontSize: 14, lineHeight: '24px', fontWeight: 500 }}>
      {JSON.stringify(row[key])}
    </span>
  }

  return (
    <span style={{ fontSize: 14, lineHeight: '24px', fontWeight: 500 }}>
      {row[key]}
    </span>
  )
}

function generateColumDefinitionsFromData(element: any) {
  let columnDefinitions = Object.entries(element).map(([key, value]) => {
    const columnDefinition: TableColumn = {
      key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    }

    if (value instanceof Date || key === 'createdAt' || key === 'updatedAt') {
      columnDefinition.renderAs = 'date-time-human'
    }

    if (key === 'id') {
      columnDefinition.header = 'ID'
      columnDefinition.renderAs = 'badge'
    }

    if (key === 'price') {
      columnDefinition.renderAs = 'number-euro'
    }

    if (key === 'bytes' || key === 'size') {
      columnDefinition.renderAs = 'number-bytes'
    }

    if (
      key === 'avatar' ||
      key === 'image' ||
      key === 'img' ||
      key === 'logo'
    ) {
      columnDefinition.renderAs = 'avatar'
    }

    if (key === 'status') {
      columnDefinition.renderAs = 'badge'
    }

    return columnDefinition
  })

  //   const maybeNameIndex = columnDefinitions.findIndex(
  //     (e) => e.key === "name" || e.key === "title"
  //   );
  //   const maybeImageIndex = columnDefinitions.findIndex(
  //     (e, i) => e.renderAs === "image" && Math.abs(maybeNameIndex - i) < 2
  //   );

  //   if (maybeNameIndex > -1 && maybeImageIndex > -1) {
  //     const nameColumn = columnDefinitions[maybeNameIndex];
  //     const imageColumn = columnDefinitions[maybeImageIndex];

  //     columnDefinitions = columnDefinitions.filter(
  //       (_, i) => i !== maybeImageIndex
  //     );

  //     columnDefinitions[
  //       columnDefinitions.findIndex((e) => e.key === "name" || e.key === "title")
  //     ].renderAs = (row) => (
  //       <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
  //         <Thumbnail color="neutral" size="small" src={row[imageColumn.key]} />
  //         <Text>{row[nameColumn.key]}</Text>
  //       </div>
  //     );
  //   }

  return columnDefinitions
}
