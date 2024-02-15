import * as React from 'react'
import { BasedSchemaField } from '@based/schema'
import { Text, Stack, border } from '../../index.js'
import { Variant } from './types.js'
import { getTitle } from './utils.js'

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  variant: Variant
  fieldKey: string
}

export function FormField({
  children,
  field,
  fieldKey,
  variant,
}: FormFieldProps) {
  const name = getTitle(fieldKey, field)
  return (
    <Stack
      fitContent
      gap={12}
      direction="column"
      align="start"
      style={
        variant === 'bare'
          ? {
              marginBottom: 32,

              '& > *': {
                border: 'none !important',
                '& > * > :last-child > *': {
                  borderBottom: 'none !important',
                },
              },
            }
          : variant !== 'regular'
            ? { marginBottom: 32 }
            : {
                marginBottom: 32,
                // paddingLeft: 16,
                // paddingBottom: 8,
                // gridTemplateColumns: '1fr 1fr',
                // borderLeft: border('muted', 2),
              }
      }
    >
      {variant !== 'bare' ? (
        <div>
          <Text variant="body-bold">{name}</Text>
          {field.description && (
            <Text style={{ marginTop: -2 }} color="secondary">
              {field.description}
            </Text>
          )}
        </div>
      ) : null}
      {children}
    </Stack>
  )
}
