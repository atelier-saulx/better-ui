import * as React from 'react'
import { styled } from 'inlines'
import {
  Button,
  Text,
  IconPlus,
  ScrollArea,
  IconArrowDown,
  color,
  IconArrowUp,
} from '../../../index.js'
import { Path, TableCtx, Reference, TableSort } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'
import {
  BasedSchemaFieldArray,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { ObjectCollsRows } from '../Table/Arrays/ObjectCollumnRows.js'
import { ValueRef } from '../Table/Arrays/types.js'
import { SizedStack, useColumns } from '../Table/SizedStack.js'
import {
  genObjectSchema,
  genObjectSchemaFromSchema,
} from './genObjectSchema.js'

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
  onScroll,
  path,
  onRemove,
  field,
  onClickReference,
  changeIndex,
  alwaysUseCols,
  sortByFields,
}: {
  sortByFields?: TableSort
  onScroll?: () => void
  field: BasedSchemaFieldReferences
  valueRef: ValueRef
  onNew?: () => Promise<any>
  onRemove?: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  path: Path
  alwaysUseCols?: boolean
  changeIndex: (fromIndex: number, toIndex: number) => void
}) => {
  const readOnly = field.readOnly || ctx.editableReferences ? false : true

  const fieldSchema = ctx.schema
    ? genObjectSchemaFromSchema(valueRef.value, field, ctx.schema)
    : genObjectSchema(valueRef.value)

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
    values: fieldSchema,
    readOnly,
  }

  const newCtx: TableCtx = {
    ...ctx,
    readOnly,
    fieldOverrides: {
      [path.join('.')]: nField,
    },
  }

  let objectCols = (
    <ObjectCollsRows
      onClickRow={(v: any) => onClickReference(v)}
      draggable={field.sortable}
      value={valueRef}
      ctx={newCtx}
      changeIndex={changeIndex}
      removeItem={onRemove}
      path={path}
      colFields={colFields}
      field={nField}
      // scroll bar here
    />
  )

  // OPTION: can add onScroll automaticly in the form if larger > 10 items for example
  if (onScroll) {
    objectCols = (
      <ScrollArea
        style={{
          flexGrow: 0,
          maxHeight: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* pretty nasty hack... */}
        <styled.div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {objectCols}
        </styled.div>
      </ScrollArea>
    )
  }

  return (
    <SizedStack
      field={fieldSchema}
      readOnly={readOnly}
      setColumns={setColumns}
      alwaysUseCols={alwaysUseCols}
      style={{
        height: onScroll ? '100%' : 'auto',
      }}
    >
      {/* add menu as option in header */}
      <ColStack header noRemove={!onRemove}>
        {cols}
      </ColStack>

      {objectCols}

      {/* if scrollable add this on top */}
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
