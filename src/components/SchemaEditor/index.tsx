import * as React from 'react'
import { SchemaView } from './SchemaView.js'
import { SchemaSideBar } from './SchemaSideBar.js'

export type SchemaEditorProps = {
  schema: { types: {} }
}

export const SchemaEditor = ({ schema }: SchemaEditorProps) => {
  return (
    <div style={{ width: 767, height: 676, display: 'flex' }}>
      <SchemaSideBar types={schema.types} />
      <SchemaView schemaType={schema.types} />
    </div>
  )
}
