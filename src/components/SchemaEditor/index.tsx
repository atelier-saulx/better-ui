import * as React from 'react'
import { SchemaView } from './SchemaView.js'
import { SchemaSideBar } from './SchemaSideBar.js'

export type SchemaEditorProps = {
  schema: { types: {} }
}

export const SchemaEditor = ({ schema }: SchemaEditorProps) => {
  const [active, setActive] = React.useState('')

  return (
    <div style={{ width: 676, minHeight: 676, display: 'flex' }}>
      <SchemaSideBar
        types={schema.types}
        active={active}
        setActive={setActive}
      />
      <SchemaView schemaTypes={schema.types} typeName={active} />
    </div>
  )
}
