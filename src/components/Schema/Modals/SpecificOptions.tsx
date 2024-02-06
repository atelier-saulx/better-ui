import * as React from 'react'
import { Stack } from '../../Stack/index.js'
import { TextInput } from '../../TextInput/index.js'
import { CheckboxInput } from '../../CheckboxInput/index.js'
import { SelectInput } from '../../SelectInput/index.js'
import { NumberInput } from '../../NumberInput/index.js'
import { styled } from 'inlines'
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
import { SetInput } from '../../SetInput/index.js'

type SpecificOptionsProps = {
  fieldType: string
  setMeta: ({}) => void
  setItems: ({}) => void
  items?: any
  meta?: any
  schemaTypes?: string[]
}

export const SpecificOptions = ({
  fieldType,
  meta,
  setMeta,
  setItems,
  items,
  schemaTypes,
}: SpecificOptionsProps) => {
  const [showFromField, setShowFromField] = React.useState(false)

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
          <CheckboxInput
            label="Bidirectional"
            value={meta?.bidirectional?.fromField.length > 1}
            onChange={(v) => setShowFromField(v)}
          />
          {(showFromField || meta?.bidirectional?.fromField.length > 1) && (
            <TextInput
              label="from field"
              value={meta?.bidirectional?.fromField}
              onChange={(v) => {
                if (showFromField) {
                  setMeta({
                    field: 'bidirectional',
                    value: { fromField: v },
                  })
                } else {
                  setMeta({
                    field: 'bidirectional',
                    value: null,
                  })
                }
              }}
            />
          )}

          <SetInput
            label="Allowed types"
            value={meta?.allowedTypes}
            options={schemaTypes}
            onChange={(v) => setMeta({ field: 'allowedTypes', value: v })}
          />

          {fieldType === 'references' && (
            <CheckboxInput
              value={meta?.sortable}
              onChange={(v) => setMeta({ field: 'sortable', value: v })}
              label="Sortable"
            />
          )}
        </Stack>
      ) : (
        '🙈'
      )}
    </Stack>
  )
}
