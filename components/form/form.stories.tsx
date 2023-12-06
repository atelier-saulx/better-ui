import * as React from 'react'
import { Form } from './'

const meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        values={{
          set: ['a', 'b', 'c'],
          array: [
            {
              bla: 'flap',
              snurp: 'hello snuf',
              flap: 'gurt',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              flap: 'gurt',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              flap: 'gurt',
            },
          ],
          record: {
            bla: {
              bla: 'flap',
              snurp: 'hello snuf',
              flap: 'gurt',
            },
            snurp: {
              bla: 'flap',
              snurp: 'hello snuf snuf snuf',
              flap: 'gurt',
            },
          },
          recordPrimitive: {
            x: 'flap',
            y: 'flup',
          },
          object: {
            bla: 'hello!',
            snurp: 'derp!',
            derp: {
              x: 'nurp',
              y: 'gurt',
            },
          },
        }}
        fields={{
          name: {
            title: 'Name',
            type: 'string',
            description: 'A name of someone',
          },
          flap: {
            type: 'string',
          },
          set: {
            title: 'Set',
            type: 'set',
            description: 'A set',
            items: { type: 'string' },
          },
          array: {
            title: 'Array',
            type: 'array',
            description: 'An array with an object',
            values: {
              type: 'object',
              properties: {
                bla: { type: 'string' },
                snurp: { type: 'string' },
                flap: { type: 'string' },
              },
            },
          },
          record: {
            title: 'Record',
            type: 'record',
            values: {
              type: 'object',
              properties: {
                bla: { type: 'string' },
                snurp: { type: 'string' },
                flap: { type: 'string' },
                // derp: {
                //   type: 'object',
                //   properties: {
                //     x: { type: 'string' },
                //     y: { type: 'string' },
                //   },
                // },
              },
            },
          },
          recordPrimitive: {
            title: 'Primitve record',
            type: 'record',
            values: {
              type: 'string',
            },
          },
          object: {
            title: 'Object',
            type: 'object',
            properties: {
              bla: { type: 'string' },
              snurp: { type: 'string' },
              derp: {
                type: 'object',
                properties: {
                  x: { type: 'string' },
                  y: { type: 'string' },
                },
              },
            },
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
        // selectReferences={}
      />
    </div>
  )
}
