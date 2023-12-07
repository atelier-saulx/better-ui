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
          src: 'https://i.imgur.com/t1bWmmC.jpeg',
          set: ['a', 'b', 'c'],
          arraySimple: ['a', 'b', 'c'],
          array: [
            {
              bla: 'snurp',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
          ],
          setFiles: [
            'https://i.imgur.com/t1bWmmC.jpeg',
            'https://i.imgur.com/t1bWmmC.jpeg',
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
              z: 'xxx',
            },
          },
        }}
        fields={{
          name: {
            title: 'Name',
            type: 'string',
            description: 'A name of someone',
          },
          shortnumber: {
            type: 'number',
            display: 'short',
          },
          flap: {
            type: 'string',
          },
          src: {
            type: 'string',
            contentMediaType: '*/*',
          },
          set: {
            title: 'Set',
            type: 'set',
            description: 'A set',
            items: { type: 'string' },
          },
          setFiles: {
            title: 'Set',
            type: 'set',
            description: 'A set with files',
            items: { type: 'string', contentMediaType: '*/*' },
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
                src: { type: 'string', contentMediaType: '*/*' },
              },
            },
          },
          arraySimple: {
            title: 'Simple Array',
            type: 'array',
            description: 'An array with a string',
            values: {
              type: 'string',
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
              name: { type: 'string' },
              src: { type: 'string', contentMediaType: '*/*' },
              derp: {
                type: 'object',
                properties: {
                  x: { type: 'string' },
                  y: { type: 'string' },
                  z: { type: 'string' },
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
