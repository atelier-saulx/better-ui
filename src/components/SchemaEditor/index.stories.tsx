import * as React from 'react'
import { SchemaEditor, Modal } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof SchemaEditor> = {
  title: 'Based/SchemaEditor',
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
  return <SchemaEditor />
}
