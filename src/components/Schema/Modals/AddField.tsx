import * as React from 'react'
import { Text } from '../../Text/index.js'
import { Stack } from '../../Stack/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { CheckboxInput } from '../../CheckboxInput/index.js'
import { Button } from '../../Button/index.js'
import { SelectInput } from '../../SelectInput/index.js'
import { NumberInput } from '../../NumberInput/index.js'
import { styled } from 'inlines'
import { border } from '../../../utils/colors.js'
import { Modal } from '../../Modal/index.js'
import {
  ARRAY_OPTIONS,
  CONTENTMEDIATYPES_ARRAY,
  CONTENT_MEDIA_ENCODINGS,
  CONTENT_MEDIA_TYPES,
  DATE_FORMAT_OPTIONS,
  LANG_SELECT_OPTIONS,
  NUMBER_DISPLAY_FORMAT_OPTIONS,
  STRING_FORMAT_DISPLAY_OPTIONS,
  STRING_FORMAT_OPTIONS,
} from '../constants.js'
import { useClient, useQuery } from '@based/react'
import { findPath } from '../findpath.js'

type AddFieldProps = {
  fieldType: string
  typeTitle: string
  onConfirm?: (v: any) => void
  fieldItem?: any
  editItem?: any
  itemName?: string
  path?: string[]
}

type SpecificOptionsProps = {
  fieldType: string
  setMeta: ({}) => void
  setItems: ({}) => void
  items?: any
  meta?: any
}

type GeneralOptionsProps = {
  setMeta: ({}) => void
  fieldName?: string
  setFieldName: (v: string) => void
  editItem?: any
  meta?: any
}

const metaReducer = (state, action) => {
  if (action.type === 'prune') {
    const newMeta = Object.fromEntries(
      Object.entries(state).filter(([_, v]) => v != false),
    )
    return newMeta
  } else {
    return {
      ...state,
      [action.field]: action.value,
    }
  }
}

export const AddField = ({
  fieldType,
  typeTitle,
  onConfirm,
  fieldItem,
  editItem,
  itemName = '',
  path,
}: AddFieldProps) => {
  const [meta, setMeta] = React.useReducer(metaReducer, editItem || {})
  const [fieldName, setFieldName] = React.useState(itemName)
  const [tabIndex, setTabIndex] = React.useState(1)
  // for arrays
  const [items, setItems] = React.useState(
    editItem ? { [itemName]: { ...editItem } } : { type: 'string' },
  )

  const client = useClient()

  const { data } = useQuery('db:schema')
  const { types, rootType } = data

  // console.log('fieldType -->', fieldType)
  // console.log('typeTitle', typeTitle)
  // console.log('fieldname/ itemName --->', itemName)
  // console.log('Edit items ---> ', editItem)
  // console.log('field item ---> ', fieldItem)

  React.useEffect(() => {
    console.log('did something changed in the meta:', meta)
  }, [meta])

  return (
    <Modal
      confirmLabel={editItem ? 'Edit' : 'Add Field'}
      confirmProps={{ disabled: !fieldName || fieldName.length < 3 }}
      onConfirm={async () => {
        // options // type // children // path = path
        let type = typeTitle
        let field = fieldName
        fieldType = fieldType.toLowerCase()

        path = path || [field]

        const currentFields =
          type === 'root' ? rootType.fields : types[type].fields
        const fields = {}
        let from = currentFields
        let dest = fields
        let i = 0
        const l = path.length

        while (i < l) {
          const key = path[i++]
          dest[key] = { ...from[key] }
          dest = dest[key]
          // @ts-ignore TODO: fix
          from = from[key]
        }

        // normal field
        fields[field] = { type: fieldType, ...meta }

        if (fieldType === 'record') {
          fields[field] = { values: [], ...fields[field] }
        } else if (fieldType === 'object') {
          fields[field] = { properties: {}, ...fields[field] }
        }

        console.log(fields, 'NEW FIELDS??')

        if (type === 'root') {
          client.call('db:set-schema', {
            mutate: true,
            schema: {
              rootType: {
                fields,
              },
            },
          })
        } else {
          client.call('db:set-schema', {
            mutate: true,
            schema: {
              types: {
                [type]: {
                  fields,
                },
              },
            },
          })
        }

        onConfirm(meta)
      }}
    >
      <Text variant="title-modal">{fieldType}</Text>
      <Stack
        style={{
          justifyContent: 'flex-start',
          margin: '12px 0px',
          marginBottom: 20,
        }}
        gap={16}
      >
        <Button
          style={{
            borderRadius: 0,
            paddingBottom: 12,
            borderBottom:
              tabIndex !== 1 ? '3px solid transparent' : border('focus', 3),
            '&:hover': {
              background: 'transparent',
              borderBottom:
                tabIndex !== 1 ? border('hover', 3) : border('focus', 3),
            },
          }}
          variant={'neutral-transparent'}
          onClick={() => setTabIndex(1)}
        >
          General
        </Button>
        {fieldType.toLowerCase() !== 'boolean' &&
        fieldType.toLowerCase() !== 'cardinality' &&
        fieldType.toLowerCase() !== 'enum' &&
        fieldType.toLowerCase() !== 'json' ? (
          <Button
            style={{
              borderRadius: 0,
              paddingBottom: 12,
              borderBottom:
                tabIndex !== 2 ? '3px solid transparent' : border('focus', 3),
              '&:hover': {
                background: 'transparent',
                borderBottom:
                  tabIndex !== 2 ? border('hover', 3) : border('focus', 3),
              },
            }}
            variant={'neutral-transparent'}
            onClick={() => setTabIndex(2)}
          >
            Settings
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      {tabIndex === 1 && (
        <GeneralOptions
          meta={meta}
          setMeta={setMeta}
          editItem={editItem}
          fieldName={fieldName}
          setFieldName={setFieldName}
        />
      )}
      {tabIndex === 2 && (
        <SpecificOptions
          fieldType={fieldType.toLowerCase()}
          meta={meta}
          setMeta={setMeta}
          setItems={setItems}
          items={items}
        />
      )}
    </Modal>
  )
}

const GeneralOptions = ({
  meta,
  setMeta,
  setFieldName,
  fieldName,
  editItem,
}: GeneralOptionsProps) => {
  return (
    <Stack gap={12} grid>
      <TextInput
        label="Field Title"
        disabled={editItem}
        value={fieldName || meta?.title}
        autoFocus
        onChange={(v) => {
          if (!editItem) {
            setFieldName(v.toLowerCase())
          }
        }}
      />

      <TextAreaInput
        label="Description"
        value={meta?.description}
        onChange={(v) => setMeta({ field: 'description', value: v })}
      />
      <Stack style={{ marginTop: 12 }}>
        <CheckboxInput
          label="Is required"
          value={meta?.isRequired}
          onChange={(v) => setMeta({ field: 'isRequired', value: v })}
        />
        <CheckboxInput
          label="Read only"
          value={meta?.readOnly}
          onChange={(v) => {
            if (v) {
              setMeta({ field: 'readOnly', value: v })
              if (meta?.writeOnly) {
                setMeta({ field: 'writeOnly', value: !v })
              }
            } else {
              setMeta({ field: 'readOnly', value: v })
            }
          }}
        />
        <CheckboxInput
          label="Write only"
          value={meta?.writeOnly}
          onChange={(v) => {
            if (v) {
              setMeta({ field: 'writeOnly', value: v })
              if (meta?.readOnly) {
                setMeta({ field: 'readOnly', value: !v })
              }
            } else {
              setMeta({ field: 'writeOnly', value: v })
            }
          }}
        />
      </Stack>
    </Stack>
  )
}

const SpecificOptions = ({
  fieldType,
  meta,
  setMeta,
  setItems,
  items,
}: SpecificOptionsProps) => {
  console.log('What is itemsS?', items)

  return (
    // STRING & // TEXT
    <Stack grid gap={12}>
      {fieldType === 'string' || fieldType === 'text' ? (
        <>
          {fieldType === 'text' && (
            // @ts-ignore
            <SelectInput
              label="Languages"
              options={LANG_SELECT_OPTIONS}
              value={meta?.languages}
              onChange={(v) => setMeta({ field: 'languages', value: v })}
            />
          )}
          <SelectInput
            label="Format"
            options={STRING_FORMAT_OPTIONS}
            value={meta?.format}
            onChange={(v) => setMeta({ field: 'format', value: v })}
          />
          <styled.div style={{ display: 'flex', gap: 16 }}>
            <NumberInput
              label="Minimal number of characters"
              value={meta?.minChar}
              onChange={(v) => setMeta({ field: 'minChar', value: v })}
            />
            <NumberInput
              label="Max. number of characters"
              value={meta?.maxChar}
              onChange={(v) => setMeta({ field: 'maxChar', value: v })}
            />
          </styled.div>
          <TextInput
            label="Match a specific pattern"
            //  description="Only accepts values that match a specific regular expression"
            value={meta?.regex}
            onChange={(v) => setMeta({ field: 'regex', value: v })}
          />
          <styled.div style={{ display: 'flex', gap: 16 }}>
            <SelectInput
              placeholder={
                !CONTENTMEDIATYPES_ARRAY.includes(meta.contentMediaType)
                  ? 'custom'
                  : ''
              }
              label="Content Media Types"
              value={meta?.contentMediaType}
              options={CONTENT_MEDIA_TYPES}
              onChange={(v) => setMeta({ field: 'contentMediaType', value: v })}
            />
            {!CONTENTMEDIATYPES_ARRAY.includes(meta?.contentMediaType) && (
              <TextInput
                label="Custom MediaType"
                value={meta?.contentMediaType}
                onChange={(v) =>
                  setMeta({ field: 'contentMediaType', value: v })
                }
              />
            )}
          </styled.div>
          <SelectInput
            label="Content Media Encoding"
            value={meta?.contentMediaEncoding}
            options={CONTENT_MEDIA_ENCODINGS}
            onChange={(v) =>
              setMeta({ field: 'contentMediaEncoding', value: v })
            }
          />
          <SelectInput
            label="String Display Format"
            value={meta?.display}
            options={STRING_FORMAT_DISPLAY_OPTIONS}
            onChange={(v) => setMeta({ field: 'display', value: v })}
          />
          <styled.div style={{ gap: 16, marginTop: 16, maxWidth: 128 }}>
            <CheckboxInput
              label="Multiline"
              value={meta?.multiline}
              onChange={(v) => setMeta({ field: 'multiline', value: v })}
            />
          </styled.div>
        </>
      ) : fieldType === 'number' || fieldType === 'int' ? (
        // NUMBER
        <>
          <styled.div style={{ display: 'flex', gap: 16 }}>
            <NumberInput
              label="Minimum"
              value={meta?.minimum}
              onChange={(v) => setMeta({ field: 'minimum', value: v })}
            />
            <NumberInput
              label="Maximum"
              value={meta?.maximum}
              onChange={(v) => setMeta({ field: 'maximum', value: v })}
            />
            <NumberInput
              label="Multiple Of"
              value={meta?.multipleOf}
              onChange={(v) => setMeta({ field: 'multipleOf', value: v })}
            />
          </styled.div>
          <styled.div
            style={{ display: 'flex', marginTop: 16, marginBottom: 16 }}
          >
            <CheckboxInput
              label="Exclusive Maximum"
              value={meta?.exclusiveMaximum}
              onChange={(v) => setMeta({ field: 'exclusiveMaximum', value: v })}
            />
            <CheckboxInput
              label="Exclusive Minimum"
              value={meta?.exclusiveMinimum}
              onChange={(v) => setMeta({ field: 'exclusiveMinimum', value: v })}
            />
          </styled.div>
          {(fieldType === 'number' || fieldType === 'int') && (
            <SelectInput
              label="Display Format"
              value={meta?.display}
              options={NUMBER_DISPLAY_FORMAT_OPTIONS}
              onChange={(v) => setMeta({ field: 'display', value: v })}
            />
          )}
        </>
      ) : fieldType === 'timestamp' ? (
        <SelectInput
          label="Display Date Format"
          value={meta?.display}
          options={DATE_FORMAT_OPTIONS}
          onChange={(v) => setMeta({ field: 'display', value: v })}
        />
      ) : fieldType === 'array' || fieldType === 'set' ? (
        <SelectInput
          label={fieldType === 'array' ? 'Array options' : 'Set options'}
          value={items?.type}
          options={ARRAY_OPTIONS}
          onChange={(v) => setItems({ type: v })}
        />
      ) : fieldType === 'reference' || fieldType === 'references' ? (
        <Stack gap={12} grid style={{ marginTop: 12 }}>
          <CheckboxInput label="Bidirectional" />
          <Text>From field if bidirectional</Text>
          <SelectInput
            style={{ width: '100%' }}
            label="Allowed types"
            options={[
              { value: 'string', label: 'string []' },
              {
                value: '{type?: string: $filter: any | any[]}',
                label: '{type?: string: $filter: any | any[]}',
              },
            ]}
          />
          {fieldType === 'references' && <CheckboxInput label="Sortable" />}
        </Stack>
      ) : (
        '🙈'
      )}
    </Stack>
  )
}
