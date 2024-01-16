import * as React from 'react'
import { styled } from 'inlines'
import {
  Stack,
  Button,
  Text,
  color,
  IconClose,
  border,
  Media,
  useUpdate,
  borderRadius,
} from '../../../index.js'
import { Reference } from '../types.js'

const Info = ({ value }: { value: Reference }) => {
  if (typeof value === 'object') {
    const title = value.name ?? value.title
    if (title) {
      return (
        <>
          <Text variant="body-bold">{title}</Text>
          <Text>{value.id}</Text>
        </>
      )
    }
    return <Text>{value.id}</Text>
  }
  return <Text>{value}</Text>
}

const Image = ({ value }: { value: Reference }) => {
  if (typeof value !== 'object') {
    return null
  }

  if ('src' in value) {
    const width = 32
    return (
      <styled.div
        style={{
          width,
          height: width,
          overflow: 'hidden',
          backgroundColor: color('background', 'neutral'),
          borderRadius: 4,
          marginLeft: -4,
        }}
      >
        <Media src={value.src} variant="cover" type={value.mimeType} />
      </styled.div>
    )
  }

  return null
}

let draggingIndex = 0

export const ReferenceTag = ({
  value,
  onRemove,
  index,
  changeIndex,
  onClickReference,
  draggable,
}: {
  index: number
  changeIndex: (fromIndex: number, toIndex: number) => void
  draggable?: boolean
  value: Reference
  onRemove: () => void
  onClickReference: (ref: Reference) => void
}) => {
  const ref = React.useRef({
    dragOver: false,
    isDragging: false,
    moved: [],
  })

  const elem = React.useRef<any>()

  const update = useUpdate()

  const drag = draggable
    ? {
        onDrop: (e) => {
          e.preventDefault()
          for (const elem of ref.current.moved) {
            elem.style.transform = `translate(0px,0px)`
          }
          ref.current.dragOver = false
          ref.current.moved = []
          changeIndex(draggingIndex, index)
          ref.current.isDragging = false
          update()
        },
        onDragStart: () => {
          draggingIndex = index
          ref.current.isDragging = true
          update()
        },
        onDragOver: (e) => {
          e.preventDefault()
          ref.current.dragOver = true
          const y = elem.current.getBoundingClientRect().y
          let nextSibling = elem.current.nextElementSibling
          while (nextSibling) {
            nextSibling.style.transform = `translate(16px,0px)`
            ref.current.moved.push(nextSibling)
            nextSibling = nextSibling.nextElementSibling
            if (nextSibling && nextSibling.getBoundingClientRect().y !== y) {
              break
            }
          }
          update()
        },
        onDragLeave: () => {
          for (const elem of ref.current.moved) {
            elem.style.transform = `translate(0px,0px)`
          }
          ref.current.moved = []
          ref.current.dragOver = false
          update()
        },
        onDragEnd: () => {
          ref.current.isDragging = false
          update()
        },
        onDragExit: () => {
          ref.current.isDragging = false
          update()
        },
        draggable: true,
      }
    : {}

  return (
    <Stack
      fitContent
      ref={elem}
      style={{
        transition: 'transform 0.2s',
      }}
    >
      <Stack
        gap={12}
        justify="start"
        style={{
          height: 40,
          width: 'auto',
          paddingTop: 2,
          paddingBottom: 2,
          color: color('content', 'secondary'),
          paddingLeft: 8,
          paddingRight: 8,
          border: border(),
          backgroundColor: ref.current.isDragging
            ? color('background', 'screen')
            : color('background', 'muted'),
          borderRadius: borderRadius('tiny'),
        }}
        onClick={() => {
          onClickReference(value)
        }}
        {...drag}
      >
        <Image value={value} />
        <Info value={value} />
        <Button
          onClick={() => {
            onRemove()
          }}
          variant="icon-only"
        >
          <IconClose />
        </Button>
      </Stack>
      <styled.div
        style={{
          transition: 'transform 0.2s, opacity 0.5s',
          transform: ref.current.dragOver ? `translate(16px,0px)` : null,
          opacity: ref.current.dragOver ? 1 : 0,
          width: 2,
          height: 40,
          background: color('interactive', 'primary'),
        }}
      />
    </Stack>
  )
}
