import * as React from 'react'
import { BasedSchemaField } from '@based/schema'
import { Stack } from '../layout'
import { selectField } from './selectField'

type FormValues = { [key: string]: BasedSchemaField }

export type FormProps = {
  values: { [key: string]: any }
  onChange: (values: FormValues) => void
  fields: FormValues
}

export function Form({ fields, values, onChange }: FormProps) {
  // const values = React.useRef<FormValues>({})
  return (
    <Stack gap={32} direction="column" align="start">
      {Object.entries(fields).map(([key, field]) => {
        return selectField(field, key, values)
      })}
    </Stack>
  )
}
