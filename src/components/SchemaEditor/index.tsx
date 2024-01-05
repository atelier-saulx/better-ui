import * as React from 'react'
// import { Style, styled } from 'inlines'
import { AddType } from './Modals/AddType.js'
import { SchemaView } from './SchemaView.js'

export type SchemaEditorProps = {
  schema: { types: {} }
}

export const SchemaEditor = ({ schema }: SchemaEditorProps) => {
  return (
    <div style={{ width: 676, height: 676 }}>
      <AddType />
      <SchemaView schemaType={schema.types} />
    </div>
  )
}
