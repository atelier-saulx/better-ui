import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { objectField } from './objectField.js'
import { deepMerge } from '@saulx/utils'

const meta = {
  title: 'Form/Arrays',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const Arrays = () => {
  return (
    <Form
      values={{
        simpleArray: ['hello'],
        array: [
          {
            price: 2,
            powerful: 'rgb(188,56,0)',
          },
          {
            powerful: 'rgb(78,56,188)',
          },
          {
            powerful: 'rgb(78,56,188)',
          },
        ],
        nestedArray: [
          [
            {
              powerful: 'rgb(78,56,188)',
            },
            {
              powerful: 'rgb(78,56,188)',
            },
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
          [
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
          [
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
        ],
        arrayAutoTitle: [
          {
            name: 'fun',
          },
          {
            name: 'flap',
          },
          {
            name: 'Snurpie',
          },
        ],
        nestedArrayBig: [
          [
            {
              name: 'fun',
            },
          ],
        ],
        sequences: [
          {
            name: 'Countdown',
            pages: [
              {
                name: 'Countdown',
                id: 'p1',
              },
            ],
          },
          {
            name: 'Voting starts',
            pages: [
              {
                name: 'welcome',
                id: 'p1',
              },
              {
                name: 'vote!',
                id: 'p3',
              },
              {
                name: 'bye',
                id: 'p2',
              },
            ],
          },
        ],
      }}
      fields={{
        emptyArray: {
          title: 'Empty array',
          description: 'some things',
          type: 'array',
          items: objectField.ratings,
        },
        simpleArray: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        array: {
          title: 'Things',
          description: 'some things',
          type: 'array',
          items: {
            ...deepMerge(objectField.ratings, {
              properties: { isDope: { type: 'boolean' } },
            }),
          },
        },
        sequences: {
          title: 'Seqeunces',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              pages: { type: 'references' },
            },
          },
        },
        nestedArray: {
          title: 'Nested things',
          description: 'some things, nested',
          type: 'array',
          items: {
            description: 'some things',
            type: 'array',
            items: objectField.ratings,
          },
        },
        nestedArrayBig: {
          title: 'Nested things large',
          description: 'some things, nested',
          type: 'array',
          items: {
            description: 'some things',
            type: 'array',
            items: objectField.object,
          },
        },
        arrayAutoTitle: {
          title: 'Auto title',
          description: 'some things',
          type: 'array',
          items: objectField.object,
        },
      }}
      onChange={(values, changes, checksum, based) => {}}
    />
  )
}
