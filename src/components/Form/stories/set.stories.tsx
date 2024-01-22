import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { styled } from 'inlines'

const meta = {
  title: 'Form/Set',
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

export const Set = () => {
  return (
    <styled.div style={{ padding: 64 }}>
      <Form
        values={{
          set: ['a', 'b', 'c'],
          setNumber: [
            1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          ],
          object: {
            a: ['a', 'b', 'c'],
            b: [
              1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ],
          },
        }}
        fields={{
          set: {
            title: 'Set',
            type: 'set',
            description: 'A set with strings',
            items: { type: 'string' },
          },
          setNumber: {
            title: 'Set Numbers',
            type: 'set',
            description: 'A set with numbers',
            items: { type: 'number' },
          },
          object: {
            title: 'Set in an object',
            type: 'object',
            description: 'A set with numbers',
            properties: {
              a: {
                title: 'Set',
                type: 'set',
                description: 'A set with strings',
                items: { type: 'string' },
              },
              b: {
                title: 'Set Numbers',
                type: 'set',
                description: 'A set with numbers',
                items: { type: 'number' },
              },
              c: {
                title: 'Set Numbers',
                type: 'set',
                description: 'A set with numbers',
                items: { type: 'number' },
              },
            },
          },
        }}
        onChange={(values, changed, checksum) => {
          console.log({ values, changed, checksum })
        }}
      />
    </styled.div>
  )
}
