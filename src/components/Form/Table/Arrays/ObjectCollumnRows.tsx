import React, { ReactNode } from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { ColSizes, Path, TableCtx } from '../../types.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field/index.js'
import { RowProps } from './types.js'
import { styled } from 'inlines'
import { DragableRow } from '../DragableRow.js'
import { IconCheckSmall } from '../../../Icons/index.js'
import { border, color } from '../../../../utils/colors.js'
import { Stack } from '../../../Stack/index.js'

export const Selected = (p: { selected?: boolean; onSelect: () => void }) => {
  return (
    <Stack
      style={{
        width: 48,
        height: 28,
        minWidth: 48,
      }}
      justify="center"
    >
      <styled.div
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          p.onSelect()
        }}
        style={{
          width: 20,
          minHeight: 20,
          height: 20,
          marginLeft: 10,
          borderRadius: 4,
          minWidth: 20,
          border: border(),
          '&:hover': {
            border: border('focus'),
          },
        }}
      >
        <IconCheckSmall
          style={{
            color: color('interactive', 'primary'),
            opacity: p.selected ? 1 : 0,
          }}
        />
      </styled.div>
    </Stack>
  )
}

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  sticky?: boolean
  ctx: TableCtx
  path: Path
  isLoading?: boolean
  index: number
  selected?: boolean
  onSelect?: (selected: any, all?: boolean) => void
  onClickRow?: (val: any) => void
  colFields: ColSizes
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  value: any
  draggable?: boolean
}) => {
  const cells: ReactNode[] = []

  if (p.onSelect) {
    cells.push(
      <Selected
        key="_select"
        onSelect={() => {
          p.onSelect(p.value)
        }}
        selected={p.selected}
      />,
    )
  }

  for (const field of p.colFields) {
    // @ts-ignore
    const isSticky = field.field.sticky

    console.info(field)

    if (p.isLoading) {
      cells.push(
        <Cell
          border
          sticky={isSticky}
          key={field.key}
          width={field.width}
          flexible={field.flexible}
        >
          <styled.div />
        </Cell>,
      )
    } else {
      cells.push(
        <Cell
          border
          key={field.key}
          sticky={isSticky}
          width={field.width}
          flexible={field.flexible}
        >
          <Field ctx={p.ctx} path={[...p.path, p.index, field.key]} />
        </Cell>,
      )
    }
  }
  return (
    <DragableRow
      onClick={
        p.onClickRow
          ? () => {
              p.onClickRow(p.value)
            }
          : null
      }
      {...p}
      cells={cells}
    />
  )
}

const isSelected = (select: Set<string>, value: any) => {
  if (select.has('*')) {
    if (!select.has(value?.id)) {
      return true
    }
  } else {
    if (select.has(value?.id)) {
      return true
    }
  }
}

export const ObjectCollsRows = (
  p: RowProps & { colFields: ColSizes; isLoading?: boolean },
) => {
  const rows: ReactNode[] = []
  for (let i = 0; i < p.value.value.length; i++) {
    rows.push(
      <CollRow
        onSelect={p.onSelect}
        selected={p.selected ? isSelected(p.selected, p.value.value[i]) : false}
        colFields={p.colFields}
        changeIndex={p.changeIndex}
        key={p.value.orderId + '_' + i}
        value={p.value.value[i]}
        field={p.field.items as BasedSchemaFieldObject}
        index={i}
        isLoading={p.isLoading}
        onClickRow={p.onClickRow}
        ctx={p.ctx}
        path={p.path}
        draggable={p.draggable}
        removeItem={p.removeItem}
      />,
    )
  }
  return rows
}
