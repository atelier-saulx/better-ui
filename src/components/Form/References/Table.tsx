import * as React from 'react'
import { styled, Style } from 'inlines'
import {
  Button,
  Text,
  IconPlus,
  IconArrowDown,
  IconArrowUp,
  IconSortAsc,
  IconSortDesc,
  IconChevronDown,
  IconSmallChevronTop,
  IconChevronDownSmall,
  IconArrowheadDown,
  IconArrowheadUp,
  Pagination,
} from '../../../index.js'
import { Path, TableCtx, Reference, TableSort } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
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
import { getTitle } from '../utils.js'

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
  onSelect,
  selected,
  changeIndex,
  alwaysUseCols,
  sortByFields,
  fieldSchema,
  isBlock,
  style,
  isLoading,
}: {
  style?: Style
  onSelect?: (val: any) => void
  selected?: Set<string>
  isLoading?: boolean
  pagination?: Pagination
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

  if (onSelect) {
    cols.push(
      <styled.div style={{ minWidth: 28, maxWidth: 28 }} key="_sicon" />,
    )
  }

  for (const f of colFields) {
    const title = getTitle(f.key, f.field)
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
            <IconArrowheadDown />
          ) : (
            <IconArrowheadUp />
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
            <Text singleLine>{title}</Text>
          </Button>
        </Cell>,
      )
    } else {
      cols.push(
        <Cell border isKey key={f.key} width={f.width} flexible={f.flexible}>
          <Text singleLine>{title}</Text>
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

  // onSelect

  return (
    <SizedStack
      field={fieldSchema}
      readOnly={readOnly}
      setColumns={setColumns}
      correction={(field.sortable ? 28 : 0) + (onSelect ? 28 : 0)}
      alwaysUseCols
      style={{
        // auto height
        height: pagination?.type === 'scroll' ? '100%' : 'auto',
        ...style,
      }}
    >
      <ColStack header noRemove={!onRemove}>
        {cols}
      </ColStack>
      <TableBody
        onSelect={onSelect}
        selected={selected}
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
