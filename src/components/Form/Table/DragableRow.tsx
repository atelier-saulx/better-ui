import React, { ReactNode, useState, useRef, useCallback } from 'react'
import { BasedSchemaField } from '@based/schema'
import { styled, Style } from 'inlines'
import {
  Stack,
  border,
  color,
  Text,
  borderRadius,
  isSafari,
} from '../../../index.js'
import { Path, TableCtx } from '../types.js'
import { ColStack } from './ColStack.js'
import { render } from 'react-dom'
import { IconDrag } from '../IconDrag.js'
import { getIdentifierField, readPath } from '../utils.js'
import { json2csv } from 'json-2-csv'

let draggingIndex = 0

type DragRefValue = {
  elem?: HTMLElement
  name: string
  index: number
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  leaveTimeout?: ReturnType<typeof setTimeout>
  p: DragableRowProps
}

type DragRef = React.MutableRefObject<DragRefValue>

type DragableRowProps = {
  field: BasedSchemaField
  ctx: TableCtx
  path: Path
  index: number
  header?: boolean
  value: any
  cells: ReactNode[]
  style?: Style
  draggable?: boolean
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  onClick?: () => void
}

const dragHandler = (e: DragEvent, ref: DragRef) => {
  const elem = (ref.current.elem = document.createElement('div'))
  elem.id = 'drag-ghost'
  elem.style.position = 'absolute'
  elem.style.top = '-1000px'
  elem.style.paddingLeft = '32px'

  // const f = ref.current.p.field

  const { value } = readPath(ref.current.p.ctx, [
    ...ref.current.p.path,
    ref.current.p.index,
  ])

  render(
    <styled.div
      style={{
        width: 200,
        transform: `translate(-10px,0px)`,
      }}
    >
      <Stack
        gap={4}
        justify="start"
        style={{
          background: color('background', 'screen'),
          height: 48,
          paddingLeft: 16,
          overflow: 'hidden',
          width: 250,
          paddingRight: 16,
          borderRadius: borderRadius('small'),
        }}
      >
        <Text>FLAP</Text>
      </Stack>
    </styled.div>,
    elem,
  )

  console.log(ref)
  // overlay

  document.body.appendChild(elem)

  // @ts-ignore
  e.dataTransfer.setDragImage(elem, 0, 0)

  e.dataTransfer.setData('text/plain', json2csv(value))

  // e.dataTransfer.setData('text/plain', String(ref.current.index))
  draggingIndex = ref.current.index
}

const DraggableColStack = (p: DragableRowProps) => {
  const ref = useRef<DragRefValue>({
    index: p.index,
    name: '',
    removeItem: p.removeItem,
    changeIndex: p.changeIndex,
    p,
  })

  ref.current.p = p

  const [isDragOver, setDragOver] = useState(0)

  if (p.field.type === 'object') {
    const key = getIdentifierField(p.field)
    if (p.value) {
      ref.current.name = key ? p.value[key] : ''
    }
  } else {
    ref.current.name = ''
  }

  const safari = isSafari()

  React.useEffect(() => {
    return () => {
      clearTimeout(ref.current.leaveTimeout)
    }
  }, [])

  return (
    <styled.div
      style={{
        background: color('background', 'screen'),

        width: '100%',
      }}
      onClick={p.onClick}
      onDrop={useCallback((e) => {
        e.preventDefault()
        ref.current.changeIndex(draggingIndex, p.index)
        setDragOver(0)
      }, [])}
      onDragOver={useCallback((e) => {
        e.preventDefault()
        if (draggingIndex !== ref.current.index) {
          clearTimeout(ref.current.leaveTimeout)
          setDragOver(draggingIndex > ref.current.index ? -1 : 1)
        }
      }, [])}
      onDragLeave={useCallback(() => {
        clearTimeout(ref.current.leaveTimeout)
        ref.current.leaveTimeout = setTimeout(() => {
          setDragOver(0)
        }, 20)
      }, [])}
      onDragExit={useCallback(() => {
        clearTimeout(ref.current.leaveTimeout)
        setDragOver(0)
      }, [])}
    >
      {safari ? null : (
        <Stack
          style={{
            height: isDragOver === -1 ? 24 : 0,
            width: '100%',
            overflow: 'hidden',
            transition: 'height 0.2s',
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
      )}
      <ColStack
        header={p.header}
        style={{
          boxShadow:
            isDragOver && safari
              ? 'inset 0px 2px ' + color('interactive', 'primary')
              : '',
          borderBottom: border(),
          ...p.style,
        }}
        onRemove={useCallback(() => {
          ref.current.removeItem(p.index)
        }, [])}
      >
        <styled.div
          draggable
          onDragStart={useCallback((e) => {
            dragHandler(e, ref)
          }, [])}
          onDragEnd={useCallback(() => {
            document.body.removeChild(ref.current.elem)
          }, [])}
        >
          <IconDrag />
        </styled.div>
        {p.cells}
      </ColStack>
      {safari ? null : (
        <Stack
          style={{
            height: isDragOver === 1 ? 24 : 0,
            overflow: 'hidden',
            width: '100%',
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
      )}
    </styled.div>
  )
}

export const DragableRow = (p: DragableRowProps) => {
  if (!p.draggable) {
    return (
      <ColStack
        hover
        onRemove={
          p.removeItem
            ? () => {
                p.removeItem(p.index)
              }
            : null
        }
        style={{
          borderBottom: border(),
        }}
        onClick={p.onClick}
      >
        {p.cells}
      </ColStack>
    )
  }
  return <DraggableColStack {...p} />
}
