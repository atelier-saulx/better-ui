import * as React from 'react'
import { styled } from 'inlines'
import { BasedSchemaField } from '@based/schema'
import { Text } from '../text'
import { Stack } from '../layout'
import { border } from '../../utils/vars'

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  name: string
  variant: 'extensive' | 'minimal'
}

export function FormField({ children, field, name, variant }: FormFieldProps) {
  return (
    <Stack
      gap={12}
      direction="column"
      align="start"
      style={
        variant === 'minimal'
          ? {}
          : {
              paddingLeft: 16,
              paddingBottom: 8,
              borderLeft: border('muted', 2),
            }
      }
    >
      <styled.div>
        <Text variant="bodyStrong">{name}</Text>
        {field.description && (
          <Text style={{ marginTop: -2 }} color="secondary">
            {field.description}
          </Text>
        )}
      </styled.div>
      {children}
    </Stack>
  )
}
