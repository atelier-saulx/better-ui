import React from 'react'
import { Stack } from '../Stack/index.js'
import { SchemaLeft } from './SchemaLeft/index.js'
import { SchemaMain } from './SchemaMain/index.js'
import { StateProvider } from '../../hooks/ContextState/index.js'
import { Style } from 'inlines'

type SchemaProps = {
  schema: {}
  style?: Style
  values?: { field: string[]; type: string; db: string }
  onChange?: (key: string, val: any) => void
}

export const Schema = ({ schema, style, values, onChange }: SchemaProps) => {
  return (
    <Stack style={{ ...style }} justify="start">
      <StateProvider values={values} onChange={onChange}>
        <SchemaLeft schema={schema} />
        <SchemaMain />
      </StateProvider>
    </Stack>
  )
}
