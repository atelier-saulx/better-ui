import * as React from 'react'
import { styled } from 'inlines'
import {
  Stack,
  Button,
  Text,
  color,
  Badge,
  IconPlus,
  Media,
  useSize,
} from '../../../index.js'
import { Path, TableCtx, Reference } from '../types.js'
import { Cell } from '../Table/Cell.js'
import { ColStack } from '../Table/ColStack.js'
import humanizeString from 'humanize-string'
import { References } from './index.js'
import {
  BasedSchemaField,
  BasedSchemaFieldObject,
  BasedSchemaFieldReferences,
  display,
} from '@based/schema'
import { DragableRow } from '../Table/DragableRow.js'
import { FieldSchema } from '@based/ui'

const createColSizes = (fieldSchema: BasedSchemaFieldObject, width: number) => {
  let total = width
  let totalFlexFields = 0
  let spread = 0

  const percentageFields: {
    width?: number
    key: string
    field: BasedSchemaField
  }[] = []

  if (fieldSchema.properties.id) {
    percentageFields.push({
      key: 'id',
      width: 120,
      field: fieldSchema.properties.id,
    })
    total -= 120
  }

  for (const key in fieldSchema.properties) {
    if (key === 'id') {
      continue
    }

    if (total < 120) {
      break
    }

    const field = fieldSchema.properties[key]

    if (field.type === 'timestamp') {
      percentageFields.push({ key, width: 150, field })
      total -= 150
    } else if (field.type === 'number' || key === 'id') {
      percentageFields.push({ key, width: 120, field })
      total -= 120
    } else if (
      field.type === 'string' &&
      field.contentMediaType?.startsWith('image/')
    ) {
      percentageFields.push({ key, width: 52, field })
      total -= 52
    } else {
      percentageFields.push({ key, field })
      total -= 120
      totalFlexFields++
      spread += 120
    }
  }

  for (const f of percentageFields) {
    if (!f.width) {
      f.width = Math.floor((total + spread) / totalFlexFields)
    }
  }

  return percentageFields
}

const ImageTableStyle = (p: { children?: React.ReactNode }) => {
  return (
    <Cell
      border
      style={{
        width: 52,
        height: 48,
        paddingLeft: 8,
        paddingRight: 8,
        flexShrink: 0,
        flexGrow: 0,
      }}
    >
      {p.children ? (
        <styled.div
          style={{
            width: 36,
            height: 36,
            overflow: 'hidden',
            backgroundColor: color('background', 'neutral'),
            borderRadius: 4,
          }}
        >
          {p.children}
        </styled.div>
      ) : null}
    </Cell>
  )
}

const ImageTable = ({ value }: { value?: Reference }) => {
  if (typeof value === 'object' && 'src' in value) {
    return (
      <ImageTableStyle>
        <Media src={value.src} variant="cover" type={value.mimeType} />
      </ImageTableStyle>
    )
  }
  return <ImageTableStyle />
}

const CellContent = (p: {
  k: string
  value: any
  width: number
  field: FieldSchema
}) => {
  if (p.k === 'src') {
    return <ImageTable value={p.value} />
  }
  const fieldValue = p.value[p.k]
  return (
    <Cell border key={p.k} width={p.width}>
      <Stack
        justify={p.k === 'id' ? 'end' : 'start'}
        style={{
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        {p.k === 'id' ? (
          <Badge color="informative-muted">{fieldValue}</Badge>
        ) : (
          <Text singleLine style={{ width: p.width }}>
            {/* @ts-ignore */}
            {display(fieldValue, p.field) ?? ''}
          </Text>
        )}
      </Stack>
    </Cell>
  )
}

export const ReferencesTable = ({
  value,
  onNew,
  ctx,
  path,
  onRemove,
  field,
  onClickReference,
  changeIndex,
}: {
  field: BasedSchemaFieldReferences
  value: Reference[]
  onNew: () => Promise<any>
  onRemove: (index: number) => void
  onClickReference: (ref: Reference) => void
  ctx: TableCtx
  path: Path
  changeIndex: (fromIndex: number, toIndex: number) => void
}) => {
  const rows: React.ReactNode[] = []
  const cols: React.ReactNode[] = [,]
  const hasFields: Set<string> = new Set(['id'])

  const [width, setWidth] = React.useState(0)

  const sizeRef = useSize(({ width }) => {
    console.info(width)
    setWidth(width - 64 * 2) // -padding
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
        contentMediaType: key === 'src' ? 'image/*' : null,
      }
    }
  }

  const calculatedFields = createColSizes(objectSchema, width)

  if (field.sortable) {
    cols.unshift(<div style={{ minWidth: 28 }} key="_dicon" />)
  }

  for (const f of calculatedFields) {
    if (
      f.field.type === 'string' &&
      f.field.contentMediaType?.startsWith('image/')
    ) {
      cols.push(<ImageTable key={f.key} />)
    } else {
      cols.push(
        <Cell border={f.key !== 'id'} isKey key={f.key} width={f.width}>
          <Text singleLine>{humanizeString(f.key === 'id' ? '' : f.key)}</Text>
        </Cell>,
      )
    }
  }

  if (value) {
    for (let i = 0; i < value.length; i++) {
      const v =
        typeof value[i] === 'object' ? value[i] : { id: value[i] as string }
      rows.push(
        <DragableRow
          draggable={field.sortable}
          changeIndex={changeIndex}
          value={v}
          index={i}
          key={i}
          cells={calculatedFields.map(({ key, width, field }) => {
            return (
              <CellContent
                width={width}
                key={key}
                k={key}
                value={v}
                field={field}
              />
            )
          })}
          removeItem={onRemove}
          onClick={() => {
            onClickReference(v)
          }}
          field={objectSchema}
          ctx={ctx}
          path={path}
        />,
      )
    }
  }

  // return null;;

  return (
    <Stack ref={sizeRef} justify="start" align="start" direction="column">
      <ColStack header>{cols}</ColStack>
      {rows}
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
