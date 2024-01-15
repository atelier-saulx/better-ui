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
} from '../../../../index.js'
import { Path, TableCtx } from '../../types.js'
import { Cell } from '../Cell.js'
import { Field } from '../Field.js'
import { ColStack } from '../ColStack.js'
import { render } from 'react-dom'
import { IconDrag } from './IconDrag.js'
import { RowProps } from './types.js'

let draggingIndex = 0

const CollRow = (p: {
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
    <div
      style={{
        width: '100%',
      }}
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
    </div>
  )
}

export const ObjectCollsRows = (p: RowProps) => {
  const rows: ReactNode[] = []
  for (let i = 0; i < p.value.value.length; i++) {
    rows.push(
      <CollRow
        changeIndex={p.changeIndex}
        key={p.value.orderId + '_' + i}
        value={p.value[i]}
        field={p.field.values as BasedSchemaFieldObject}
        index={i}
        ctx={p.ctx}
        path={p.path}
        removeItem={p.removeItem}
      />
    )
  }
  return rows
}
