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
import { Modal } from '../../Modal/index.js'
import {
  CONTENTMEDIATYPES_ARRAY,
  CONTENT_MEDIA_ENCODINGS,
  CONTENT_MEDIA_TYPES,
  DATE_FORMAT_OPTIONS,
  LANG_SELECT_OPTIONS,
  NUMBER_DISPLAY_FORMAT_OPTIONS,
  STRING_FORMAT_DISPLAY_OPTIONS,
  STRING_FORMAT_OPTIONS,
} from '../constants.js'
import { useClient } from '@based/react'

type SpecificOptionsProps = {
  fieldType: string
  setMeta: ({}) => void
  meta?: any
}

type GeneralOptionsProps = {
  setMeta: ({}) => void
  meta?: any
}

const metaReducer = (state, action) => {
  if (action.type === 'prune') {
    const newMeta = Object.fromEntries(
      Object.entries(state).filter(([_, v]) => v != false)
    )
    return newMeta
  } else {
    return {
      ...state,
      [action.field]: action.value,
    }
  }
}

export const AddField = ({ fieldType, typeName, onConfirm }) => {
  const [meta, setMeta] = React.useReducer(metaReducer, {})
  const [tabIndex, setTabIndex] = React.useState(1)

  console.log(typeName)

  const client = useClient()

  return (
    <Modal
      confirmLabel="Add Field"
      onConfirm={async () => {
        let fields
        // Set The new field with meta data..
        // let fields = {
        //   [meta.name || meta.displayName.toLowerCase()]: {
        //     type: fieldType.toLowerCase(),
        //     //      label: meta.name || meta.displayName.toLowerCase(),
        //     // id:
        //     //   fieldType.toLowerCase() === 'array'
        //     //     ? undefined
        //     //     : meta.name || meta.displayName.toLowerCase(),
        //     // properties:
        //     //   fieldType.toLowerCase() === 'object' ? {} : undefined,
        //     // values: fieldType.toLowerCase() === 'record' ? [] : undefined,
        //     // index:
        //     //   fieldType.toLowerCase() === 'array'
        //     //     ? undefined
        //     //     : thisSpecificField?.index || newIndex,
        //     meta: meta,
        //   },
        // }
        if (fieldType.toLowerCase() === 'object') {
          fields = {
            [meta.name || meta.displayName.toLowerCase()]: {
              type: fieldType.toLowerCase(),
              meta: meta,
              properties: {},
            },
          }
        } else {
          fields = {
            [meta.name || meta.displayName.toLowerCase()]: {
              type: fieldType.toLowerCase(),
              meta: meta,
            },
          }
        }

        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [typeName]: {
                fields: fields,
              },
            },
          },
        })

        onConfirm(meta)
      }}
    >
      <Text variant="title-modal">{fieldType}</Text>
      <Stack
        style={{ justifyContent: 'flex-start', margin: '12px 0px' }}
        gap={16}
      >
        <Button
          variant={tabIndex === 1 ? 'primary-link' : 'neutral-link'}
          onClick={() => setTabIndex(1)}
        >
          General
        </Button>
        {fieldType.toLowerCase() !== 'boolean' &&
        fieldType.toLowerCase() !== 'cardinality' &&
        fieldType.toLowerCase() !== 'json' ? (
          <Button
            variant={tabIndex === 2 ? 'primary-link' : 'neutral-link'}
            onClick={() => setTabIndex(2)}
          >
            Settings
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      {tabIndex === 1 && <GeneralOptions meta={meta} setMeta={setMeta} />}
      {tabIndex === 2 && (
        <SpecificOptions
          fieldType={fieldType.toLowerCase()}
          meta={meta}
          setMeta={setMeta}
        />
      )}
    </Modal>
  )
}

const GeneralOptions = ({ meta, setMeta }: GeneralOptionsProps) => {
  return (
    <Stack gap={12} grid>
      <TextInput
        label="Display name"
        // description="Name that will be displayed in the interface"
        value={meta?.displayName}
        onChange={(v) => setMeta({ field: 'displayName', value: v })}
      />
      <TextInput
        label="Field Name"
        //  description="API field-name used in the sdk and clients"
        value={meta?.name || meta?.displayName?.toLowerCase() || ''}
        onChange={(v) => setMeta({ field: 'name', value: v })}
      />
      <TextAreaInput
        label="Description"
        // description="Displays a hint for content editors"
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
}: SpecificOptionsProps) => {
  return (
    // STRING & // TEXT
    <Stack grid gap={12}>
      {fieldType === 'string' || fieldType === 'text' ? (
        <>
          {fieldType === 'text' && (
            // @ts-ignore
            <Input
              type="multi-select"
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
              label="Content Media Types"
              value={meta?.contentMediaType}
              options={CONTENT_MEDIA_TYPES}
              onChange={(v) => setMeta({ field: 'contentMediaType', value: v })}
            />
            {!CONTENTMEDIATYPES_ARRAY.includes(meta?.contentMediaType) && (
              <TextInput
                label="Custom ContentMediaType"
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
      ) : fieldType === 'number' ||
        fieldType === 'int' ||
        fieldType === 'timestamp' ? (
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
          {fieldType === 'timestamp' && (
            <SelectInput
              label="Display Date Format"
              value={meta?.display}
              options={DATE_FORMAT_OPTIONS}
              onChange={(v) => setMeta({ field: 'display', value: v })}
            />
          )}
        </>
      ) : (
        '🙈'
      )}
    </Stack>
  )
}
