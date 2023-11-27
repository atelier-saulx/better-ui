import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtual } from "@tanstack/react-virtual";
import { NumberFormat } from "@based/pretty-number";
import { DateFormat } from "@based/pretty-date";
import { useCallbackRef } from "../../utils/hooks/use-callback-ref";
import { SortAsc, SortDesc } from "../icons";
import { Badge } from "../badge";
import { Avatar } from "../avatar";
import { styled } from "inlines";

type RenderAs =
  | "badge"
  | "image"
  | "avatar"
  | "toggle"
  | NumberFormat
  | DateFormat
  | "strong"
  | "medium"
  | "normal"
  | ((row: any) => React.ReactNode);

type TableColumn = {
  key: string;
  header: string;
  renderAs?: RenderAs;
};

export type TableProps = {
  data: any;
  columns?: TableColumn[];
  onScrollToBottom?: () => void;
  onVisibleElementsChange?: (visibleElements: number[]) => void;
  rowAction?: (row: any) => React.ReactNode;
  onRowClick?: (row: any) => void;
};

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
              align: "end",
              id: "internal_row_action",
              header: "",
              renderAs: rowAction,
            },
          ]
        : []),
    ];
  }, [columnsProp, data]);

  const table = useReactTable({
    data,
    columns: columns.map((c) => {
      if ("id" in c) {
        return {
          id: c.id,
          header: c.header,
          cell: ({ row }) => c.renderAs(row.original),
        };
      }

      return {
        header: c.header,
        accessorKey: c.key,
        cell: ({ row }) => renderCell(c.key, row.original, c.renderAs),
      };
    }),
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const { rows } = table.getRowModel();

  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { totalSize, virtualItems } = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    estimateSize: React.useCallback(() => 61, []),
    overscan: 10,
  });

  const paddingTop =
    virtualItems.length > 0 ? virtualItems?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - (virtualItems?.[virtualItems.length - 1]?.end || 0)
      : 0;

  const onVisibleElementsChange = useCallbackRef(onVisibleElementsChangeProp);
  React.useEffect(() => {
    if (onVisibleElementsChange) {
      onVisibleElementsChange(virtualItems.map((e) => e.index));
    }
  }, [onVisibleElementsChange, virtualItems]);

  const onScrollToBottom = useCallbackRef(onScrollToBottomProp);
  const handleScroll = React.useCallback(
    (containerRefElement: HTMLDivElement) => {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

      if (onScrollToBottom) {
        if (scrollHeight - scrollTop - clientHeight < 300) {
          onScrollToBottom();
        }
      }
    },
    [onScrollToBottom]
  );
  const onRowClick = useCallbackRef(onRowClickProp);

  React.useLayoutEffect(() => {
    if (!scrollRef.current) return;

    function calculateOverflowInidcator() {
      if (!scrollRef.current) return;

      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;

      if (scrollLeft > 0 && scrollWidth - scrollLeft > clientWidth) {
        setShowOverflowIndicator("both");
      } else if (scrollWidth - scrollLeft > clientWidth) {
        setShowOverflowIndicator("right");
      } else if (scrollLeft > 0) {
        setShowOverflowIndicator("left");
      } else {
        setShowOverflowIndicator("none");
      }
    }

    window.addEventListener("resize", calculateOverflowInidcator);
    scrollRef.current.addEventListener("scroll", calculateOverflowInidcator);
    calculateOverflowInidcator();

    return () => {
      window.removeEventListener("resize", calculateOverflowInidcator);
      scrollRef.current?.removeEventListener(
        "scroll",
        calculateOverflowInidcator
      );
    };
  }, []);

  const [showOverflowIndicator, setShowOverflowIndicator] = React.useState<
    "left" | "right" | "both" | "none"
  >("none");

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <styled.div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to right, var(--background-screen) 0, transparent 60px)",
            backgroundSize: "200% 200%",
            backgroundPositionX: ["left", "both"].includes(
              showOverflowIndicator
            )
              ? "left"
              : "-60px",
          },
          "&:after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `linear-gradient(to left, var(--background-screen) 0, ${
              rowAction && "var(--background-screen) 42px, "
            } transparent 60px)`,
            backgroundSize: "200% 200%",
            backgroundPositionX: ["right", "both"].includes(
              showOverflowIndicator
            )
              ? "right"
              : "-60px",
          },
        }}
      />
      <div
        ref={scrollRef}
        style={{ height: "100%", width: "100%", overflow: "auto" }}
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
              height: "100%",
              width: "100%",
              borderCollapse: "separate",
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
                          onRowClick(row.original);
                        }
                      }}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            style={{
                              boxSizing: "border-box",
                              height: 61,
                              borderBottom:
                                index !== virtualItems.length - 1
                                  ? `1px solid var(--interactive-secondary)`
                                  : undefined,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                              ...(cell.column.columnDef.id ===
                              "internal_row_action"
                                ? {
                                    position: "sticky",
                                    right: 0,
                                  }
                                : {
                                    padding: "0 12px",
                                  }),
                            }}
                            key={cell.id}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent:
                                  (cell.column.columnDef as any).align ??
                                  "start",
                                alignItems: "center",
                              }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
            <thead
              style={{
                position: "sticky",
                top: 0,
                margin: 0,
                textAlign: "left",
                background: "var(--background-screen)",
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        style={{
                          padding: "0 12px",
                          height: 42,
                          boxSizing: "border-box",
                          borderTop: `1px solid var(--interactive-secondary)`,
                          borderBottom: `1px solid var(--interactive-secondary)`,
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            onClick={header.column.getToggleSortingHandler()}
                            style={{
                              display: "flex",
                              height: "100%",
                              justifyContent:
                                (header.column.columnDef as any).align ??
                                "start",
                              alignItems: "center",
                              userSelect: "none",
                              cursor: header.column.getCanSort()
                                ? "pointer"
                                : "default",
                              fontSize: 14,
                              lineHeight: "24px",
                              fontWeight: 500,
                              color: "var(--content-secondary)",
                            }}
                          >
                            {{
                              asc: <SortAsc style={{ marginRight: 8 }} />,
                              desc: <SortDesc style={{ marginRight: 8 }} />,
                            }[header.column.getIsSorted() as string] ?? null}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
}

function renderCell(key: string, row: any, renderAs: RenderAs = "normal") {
  if (renderAs === "badge")
    return (
      <Badge
        color={key === "id" ? "informative" : "auto"}
        copyable={key === "id"}
        style="muted"
      >
        {row[key]}
      </Badge>
    );
  if (renderAs === "avatar") {
    const value = row[key];

    if (value.length > 2) {
      return <Avatar src={value} />;
    }

    return <Avatar placeholder={value} />;
  }

  if (typeof renderAs === "function") return renderAs(row);

  //   let content = row[key];
  //   if (row[key] instanceof Date) {
  //     content = row[key].getTime();
  //   }
  //   if (typeof row[key] === "object") {
  //     content = JSON.stringify(row[key]);
  //   }

  //   return (
  //     <Text
  //       valueFormat={renderAs}
  //       light={renderAs?.includes?.("date") || renderAs?.includes?.("time")}
  //     >
  //       {content}
  //     </Text>
  //   );

  return (
    <span style={{ fontSize: 14, lineHeight: "24px", fontWeight: 500 }}>
      {row[key]}
    </span>
  );
}

function generateColumDefinitionsFromData(element: any) {
  let columnDefinitions = Object.entries(element).map(([key, value]) => {
    const columnDefinition: TableColumn = {
      key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    };

    if (value instanceof Date || key === "createdAt" || key === "updatedAt") {
      columnDefinition.renderAs = "date-time-human";
    }

    if (key === "id") {
      columnDefinition.header = "ID";
      columnDefinition.renderAs = "badge";
    }

    if (key === "price") {
      columnDefinition.renderAs = "number-euro";
    }

    if (key === "bytes" || key === "size") {
      columnDefinition.renderAs = "number-bytes";
    }

    if (
      key === "avatar" ||
      key === "image" ||
      key === "img" ||
      key === "logo"
    ) {
      columnDefinition.renderAs = "avatar";
    }

    if (key === "status") {
      columnDefinition.renderAs = "badge";
    }

    return columnDefinition;
  });

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

  return columnDefinitions;
}
