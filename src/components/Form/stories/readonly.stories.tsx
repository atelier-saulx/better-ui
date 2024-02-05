import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { faker } from '@faker-js/faker'

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
        id: faker.string.uuid().slice(0, 8),
        email: faker.internet.email(),
        name: faker.person.firstName(),
        password: faker.string.alphanumeric(10),
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
