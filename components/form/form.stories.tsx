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
          src: 'https://th-thumbnailer.cdn-si-edu.com/bgmkh2ypz03IkiRR50I-UMaqUQc=/1000x750/filters:no_upscale():focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg',
          set: ['a', 'b', 'c'],
          arraySimple: ['a', 'b', 'c'],
          array: [
            {
              bla: 'snurp',
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
