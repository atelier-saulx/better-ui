import React from 'react'
import {
  Stack,
  TextAreaInput,
  TextInput,
  CheckboxInput,
} from '../../../index.js'

type GeneralOptionsProps = {
  setMeta: ({}) => void
  fieldName?: string
  setFieldName: (v: string) => void
  editItem?: any
  meta?: any
}

export const GeneralOptions = ({
  meta,
  setMeta,
  setFieldName,
  fieldName,
  editItem,
}: GeneralOptionsProps) => {
  return (
    <Stack gap={12} grid>
      <TextInput
        label="Display title (optional)"
        value={meta?.title}
        onChange={(v) => {
          setMeta({ field: 'title', value: v })
        }}
      />

      <TextInput
        label="Field name (in schema)"
        disabled={editItem}
        value={fieldName || meta?.title}
        autoFocus={!editItem}
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
