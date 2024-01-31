import * as React from 'react'
import { styled } from 'inlines'
import { Button, Text, IconPlus } from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'
import {
  BasedSchemaFieldArray,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { ObjectCollsRows } from '../Table/Arrays/ObjectCollumnRows.js'
import { ValueRef } from '../Table/Arrays/types.js'
import { SizedStack, useColumns } from '../Table/SizedStack.js'
import { genObjectSchema } from './genObjectSchema.js'

export const ReferencesTable = ({
  valueRef,
  onNew,
  ctx,
  path,
  onRemove,
  field,
  readOnly,
  onClickReference,
  changeIndex,
}: {
  field: BasedSchemaFieldReferences
  valueRef: ValueRef
  onNew?: () => Promise<any>
  onRemove?: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  readOnly: boolean
  path: Path
  changeIndex: (fromIndex: number, toIndex: number) => void
}) => {
  const fieldSchema = genObjectSchema(valueRef.value)
  const size = Object.keys(fieldSchema.properties).length
  const [colFields, setColumns] = useColumns()

  if (
    size < 3 ||
    (size === 3 &&
      'id' in fieldSchema.properties &&
      'src' in fieldSchema.properties)
  ) {
    return (
      <>
        <styled.div style={{ marginTop: -24 }} />
        <References variant="small" ctx={ctx} path={path} />
      </>
    )
  }

  const cols: React.ReactNode[] = [,]

  // add this 28 to corractable?
  if (field.sortable) {
    cols.unshift(
      <styled.div style={{ minWidth: 28, maxWidth: 28 }} key="_dicon" />,
    )
  }

  for (const f of colFields) {
    cols.push(
      <Cell border isKey key={f.key} width={f.width} flexible={f.flexible}>
        <Text singleLine>{humanizeString(f.key)}</Text>
      </Cell>,
    )
  }

  const nField: BasedSchemaFieldArray = {
    type: 'array',
    values: fieldSchema,
    readOnly: true,
  }

  const newCtx: TableCtx = {
    ...ctx,
    readOnly,
    fieldOverrides: {
      [path.join('.')]: nField,
    },
  }

  return (
    <SizedStack field={fieldSchema} readOnly setColumns={setColumns}>
      <ColStack header noRemove={!onRemove}>
        {cols}
      </ColStack>
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
      />
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
