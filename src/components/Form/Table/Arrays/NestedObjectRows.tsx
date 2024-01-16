import React, { ReactNode, useRef, useState } from 'react'
import {
  Stack,
  border,
  color,
  Button,
  IconChevronDown,
  IconChevronRight,
  Badge,
  IconClose,
} from '../../../../index.js'
import { getIdentifierField, isIterable, readParentType } from '../../utils.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field.js'
import { RowProps } from './types.js'

export function NestedObjectRows(p: RowProps) {
  const [openCnt, setIndex] = useState<number>(0)
  const openIndexes = useRef<Set<number>>(new Set())

  const rows: ReactNode[] = []

  const field =
    p.field.values.type === 'object' && getIdentifierField(p.field.values)

  for (let i = 0; i < p.value.value.length; i++) {
    const isOpen = openIndexes.current.has(i)
    const item = p.value?.[i]
    const title: ReactNode = field ? item?.[field] : p.field.values.title

    rows.push(
      // @ts-ignore TODO: fix type in inlines
      <Stack
        key={'_' + i + 1}
        onClick={() => {
          if (isOpen) {
            openIndexes.current.delete(i)
          } else {
            openIndexes.current.add(i)
          }
          setIndex(openCnt + 1)
        }}
        justify="start"
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
              border: '1px solid red',
              opacity: '1 !important',
            },
          },
        }}
      >
        <Cell
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
              <Badge color="neutral-muted">{i + 1}</Badge>
              {title}
            </Stack>
            <Stack fitContent justify="end" gap={8}>
              <Button
                variant="icon-only"
                style={{ opacity: 0 }}
                onClick={() => {
                  p.removeItem(i)
                }}
              >
                <IconClose />
              </Button>
              {isIterable(p.field.values) ? (
                <Badge color="neutral-muted">
                  {item?.length} Item
                  {item?.length === 1 ? '' : 's'}
                </Badge>
              ) : null}
            </Stack>
          </Stack>
        </Cell>
      </Stack>
    )
    if (isOpen) {
      rows.push(
        <Stack justify="start" key={i}>
          <Cell>
            <Field ctx={p.ctx} path={[...p.path, i]} />
          </Cell>
        </Stack>
      )
    }
  }

  return rows
}
