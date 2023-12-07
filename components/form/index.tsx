import * as React from 'react'
import { BasedSchemaField } from '@based/schema'
import { Stack } from '../layout'
import { FieldSelector } from './FieldSelector'

type FormValues = { [key: string]: BasedSchemaField }

export type FormProps = {
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
  variant?: 'extensive' | 'minimal'
}

export function Form({
  fields,
  values,
  onChange,
  variant = 'extensive',
}: FormProps) {
  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        return (
          <FieldSelector
            key={key}
            variant={variant}
            propKey={key}
            values={values}
            field={field}
          />
        )
      })}
    </Stack>
  )
}
