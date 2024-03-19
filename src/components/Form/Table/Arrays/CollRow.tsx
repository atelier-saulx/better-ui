import React, { ReactNode } from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { ColSizes, Path, TableCtx } from '../../types.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field/index.js'
import { styled } from 'inlines'
import { DragableRow } from '../DragableRow.js'
import { IconCheckSmall } from '../../../Icons/index.js'
import { border, color } from '../../../../utils/colors.js'
import { Stack } from '../../../Stack/index.js'

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  isLoading?: boolean
  index: number
  selected?: boolean
  onSelect?: (selected: any, all: boolean) => void
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
      <Stack
        key="_select"
        style={{
          width: 28,
          height: 28,
          minWidth: 28,
        }}
      >
        <div />
        <Stack
          onClick={(e) => {
            p.onSelect(p.value, false)
            e.stopPropagation()
            e.preventDefault()
          }}
          justify="center"
          style={{
            width: 20,
            minHeight: 20,
            height: 20,
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
        </Stack>
      </Stack>,
    )
  }

  for (const field of p.colFields) {
    if (p.isLoading) {
      cells.push(
        <Cell
          border
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
