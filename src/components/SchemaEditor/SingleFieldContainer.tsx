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
import { border } from '../../utils/colors.js'

import { styled, Style } from 'inlines'

type SingleFieldContainerProps = {
  item: any
  typeTitle: string
  itemName?: string
  index?: number
  changeIndex?: (fromIndex: number, toIndex: number) => void
  isDragging?: boolean
  style?: Style
}

// let draggingIndex = 0

// for some recursion in objects
export const SingleFieldContainer = ({
  item,
  typeTitle,
  itemName,
  index,
  isDragging = false,
  style,
  // changeIndex,
}: SingleFieldContainerProps) => {
  if (item?.format === 'rich-text') {
    item.type = 'richtext'
  }

  // const overIdRef = React.useRef()

  return (
    <Container
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        marginBottom: 8,
        border: item?.type === 'object' ? '0px solid transparent' : border(),
        '& > div:first-child': {
          padding: '4px !important',
          borderRadius: '8px ',
          border: item?.type === 'object' ? border() : '',
          paddingLeft: item?.type === 'object' ? '16px !important' : '4px',
          cursor: isDragging ? 'grabbing' : 'grab',
        },
        '& > div:nth-child(2)': {
          borderTop: '1px solid transparent !important',
          padding: '8px 0px 0px 20px !important',
        },
        // backgroundColor: 'transparent',
        opacity: SYSTEM_FIELDS.includes(itemName) ? 0.5 : 1,
        ...style,
      }}
      title={
        <Stack gap={12}>
          <Text variant="body-bold">{itemName}</Text>
          <Badge color={SCHEMA_FIELDS[item?.type]?.color}>
            {item?.type}
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
          <IconDrag
            style={{ '& svg': { width: 18, height: 18, marginLeft: 8 } }}
          />
          <Thumbnail
            // outline
            icon={SCHEMA_FIELDS[item?.type]?.icon}
            color={SCHEMA_FIELDS[item?.type]?.color}
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
          {index}
        </Stack>
      }
      suffix={
        <Stack gap={12}>
          {item?.type === 'object' && (
            <SelectNewField typeTitle={typeTitle} fieldItem={item} light />
          )}
          <FieldEditAndDelete item={item} typeTitle={typeTitle} />
        </Stack>
      }
      expandable={item?.type === 'object' ? true : false}
    >
      {item?.type === 'object' &&
        Object.keys(item.properties).map((subItem, idx) => (
          <SingleFieldContainer
            item={item.properties[subItem]}
            key={idx}
            typeTitle={typeTitle}
          />
        ))}
    </Container>
  )
}
