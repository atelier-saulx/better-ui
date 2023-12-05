import * as React from 'react'
import { styled } from 'inlines'
import { BasedSchemaField } from '@based/schema'

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  name: string
}

export function FormField({ children, field, name }: FormFieldProps) {
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
      {'description' in field && (
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
