import React from 'react'
import {
  Text,
  Thumbnail,
  Badge,
  Stack,
  color,
  border,
  IconChevronDown,
  Button,
} from '../../../index.js'
import { IconDrag } from '../../Form/IconDrag.js'
import { SCHEMA_FIELDS, SYSTEM_FIELDS } from '../constants.js'
import { styled } from 'inlines'
import { getDepth } from './utils.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { FieldEditAndDelete } from '../Modals/FieldEditAndDelete.js'
import { SelectField } from '../SelectField/index.js'

export const Field = ({
  type,
  field,
  fields,
  isDragging = false,
  toggleExpand = null,
  collapsed = false,
  schema,
  setSchema,
  setSomethingChanged,
}) => {
  const path = field.split('.')
  const fieldSchema = path.reduce((fields, key) => fields[key], fields)
  const {
    // meta,
    type: fieldType,
    display: fieldDisplay,
    format: fieldFormat,
    title: title,
  } = fieldSchema

  // console.log('FIELDSCHEMA-->', fieldSchema)

  const nestedType = (fieldSchema.items || fieldSchema.values)?.type
  const isObject = fieldType === 'object' || nestedType === 'object'

  const objectPath: string[] = isObject
    ? fieldType === 'record'
      ? [...path, 'values', 'properties']
      : fieldType === 'array'
        ? [...path, 'items', 'properties']
        : [...path, 'properties']
    : path

  const [, setPath] = useContextState('field', [])

  // console.log('props --> type,', type, 'field', field)
  // console.log('fieldSchema', fieldSchema)

  return (
    <styled.div>
      <styled.div
        style={{
          height: 50,
          opacity: SYSTEM_FIELDS.has(field) ? 0.5 : 1,
          borderRadius: 8,
          border: border(),
          paddingLeft: 16,
          paddingRight: 16,
          marginLeft: getDepth(path) * 24,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: color('background', 'screen'),
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
      >
        {isObject ? (
          <Button
            style={{
              transform: isDragging || collapsed ? 'rotate(-90deg)' : null,
              cursor: 'pointer',
              position: 'absolute',
              left: -30,
              top: 16,
            }}
            variant="icon-only"
            onClick={() => toggleExpand?.(field)}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <IconChevronDown />
          </Button>
        ) : null}
        <Stack gap={12}>
          <Stack gap={12} justify="start">
            <IconDrag
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                '& svg': { width: 14, height: 14, marginRight: 4 },
              }}
            />{' '}
            <Thumbnail
              icon={SCHEMA_FIELDS[fieldType]?.icon}
              color={SCHEMA_FIELDS[fieldType]?.color}
              outline
              style={{
                border:
                  SCHEMA_FIELDS[fieldType]?.color === 'grey-soft'
                    ? border()
                    : 'inherit',
                marginRight: 6,
                borderRadius: 8,
                '& svg': {
                  width: 16,
                  height: 16,
                },
              }}
              size={'small'}
            />
            <Text variant="body-bold">
              {fieldSchema?.title ||
                field.split('.')[field.split('.').length - 1]}
            </Text>
            <Badge size="small" color="neutral-muted">
              {fieldType}
            </Badge>{' '}
            {SYSTEM_FIELDS.has(field) ? (
              <Badge size="small" color="neutral-muted">
                System
              </Badge>
            ) : null}
            {(fieldDisplay || fieldFormat) && (
              <Badge size="small" color="neutral">
                {fieldDisplay || fieldFormat}
              </Badge>
            )}
            {nestedType && (
              <Badge color="neutral-muted" size="small">
                {nestedType}
              </Badge>
            )}
          </Stack>

          <Stack gap={12} justify="end">
            {isObject && (
              <SelectField
                path={objectPath}
                light
                setSchema={setSchema}
                setSomethingChanged={setSomethingChanged}
                schema={schema}
              />
            )}
            <FieldEditAndDelete
              item={fieldSchema}
              itemName={field}
              typeTitle={type}
              schema={schema}
              setSchema={setSchema}
              setSomethingChanged={setSomethingChanged}
            />
          </Stack>
        </Stack>
      </styled.div>
    </styled.div>
  )
}
