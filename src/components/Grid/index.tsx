import * as React from 'react'
import { styled } from 'inlines'
import {
  Badge,
  IconDragDropHorizontal,
  IconDragDropVertical,
  Media,
  Stack,
  Text,
  border,
  borderRadius,
  color,
} from '../../index.js'
import { GridItem } from './Item.js'
import { GridProps } from './types.js'
import { render } from 'react-dom'

// TODO this component is a WIP, API will be changed to match the Table

const isReactNode = (
  renderAs: string | React.ReactNode
): renderAs is React.ReactNode => {
  return typeof renderAs !== 'string'
}

export function Grid({
  variant = 'column',
  items,
  itemAction,
}: // onChange,
GridProps) {
  const ref2 = React.useRef<HTMLElement>()
  const [draggingIndex, setDraggingIndex] = React.useState(0)

  return (
    <styled.div
      style={{
        display: 'grid',
        gap: variant === 'column' ? 16 : 0,
        gridTemplateColumns: variant === 'column' ? 'repeat(3, 1fr)' : '1fr',
      }}
    >
      {items.map((item, i) => (
        <styled.div
          onDragOver={(e) => {
            e.preventDefault()
          }}
          style={{
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            ...(variant === 'column' && {
              borderRadius: borderRadius('tiny'),
              border: border(),
              flexDirection: 'column',
            }),
            ...(variant === 'row' && {
              // borderBottom: border(),
              flexDirection: 'row',
            }),
          }}
        >
          {variant === 'row' ? (
            <styled.div
              draggable
              onDragStart={(e) => {
                setDraggingIndex(i)
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
                    {/* {src ? <Media src={src} /> : null} */}
                    {/* <Text variant="body-bold">{name}</Text> */}
                  </Stack>,
                  elem
                )
                document.body.appendChild(elem)
                e.dataTransfer.setDragImage(elem, 0, 0)
                // e.dataTransfer.setData('text/plain', p.index)
                // draggingIndex = p.index
              }}
              onDragEnd={() => {
                document.body.removeChild(ref2.current)
              }}
            >
              <IconDragDropHorizontal />
            </styled.div>
          ) : null}
          {isReactNode(item.renderAs) ? (
            item.renderAs
          ) : (
            <GridItem
              index={i}
              draggingIndex={draggingIndex}
              setDraggingIndex={setDraggingIndex}
              variant={variant}
              key={i}
              item={item}
              itemAction={itemAction}
            />
          )}
        </styled.div>
      ))}
    </styled.div>
  )
}
