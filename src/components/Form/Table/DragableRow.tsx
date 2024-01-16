import React, { ReactNode, useState, useRef } from 'react'
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

let draggingIndex = 0

export const DragableRow = (p: {
  field: BasedSchemaFieldObject
  ctx: TableCtx
  path: Path
  index: number
  removeItem: (index: number) => void
  changeIndex: (fromIndex: number, toIndex: number) => void
  value: any
  cells: ReactNode[]
  name?: string
  src?: string
  onClick?: () => void
}) => {
  const i = p.index
  const ref2 = useRef<HTMLElement>()
  const [isDragOver, setDragOver] = useState(0)

  let name: string = p.name ?? ''
  let src: string = p.src ?? ''

  return (
    <styled.div
      style={{
        width: '100%',
      }}
      onClick={p.onClick}
      onDrop={(e) => {
        e.preventDefault()
        // const d = e.dataTransfer.getData('text/plain')
        p.changeIndex(draggingIndex, p.index)
        setDragOver(0)
      }}
      onDragOver={(e) => {
        e.preventDefault()
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
        onDrop={() => {
          // console.info('??????????')
        }}
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
            e.dataTransfer.setData('text/plain', p.index)
            draggingIndex = p.index
          }}
          onDragEnd={() => {
            document.body.removeChild(ref2.current)
          }}
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
