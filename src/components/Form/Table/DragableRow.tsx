import React, { ReactNode, useState, useRef, useCallback } from 'react'
import { BasedSchemaFieldObject } from '@based/schema'
import { styled } from 'inlines'
import {
  Stack,
  border,
  color,
  Text,
  Badge,
  borderRadius,
  Media,
} from '../../../index.js'
import { Path, TableCtx } from '../types.js'
import { ColStack } from './ColStack.js'
import { render } from 'react-dom'
import { IconDrag } from '../IconDrag.js'
import { getIdentifierField } from '../utils.js'

// tmp
let draggingIndex = 0

type DragRefValue = {
  elem?: HTMLElement
  name: string
  src: string
  index: number
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
}

type DragRef = React.MutableRefObject<DragRefValue>

type DragableRowProps = {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  index: number
  value: any
  cells: ReactNode[]
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
      <Badge>{ref.current.index + 1}</Badge>
      {ref.current.src ? <Media src={ref.current.src} /> : null}
      <Text variant="body-bold">{ref.current.name}</Text>
    </Stack>,
    elem
  )
  document.body.appendChild(elem)
  e.dataTransfer.setDragImage(elem, 0, 0)
  e.dataTransfer.setData('text/plain', String(ref.current.index))
  draggingIndex = ref.current.index
}

const DraggableColStack = (p: DragableRowProps) => {
  const ref = useRef<DragRefValue>({
    index: p.index,
    name: '',
    src: '',
    removeItem: p.removeItem,
    changeIndex: p.changeIndex,
  })
  const [isDragOver, setDragOver] = useState(0)

  const key = getIdentifierField(p.field)

  if (p.value) {
    ref.current.name = key ? p.value[key] : ''
    ref.current.src = p.value.src ?? ''
  }

  return (
    <styled.div
      style={{
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
          setDragOver(draggingIndex > ref.current.index ? -1 : 1)
        }
      }, [])}
      onDragLeave={useCallback(() => {
        setDragOver(0)
      }, [])}
      onDragExit={useCallback(() => {
        setDragOver(0)
      }, [])}
    >
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
      <ColStack
        style={{
          borderBottom: border(),
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
    </styled.div>
  )
}

export const DragableRow = (p: DragableRowProps) => {
  if (!p.draggable) {
    return (
      <ColStack
        onRemove={() => {
          p.removeItem(p.index)
        }}
        style={{
          borderBottom: border(),
        }}
      >
        {p.cells}
      </ColStack>
    )
  }
  return <DraggableColStack {...p} />
}
