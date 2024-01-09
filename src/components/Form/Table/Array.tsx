import React, { ReactNode, useState, useRef } from 'react'
import { BasedSchemaFieldArray, BasedSchemaFieldObject } from '@based/schema'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Button,
  IconChevronDown,
  IconChevronRight,
  IconPlus,
  Badge,
  IconClose,
  IconDragDropHorizontal,
  ButtonProps,
} from '../../../index.js'
import { Path, TableCtx, TableProps } from '../types.js'
import {
  getIdentifierField,
  isIterable,
  readParentType,
  readPath,
  useCols,
  isSmallField,
  getTitle,
  createNewEmptyValue,
} from '../utils.js'
import { Cell } from './Cell.js'
import { Field } from './Field.js'
import { ColStack } from './ColStack.js'

const IconDrag = (p: ButtonProps) => {
  return (
    <Button
      variant="icon-only"
      style={
        p.style ?? {
          opacity: 0.5,
          marginLeft: 8,
          '&:hover': {
            opacity: 1,
          },
          marginRight: 0,
          cursor: 'grab',
        }
      }
      {...p}
    >
      <IconDragDropHorizontal />
    </Button>
  )
}

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  index: number
  removeItem: (index: number) => void
}) => {
  const i = p.index
  const cells: ReactNode[] = []

  const ref = useRef<HTMLElement>()
  const ref2 = useRef<HTMLElement>()

  for (const key in p.field.properties) {
    cells.push(
      <Cell border key={key}>
        <Field ctx={p.ctx} path={[...p.path, i, key]} />
      </Cell>
    )
  }

  return (
    <ColStack
      ref={ref}
      onRemove={() => {
        p.removeItem(i)
      }}
      style={{
        borderBottom: border(),
      }}
      onDragStart={(e) => {
        const elem = (ref2.current = document.createElement('div'))
        elem.id = 'drag-ghost'
        elem.innerHTML = `<div style="padding:12px;background:${color(
          'background',
          'neutral'
        )}">Dragging ${i}</div>`
        elem.style.position = 'absolute'
        elem.style.top = '-1000px'
        elem.style.paddingLeft = '32px'
        document.body.appendChild(elem)
        e.dataTransfer.setDragImage(elem, 0, 0)
      }}
      onDragEnd={() => {
        document.body.removeChild(ref2.current)
        ref.current.draggable = false
      }}
    >
      <IconDrag
        onPointerDown={() => {
          ref.current.draggable = true
        }}
      />
      {cells}
    </ColStack>
  )
}

export function Array({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const rows: ReactNode[] = []
  const cols: ReactNode[] = []
  const isCols = valuesField.type === 'object' && useCols(valuesField)
  const [openIndex, setIndex] = useState(0)

  const valueRef = useRef<typeof value>()
  valueRef.current = value

  const addNew = React.useCallback(async () => {
    ctx.listeners.onChangeHandler(ctx, path, [
      ...valueRef.current,
      createNewEmptyValue(field.values),
    ])
  }, [])

  const removeItem = (index: number) => {
    const nValue = [...valueRef.current]
    nValue.splice(index, 1)
    ctx.listeners.onChangeHandler(ctx, path, nValue)
  }

  if (isCols) {
    cols.unshift(<div style={{ minWidth: 28 }} key="_dicon" />)
    for (const key in valuesField.properties) {
      cols.push(
        <Cell border isKey key={key}>
          {getTitle(key, valuesField.properties[key])}
        </Cell>
      )
    }
    if (value) {
      for (let i = 0; i < value.length; i++) {
        rows.push(
          <CollRow
            key={i}
            field={valuesField}
            index={i}
            ctx={ctx}
            path={path}
            removeItem={removeItem}
          />
        )
      }
    }
  } else if (value) {
    if (isSmallField(valuesField)) {
      for (let i = 0; i < value.length; i++) {
        rows.push(
          <ColStack
            justify="start"
            key={i}
            style={{
              borderBottom: border(),
            }}
            onRemove={() => removeItem(i)}
          >
            <Cell>
              <Field ctx={ctx} path={[...path, i]} />
            </Cell>
          </ColStack>
        )
      }
    } else {
      const field =
        valuesField.type === 'object' && getIdentifierField(valuesField)

      for (let i = 0; i < value.length; i++) {
        const isOpen = openIndex === i
        const item = value?.[i]
        const title: ReactNode = field ? item?.[field] : valuesField.title

        rows.push(
          // @ts-ignore TODO: fix type in inlines
          <Stack
            key={'_' + i + 1}
            onClick={() => {
              setIndex(isOpen ? -1 : i)
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
                paddingLeft: readParentType(ctx, path) === 'array' ? 30 : 20,
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
                      removeItem(i)
                    }}
                  >
                    <IconClose />
                  </Button>
                  {isIterable(valuesField) ? (
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
                <Field ctx={ctx} path={[...path, i]} />
              </Cell>
            </Stack>
          )
        }
      }
    }
  }

  return (
    <Stack
      justify="start"
      align="start"
      direction="column"
      style={{
        borderBottom: path.length > 1 ? border() : null,
      }}
    >
      {cols.length ? (
        <ColStack
          header
          style={{
            background: color('background', 'muted'),
            borderBottom: border(),
          }}
        >
          {cols}
        </ColStack>
      ) : null}
      {rows}
      <styled.div style={{ marginTop: 8, marginBottom: 8 }}>
        <Button
          size="small"
          variant="neutral-transparent"
          prefix={<IconPlus />}
          onClick={addNew}
        >
          Add
        </Button>
      </styled.div>
    </Stack>
  )
}
