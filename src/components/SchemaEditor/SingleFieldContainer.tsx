import * as React from 'react'
import { Container } from '../Container/index.js'
import { Thumbnail } from '../Thumbnail/index.js'
import { Badge } from '../Badge/index.js'
import { Text } from '../Text/index.js'
import { FieldEditAndDelete } from './Modals/FieldEditAndDelete.js'
import { SCHEMA_FIELDS, SYSTEM_FIELDS } from './constants.js'
import { Stack } from '../Stack/index.js'
import { SelectNewField } from './Modals/SelectNewField.js'

// for some recursion in objects
export const SingleFieldContainer = ({ item, typeName }) => {
  // console.log('item??0', item)

  if (item.format === 'rich-text') {
    item.type = 'richtext'
  }

  return (
    <Container
      style={{
        marginBottom: 8,
        '& > div:first-child': {
          padding: '8px !important',
        },
        opacity: SYSTEM_FIELDS.includes(item?.name || item.meta.name) ? 0.5 : 1,
      }}
      // key={idx}
      title={
        <Stack gap={12}>
          <Text variant="body-bold">{item?.name || item.meta.name}</Text>
          <Badge color={SCHEMA_FIELDS[item.type]?.color}>
            {item.type}
          </Badge>{' '}
          {SYSTEM_FIELDS.includes(item?.name || item.meta.name) ? (
            <Badge color="neutral-muted">System</Badge>
          ) : null}
          {(item.meta?.display || item.meta?.format) && (
            <Badge color="neutral">
              {item.meta.format || item.meta.display}
            </Badge>
          )}
          {item?.items && <Badge color="neutral">{item.items.type}</Badge>}
        </Stack>
      }
      prefix={
        <Thumbnail
          icon={SCHEMA_FIELDS[item.type]?.icon}
          color={SCHEMA_FIELDS[item.type]?.color}
          style={{ marginRight: 12 }}
        />
      }
      suffix={
        <Stack gap={12}>
          {item.type === 'object' && (
            <SelectNewField typeName={typeName} fieldItem={item} />
          )}
          <FieldEditAndDelete item={item} typeName={typeName} />
        </Stack>
      }
      expandable={item.type === 'object' ? true : false}
    >
      {item.type === 'object' &&
        Object.keys(item.properties).map((subItem, idx) => (
          <SingleFieldContainer
            item={item.properties[subItem]}
            key={idx}
            typeName={typeName}
          />
        ))}
    </Container>
  )
}
