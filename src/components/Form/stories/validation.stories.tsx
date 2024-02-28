import * as React from 'react'
import { Form, border, Modal } from '../../../index.js'

const meta = {
  title: 'Form/Validation',
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

export const Default = () => {
  return (
    <div style={{ borderRadius: 8, border: border() }}>
      <Form
        onSelectReference={async () => ({ id: 'file1' })}
        fields={{
          foo: {
            type: 'string',
            isRequired: true,
          },
          bar: {
            type: 'boolean',
            isRequired: true,
          },
          file: {
            type: 'reference',
            allowedTypes: ['file'],
          },
          object: {
            title: 'An object',
            type: 'object',
            properties: {
              propOne: {
                title: 'Property one',
                type: 'string',
                isRequired: true,
              },
              propTwo: {
                title: 'Property two',
                type: 'object',
                isRequired: true,
                properties: {
                  foo2: {
                    type: 'string',
                    isRequired: true,
                  },
                  bar2: {
                    type: 'boolean',
                  },
                },
              },
              propThree: {
                type: 'reference',
                allowedTypes: ['file'],
                isRequired: true,
              },
            },
          },
        }}
        onChange={(values) => {}}
      />
    </div>
  )
}
