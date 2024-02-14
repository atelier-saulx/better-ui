import * as React from 'react'
import { styled } from 'inlines'
import {
  Button,
  Text,
  IconPlus,
  IconArrowDown,
  IconArrowUp,
} from '../../../index.js'
import {
  Path,
  TableCtx,
  Reference,
  TableSort,
  TablePagination,
} from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'
import {
  BasedSchemaFieldArray,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { ValueRef } from '../Table/Arrays/types.js'
import { SizedStack, useColumns } from '../Table/SizedStack.js'
import { genObjectSchema } from './genObjectSchema.js'
import { TableBody } from './TableBody.js'

const useTags = (fieldSchema: BasedSchemaFieldObject): boolean => {
  const size = Object.keys(fieldSchema.properties).length
  return (
    size < 3 ||
    (size === 3 &&
      'id' in fieldSchema.properties &&
      'src' in fieldSchema.properties)
  )
}

export const ReferencesTable = ({
  valueRef,
  onNew,
  ctx,
  path,
  pagination,
  onRemove,
  field,
  onClickReference,
  changeIndex,
  alwaysUseCols,
  sortByFields,
  fieldSchema,
  isBlock,
  isLoading,
}: {
  isLoading?: boolean
  pagination?: TablePagination
  sortByFields?: TableSort
  field: BasedSchemaFieldReferences
  valueRef: ValueRef
  fieldSchema?: BasedSchemaFieldObject
  onNew?: () => Promise<any>
  onRemove?: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  path: Path
  alwaysUseCols?: boolean
  changeIndex: (fromIndex: number, toIndex: number) => void
  isBlock?: boolean
}) => {
  const readOnly = field.readOnly || ctx.editableReferences ? false : true

  const [height, setHeight] = React.useState(0)

  if (!fieldSchema) {
    fieldSchema = genObjectSchema(valueRef.value, field, ctx.schema)
  }

  const [colFields, setColumns] = useColumns()

  if (!alwaysUseCols && useTags(fieldSchema)) {
    return (
      <>
        <styled.div style={{ marginTop: -24 }} />
        <References variant="small" ctx={ctx} path={path} />
      </>
    )
  }

  const cols: React.ReactNode[] = [,]

  if (field.sortable) {
    cols.unshift(
      <styled.div style={{ minWidth: 28, maxWidth: 28 }} key="_dicon" />,
    )
  }

  for (const f of colFields) {
    if (
      sortByFields &&
      (sortByFields.include
        ? sortByFields.include.has(f.key)
        : !sortByFields.exclude?.has(f.key))
    ) {
      let prefix = null
      let dir: 'asc' | 'desc' = 'asc'
      if (sortByFields.sorted && sortByFields.sorted.key === f.key) {
        dir = sortByFields.sorted.dir
        prefix =
          sortByFields.sorted.dir === 'desc' ? (
            <IconArrowUp />
          ) : (
            <IconArrowDown />
          )
      }
      cols.push(
        <Cell border isKey key={f.key} width={f.width} flexible={f.flexible}>
          <Button
            variant="icon-only"
            prefix={prefix}
            onClick={() => {
              sortByFields.onSort(
                f.key,
                dir === 'desc' ? 'asc' : 'desc',
                sortByFields,
              )
            }}
          >
            <Text singleLine>{humanizeString(f.key)}</Text>
          </Button>
        </Cell>,
      )
    } else {
      cols.push(
        <Cell border isKey key={f.key} width={f.width} flexible={f.flexible}>
          <Text singleLine>{humanizeString(f.key)}</Text>
        </Cell>,
      )
    }
  }

  const nField: BasedSchemaFieldArray = {
    type: 'array',
    items: fieldSchema,
    readOnly,
  }

  const newCtx: TableCtx = {
    ...ctx,
    readOnly,
    fieldOverrides: {
      [path.join('.')]: nField,
    },
  }

  return (
    <SizedStack
      field={fieldSchema}
      readOnly={readOnly}
      setColumns={setColumns}
      alwaysUseCols={alwaysUseCols}
      style={{
        // auto height
        height: pagination?.type === 'scroll' ? '100%' : 'auto',
      }}
    >
      <ColStack header noRemove={!onRemove}>
        {cols}
      </ColStack>
      <TableBody
        isLoading={isLoading}
        pagination={pagination}
        onClickReference={onClickReference}
        field={field}
        valueRef={valueRef}
        ctx={newCtx}
        changeIndex={changeIndex}
        onRemove={onRemove}
        path={path}
        colFields={colFields}
        nField={nField}
        isBlock={isBlock}
      />
      {/* if scrollable add this on top ? */}
      {onNew ? (
        <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
          <Button
            onClick={onNew}
            size="small"
            variant="neutral-transparent"
            prefix={<IconPlus />}
          >
            Add
          </Button>
        </styled.div>
      ) : null}
    </SizedStack>
  )
}
