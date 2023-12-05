import * as React from 'react'
import { styled } from 'inlines'
import { TextInput } from '../text-input'
import { Button } from '../button'
import { display, BasedSchemaField } from '@based/schema'

type FormValues = { [key: string]: BasedSchemaField }

export type FormProps = {
  defaultValues?: FormValues
  onChange: (values: FormValues) => void
  fields: FormValues
}

export function Form({ fields, defaultValues, onChange }: FormProps) {
  const values = React.useRef<FormValues>({})

  // check for index in fields

  return (
    <styled.div style={{ '& > * + *': { marginTop: '32px' } }}>
      {Object.entries(fields).map(([key, field]) => {
        switch (field.type) {
          case 'string':
            return (
              <FormField key={key} field={field} name={field.title ?? key}>
                <div
                  style={{
                    width: 450,
                  }}
                >
                  <TextInput
                    // if display show it somewhere
                    // placeholder
                    // defaultValue={getDefaultValue(key)}
                    onChange={(value) => {
                      // setValue(key, value)
                    }}
                  />
                </div>
              </FormField>
            )
        }
      })}
    </styled.div>
  )
}

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  name: string
}

function FormField({ children, field, name }: FormFieldProps) {
  return (
    <styled.div
      style={{
        '& > * + *': { marginTop: '8px' },
        paddingLeft: 10,
        borderLeft: `2px solid var(--border-default-subtle, rgba(16, 40, 72, 0.09))`,
      }}
    >
      <div
        style={{
          fontWeight: 600,
          lineHeight: '24px',
          fontSize: 14,
          letterSpacing: '-0.14px',
        }}
      >
        {name}
      </div>
      {children}
      {field.description && (
        <div
          style={{
            fontWeight: 400,
            fontSize: 14,
            lineHeight: '24px',
            letterSpacing: '-0.14px',

            color: 'var(--content-secondary)',
          }}
        >
          {field.description}
        </div>
      )}
    </styled.div>
  )
}
