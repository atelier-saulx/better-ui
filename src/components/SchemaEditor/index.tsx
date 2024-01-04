import * as React from 'react'
// import { Style, styled } from 'inlines'
import { AddSchemaType } from './Modals/AddSchemaType.js'
import { SchemaView } from './SchemaView.js'

export type SchemaEditorProps = {}

export const SchemaEditor = ({}: SchemaEditorProps) => {
  const example = {
    birds: {
      meta: {
        description: 'big and small birds',
        name: 'bird',
        displayName: 'Birdies',
      },
      fields: {
        id: {
          index: 0,
          meta: { name: 'Id' },
          type: 'id',
        },
        flap: {
          index: 1,
          meta: { name: 'Flap', displayName: 'Flappie' },
          type: 'string',
        },
        flip: {
          index: 2,
          meta: { name: 'fLip', displayName: 'Flippiie' },
          type: 'number',
        },
      },
    },
  }

  return (
    <div style={{ width: 676, height: 676 }}>
      <AddSchemaType />
      <SchemaView schemaType={example} />
    </div>
  )
}
