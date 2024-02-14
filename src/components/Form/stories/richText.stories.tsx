import * as React from 'react'
import { Form, Modal } from '../../../index.js'

const meta = {
  title: 'Form/RichText',
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

export const RichTextEditor = () => {
  return (
    <Form
      variant="small"
      values={{
        text: 'xyz',
        object: {
          text: 'flap flap flap',
        },
      }}
      fields={{
        text: {
          type: 'text',
          format: 'html',
        },
        object: {
          type: 'object',
          properties: {
            text: {
              type: 'text',
              format: 'html',
            },
          },
        },
      }}
      onChange={(values) => {
        console.log(values)
      }}
    />
  )
}
