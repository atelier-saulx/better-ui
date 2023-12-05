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
}

export function FormField({ children, field, name }: FormFieldProps) {
  return (
    <Stack
      gap={8}
      direction="column"
      align="start"
      style={{
        paddingLeft: 10,
        borderLeft: border('muted', 2),
      }}
    >
      <Text variant="bodyStrong">{name}</Text>
      {children}
      {field.description && <Text color="secondary">{field.description}</Text>}
    </Stack>
  )
}
