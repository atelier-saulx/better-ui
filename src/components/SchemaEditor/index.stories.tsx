import * as React from 'react'
import { SchemaEditor, Modal } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SchemaEditor> = {
  title: 'Based/SchemaEditor',
  //   component: SchemaEditor,
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

// export const Default: StoryObj<typeof SchemaEditor> = {
//   args: {
//     // children: 'Have a nice day!',
//     // variant: 'body',
//   },
// }
export const Default = () => {
  return (
    <>
      <SchemaEditor />
    </>
  )
}
