import * as React from 'react'
import { Container } from '../Container/index.js'
import { Thumbnail } from '../Thumbnail/index.js'
import { Badge } from '../Badge/index.js'
import { FieldEditAndDelete } from './Modals/FieldEditAndDelete.js'
import { SCHEMA_FIELDS, SYSTEM_FIELDS } from './constants.js'

// for some recursion in objects
export const SingleFieldContainer = ({ item, typeName }) => {
  return (
    <Container
      style={{
        marginBottom: 8,
        '& > div:first-child': {
          padding: '8px !important',
        },
        opacity: SYSTEM_FIELDS.includes(item.meta.name) ? 0.5 : 1,
      }}
      // key={idx}
      title={
        <React.Fragment>
          {item.meta.name}{' '}
          <Badge
            color={SCHEMA_FIELDS[item.type]?.color}
            style={{ marginLeft: 16, marginRight: 16 }}
          >
            {item.type}
          </Badge>{' '}
          {SYSTEM_FIELDS.includes(item.meta.name) ? (
            <Badge color="neutral-muted">System</Badge>
          ) : null}
        </React.Fragment>
      }
      prefix={
        <Thumbnail
          icon={SCHEMA_FIELDS[item.type]?.icon}
          color={SCHEMA_FIELDS[item.type]?.color}
          style={{ marginRight: 16 }}
        />
      }
      suffix={<FieldEditAndDelete item={item} typeName={typeName} />}
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
