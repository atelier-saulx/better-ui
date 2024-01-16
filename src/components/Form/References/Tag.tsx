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

export const ReferenceTag = ({
  value,
  onRemove,
  onClickReference,
  draggable,
}: {
  draggable?: boolean
  value: Reference
  onRemove: () => void
  onClickReference: (ref: Reference) => void
}) => {
  const ref = React.useRef({
    dragOver: false,
    isDragging: false,
  })
  const update = useUpdate()

  const drag = draggable
    ? {
        onDragStart: () => {
          ref.current.isDragging = true
          update()
        },
        onDragOver: () => {
          ref.current.dragOver = true
          update()
        },
        onDragLeave: () => {
          ref.current.dragOver = false
          update()
        },
        onDragEnd: () => {
          ref.current.isDragging = false
        },
        draggable: true,
      }
    : {}

  return (
    <Stack>
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
          width: 2,
          height: 40,
          background: color('interactive', 'primary'),
        }}
      />
    </Stack>
  )
}
