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
  const [state, setState] = React.useState<any>({
    text: '',
    object: {
      text: '',
    },
  })
  return (
    <Form
      variant="small"
      values={state}
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
        setState(values)
      }}
    />
  )
}
