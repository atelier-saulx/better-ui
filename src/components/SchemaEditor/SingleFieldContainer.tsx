import * as React from 'react'
import { Container } from '../Container/index.js'
import { Thumbnail } from '../Thumbnail/index.js'
import { Badge } from '../Badge/index.js'
import { Text } from '../Text/index.js'
import { FieldEditAndDelete } from './Modals/FieldEditAndDelete.js'
import { SCHEMA_FIELDS, SYSTEM_FIELDS } from './constants.js'
import { Stack } from '../Stack/index.js'
import { SelectNewField } from './Modals/SelectNewField.js'
import { IconDrag } from '../Form/IconDrag.js'
import { styled } from 'inlines'
import { render } from 'react-dom'
import { color } from '../../utils/colors.js'
import { borderRadius } from '../../utils/colors.js'

type SingleFieldContainerProps = {
  item: any
  typeTitle: string
  index?: number
  changeIndex?: (fromIndex: number, toIndex: number) => void
}

let draggingIndex = 0

// for some recursion in objects
export const SingleFieldContainer = ({
  item,
  typeTitle,
  index,
  changeIndex,
}: SingleFieldContainerProps) => {
  if (item.format === 'rich-text') {
    item.type = 'richtext'
  }

  const [isDragOver, setDragOver] = React.useState(0)
  const ref2 = React.useRef<HTMLElement>()

  return (
    <styled.div
      onDrop={(e) => {
        e.preventDefault()
        changeIndex(draggingIndex, index)
        setDragOver(0)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        if (draggingIndex !== index) {
          setDragOver(draggingIndex > index ? -1 : 1)
        }
      }}
      onDragLeave={() => {
        setDragOver(0)
      }}
      onDragExit={() => {
        setDragOver(0)
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
              <Badge>{item?.title}</Badge>
              <Text variant="body-bold">dragging</Text>
            </Stack>,
            elem,
          )
          document.body.appendChild(elem)
          e.dataTransfer.setDragImage(elem, 0, 0)
          e.dataTransfer.setData('text/plain', index)
          draggingIndex = index
        }}
        onDragEnd={() => {
          document.body.removeChild(ref2.current)
        }}
      >
        {/* purple dropline above */}
        <Stack
          style={{
            height: isDragOver === -1 ? 24 : 0,
            width: '100%',
            overflow: 'hidden',
            transition: 'height 0.2s',
            marginTop: isDragOver === -1 ? -8 : 0,
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
        <Container
          style={{
            marginBottom: 8,
            '& > div:first-child': {
              padding: '4px !important',
            },
            backgroundColor: isDragOver
              ? color('background', 'muted')
              : 'transparent',
            opacity: SYSTEM_FIELDS.includes(item?.title) ? 0.5 : 1,
          }}
          title={
            <Stack gap={12}>
              <Text variant="body-bold">{item?.title}</Text>
              <Badge color={SCHEMA_FIELDS[item.type]?.color}>
                {item.type}
              </Badge>{' '}
              {SYSTEM_FIELDS.includes(item?.title) ? (
                <Badge color="neutral-muted">System</Badge>
              ) : null}
              {(item?.display || item?.format) && (
                <Badge color="neutral">{item?.format || item?.display}</Badge>
              )}
              {item?.items && <Badge color="neutral">{item.items.type}</Badge>}
            </Stack>
          }
          prefix={
            <Stack gap={12}>
              <IconDrag />
              <Thumbnail
                // outline
                icon={SCHEMA_FIELDS[item.type]?.icon}
                color={SCHEMA_FIELDS[item.type]?.color}
                style={{
                  marginRight: 6,
                  borderRadius: 8,
                  '& svg': {
                    width: 16,
                    height: 16,
                  },
                }}
                size={'small'}
              />
            </Stack>
          }
          suffix={
            <Stack gap={12}>
              {item.type === 'object' && (
                <SelectNewField typeTitle={typeTitle} fieldItem={item} light />
              )}
              <FieldEditAndDelete item={item} typeTitle={typeTitle} />
            </Stack>
          }
          expandable={item.type === 'object' ? true : false}
        >
          {item.type === 'object' &&
            Object.keys(item.properties).map((subItem, idx) => (
              <SingleFieldContainer
                item={item.properties[subItem]}
                key={idx}
                typeTitle={typeTitle}
              />
            ))}
        </Container>
        {/* purple dropline below */}
        <Stack
          style={{
            height: isDragOver === 1 ? 24 : 0,
            overflow: 'hidden',
            width: '100%',
            transition: 'height 0.2s',
            marginTop: isDragOver === 1 ? '-8px' : 0,
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
    </styled.div>
  )
}
