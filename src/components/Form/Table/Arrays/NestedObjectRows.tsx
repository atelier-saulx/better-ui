import React, { ReactNode, useRef, useState } from 'react'
import {
  Stack,
  border,
  color,
  IconChevronDown,
  IconChevronRight,
  Badge,
} from '../../../../index.js'
import { isIterable, readInfoField, readParentType } from '../../utils.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field/index.js'
import { RowProps } from './types.js'
import { DragableRow } from '../DragableRow.js'

export function NestedObjectRows(p: RowProps) {
  const [openCnt, setIndex] = useState<number>(0)
  const openIndexes = useRef<Set<number>>(new Set())

  const rows: ReactNode[] = []

  for (let i = 0; i < p.value.value.length; i++) {
    const isOpen = openIndexes.current.has(i)
    const item = p.value.value?.[i]
    const title: ReactNode = readInfoField(item, p.field.values)

    rows.push(
      <DragableRow
        {...p}
        index={i}
        draggable
        key={'_' + i + 1}
        onClick={() => {
          if (isOpen) {
            openIndexes.current.delete(i)
          } else {
            openIndexes.current.add(i)
          }
          setIndex(openCnt + 1)
        }}
        removeItem={p.removeItem}
        style={{
          userSelect: 'none',
          cursor: 'pointer',
          background: color('background', 'muted'),
          borderBottom: border(),
          '&:hover button': {
            opacity: '1 !important',
          },
          '&:hover': {
            background: color('background', 'neutral'),
            '.remove': {
              opacity: '1 !important',
            },
          },
        }}
        cells={[
          <Cell
            key={0}
            isKey
            style={{
              paddingLeft: readParentType(p.ctx, p.path) === 'array' ? 30 : 20,
            }}
          >
            {isOpen ? (
              <IconChevronDown
                style={{
                  marginRight: 8,
                }}
              />
            ) : (
              <IconChevronRight
                style={{
                  marginRight: 8,
                }}
              />
            )}
            <Stack gap={16} style={{ paddingRight: 12 }}>
              <Stack gap={16} justify="start">
                <Badge color="neutral-muted">{i}</Badge>
                {title}
              </Stack>
              <Stack fitContent justify="end" gap={8}>
                {isIterable(p.field.values) ? (
                  <Badge color="neutral-muted">
                    {item?.length} Item
                    {item?.length === 1 ? '' : 's'}
                  </Badge>
                ) : null}
              </Stack>
            </Stack>
          </Cell>,
        ]}
      />,
    )
    if (isOpen) {
      rows.push(
        <Stack justify="start" key={i}>
          <Cell>
            <Field ctx={p.ctx} path={[...p.path, i]} />
          </Cell>
        </Stack>,
      )
    }
  }

  return rows
}
