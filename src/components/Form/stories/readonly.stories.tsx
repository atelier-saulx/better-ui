import * as React from 'react'
import { Form, Modal } from '../../../index.js'

const meta = {
  title: 'Form/ReadOnly',
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

export const ReadOnly = () => {
  return (
    <Form
      values={{
        id: 'b28237fa',
        email: 'Ashlynn_Schamberger0@gmail.com',
        name: 'Marcia',
        password: 'U4GKHXd829',
      }}
      fields={{
        id: { type: 'string', readOnly: true },
        email: { type: 'string', readOnly: true, format: 'email' },
        name: { type: 'string', readOnly: true },
        password: { type: 'string', readOnly: true, format: 'strongPassword' },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}
