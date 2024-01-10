import React, { ReactNode, useState, useRef } from 'react'
import { BasedSchemaFieldArray, BasedSchemaFieldObject } from '@based/schema'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Text,
  Button,
  IconChevronDown,
  IconChevronRight,
  IconPlus,
  Badge,
  IconClose,
  IconDragDropHorizontal,
  ButtonProps,
  borderRadius,
  Media,
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
import { render } from 'react-dom'

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

let draggingIndex = 0

export const CollRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  index: number
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  value: any
}) => {
  // own drag handler + table index for seq
  // currentDragTarget (an fn on ctx)
  // ctx.getDragTarget = { path, field etc }
  // ctx.setDragTarget = { path, field etc }
  // ctx.id

  const i = p.index
  const cells: ReactNode[] = []

  const ref2 = useRef<HTMLElement>()

  const [isDragOver, setDragOver] = useState(0)

  let name: string = ''
  let src: string = ''

  for (const key in p.field.properties) {
    if (p.value) {
      if (key === 'name' || key === 'title') {
        name = p.value[key]
      } else if (key === 'src') {
        src = p.value.src
      }
    }

    cells.push(
      <Cell border key={key}>
        <Field ctx={p.ctx} path={[...p.path, i, key]} />
      </Cell>
    )
  }

  return (
    <styled.div
      style={{
        width: '100%',
      }}
      onDrop={() => {
        console.info('?!@!@!@?')
        p.changeIndex(draggingIndex, p.index)
        setDragOver(0)
      }}
      onDragOver={() => {
        if (draggingIndex !== p.index) {
          setDragOver(draggingIndex > p.index ? -1 : 1)
        }
      }}
      onDragLeave={() => {
        setDragOver(0)
      }}
      onDragExit={() => {
        setDragOver(0)
      }}
    >
      <Stack
        style={{
          height: isDragOver === -1 ? 24 : 0,
          width: '100%',
          overflow: 'hidden',
          transition: 'height 0.2s',
          // transitionDelay: '0.2s',
          borderBottom: isDragOver === -1 ? border() : null,
        }}
      >
        <styled.div
          style={{
            width: '100%',
            height: 2,
            opacity: isDragOver === -1 ? 1 : 0,
            transition: 'opacity 0.2s',
            backgroundColor: color('interactive', 'primary'),
          }}
        />
      </Stack>
      <ColStack
        onRemove={() => {
          p.removeItem(i)
        }}
        style={{
          borderBottom: border(),
        }}
      >
        <styled.div
          draggable
          onDragStart={(e) => {
            const elem = (ref2.current = document.createElement('div'))
            elem.id = 'drag-ghost'
            elem.style.position = 'absolute'
            elem.style.top = '-1000px'
            elem.style.paddingLeft = '32px'
            render(
              <Stack
                gap={4}
                justify="start"
                style={{
                  background: color('background', 'screen'),
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: borderRadius('small'),
                }}
              >
                <Badge>{i + 1}</Badge>
                {src ? <Media src={src} /> : null}
                <Text variant="body-bold">{name}</Text>
              </Stack>,
              elem
            )
            document.body.appendChild(elem)
            e.dataTransfer.setDragImage(elem, 0, 0)
            draggingIndex = p.index
          }}
          onDragEnd={() => {
            document.body.removeChild(ref2.current)
          }}
        >
          <IconDrag />
        </styled.div>
        {cells}
      </ColStack>
      <Stack
        style={{
          height: isDragOver === 1 ? 24 : 0,
          overflow: 'hidden',
          width: '100%',
          // transitionDelay: '0.2s',
          transition: 'height 0.2s',
          borderBottom: isDragOver === 1 ? border() : null,
        }}
      >
        <styled.div
          style={{
            width: '100%',
            height: 2,
            opacity: isDragOver === 1 ? 1 : 0,
            transition: 'opacity 0.2s',
            backgroundColor: color('interactive', 'primary'),
          }}
        />
      </Stack>
    </styled.div>
  )
}

export function Array({ ctx, path }: TableProps) {
  const { field, value } = readPath<BasedSchemaFieldArray>(ctx, path)
  const valuesField = field.values
  const rows: ReactNode[] = []
  const cols: ReactNode[] = []
  const isCols = valuesField.type === 'object' && useCols(valuesField)
  const [openCnt, setIndex] = useState<number>(0)
  const openIndexes = useRef<Set<number>>(new Set())

  const valueRef = useRef<typeof value>()
  valueRef.current = value

  const addNew = React.useCallback(async () => {
    ctx.listeners.onChangeHandler(ctx, path, [
      ...valueRef.current,
      createNewEmptyValue(field.values),
    ])
  }, [])

  const changeIndex = React.useCallback(
    async (fromIndex: number, toIndex: number) => {
      const n = [...valueRef.current]
      const target = n[fromIndex]
      n.splice(fromIndex, 1)
      n.splice(toIndex, 0, target)
      ctx.listeners.onChangeHandler(ctx, path, n)
    },
    []
  )

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
            changeIndex={changeIndex}
            key={i}
            value={value[i]}
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
        const isOpen = openIndexes.current.has(i)
        const item = value?.[i]
        const title: ReactNode = field ? item?.[field] : valuesField.title

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
