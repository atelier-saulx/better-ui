import * as React from 'react'
// import { Style, styled } from 'inlines'
import { AddSchemaType } from './Modals/AddSchemaType.js'
import { SchemaView } from './SchemaView.js'

export type SchemaEditorProps = {}

export const SchemaEditor = ({}: SchemaEditorProps) => {
  return (
    <div style={{ width: 676, height: 676 }}>
      <AddSchemaType />
      <SchemaView schemaType={'Birds'} />
    </div>
  )
}
