import * as React from 'react'
import { BasedSchemaField } from '@based/schema'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { border } from '../../utils/colors'
import { Variant } from './types'

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  name: string
  variant: Variant
}

export function FormField({ children, field, name, variant }: FormFieldProps) {
  return (
    <Stack
      gap={12}
      direction="column"
      align="start"
      style={
        variant === 'bare'
          ? {
              '& > *': {
                border: 'none !important',
                '& > * > :last-child > *': {
                  borderBottom: 'none !important',
                },
              },
            }
          : variant !== 'regular'
          ? undefined
          : {
              paddingLeft: 16,
              paddingBottom: 8,
              borderLeft: border('muted', 2),
            }
      }
    >
      {variant !== 'bare' ? (
        <div>
          <Text variant="bodyStrong">{name}</Text>
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
