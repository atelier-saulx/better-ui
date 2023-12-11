import * as React from 'react'
import { styled } from 'inlines'
import { BasedSchemaField } from '@based/schema'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { border } from '../../utils/colors'
import { isTable } from './Table/utils'

type FormFieldProps = {
  children: React.ReactNode
  field: BasedSchemaField
  name: string
  variant: 'regular' | 'small'
}

export function FormField({ children, field, name, variant }: FormFieldProps) {
  return (
    <Stack
      gap={12}
      direction="column"
      align="start"
      style={
        variant === 'small'
          ? undefined
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
