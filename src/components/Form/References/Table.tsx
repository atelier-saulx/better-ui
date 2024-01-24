import * as React from 'react'
import { styled } from 'inlines'
import { Stack, Button, Text, IconPlus, useSize } from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'
import {
  BasedSchemaFieldArray,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
} from '@based/schema'
import { getColSizes } from '../getColSizes.js'
import { ObjectCollsRows } from '../Table/Arrays/ObjectCollumnRows.js'
import { ValueRef } from '../Table/Arrays/types.js'

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
  onNew: () => Promise<any>
  onRemove: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  readOnly: boolean
  path: Path
  changeIndex: (fromIndex: number, toIndex: number) => void
}) => {
  const { value } = valueRef

  const cols: React.ReactNode[] = [,]
  const hasFields: Set<string> = new Set(['id'])
  const [width, setWidth] = React.useState(0)
  const sizeRef = useSize(({ width }) => {
    setWidth(width - 64 * 2)
  })
  for (const v of value) {
    if (typeof v === 'object') {
      for (const k in v) {
        if (typeof v[k] !== 'object') {
          hasFields.add(k)
        }
      }
    }
  }
  const fields: string[] = []
  if (
    hasFields.size < 3 ||
    (hasFields.size === 3 && hasFields.has('id') && hasFields.has('src'))
  ) {
    return (
      <>
        <styled.div style={{ marginTop: -24 }} />
        <References variant="small" ctx={ctx} path={path} />
      </>
    )
  }

  // Generate schema if none can be found
  const objectSchema: BasedSchemaFieldObject = {
    type: 'object',
    properties: {},
  }
  for (const key of hasFields.values()) {
    fields.push(key)
    if (/(date)|(time)|(createdAt)|(lastUpdated)|(birthday)/i.test(key)) {
      objectSchema.properties[key] = {
        type: 'timestamp',
        display: 'human',
      }
    } else {
      objectSchema.properties[key] = {
        type: 'string',
        format: key === 'id' ? 'basedId' : null, //ass some more options here...
        contentMediaType: key === 'src' ? 'image/*' : null,
      }
    }
  }

  const colFields = getColSizes(objectSchema, width, true)

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

  // @ts-ignore
  // field.values = objectSchema
  // pass new ctx (deal with this in a way) also add readOnly from the top

  const nField: BasedSchemaFieldArray = {
    type: 'array',
    values: objectSchema,
    readOnly: true,
  }

  const newCtx: TableCtx = {
    ...ctx,
    fieldOverrides: {
      [path.join('.')]: nField,
    },
  }

  // fix onClick
  console.log(onClickReference, readOnly)

  return (
    <Stack ref={sizeRef} justify="start" align="start" direction="column">
      <ColStack header>{cols}</ColStack>
      <ObjectCollsRows
        // add this like an action
        onClickRow={(v: any) => onClickReference(v)}
        draggable={field.sortable}
        value={valueRef}
        ctx={newCtx}
        changeIndex={changeIndex}
        removeItem={onRemove}
        path={path}
        colFields={colFields}
        field={nField} // allow refs...
      />
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
    </Stack>
  )
}
