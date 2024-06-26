import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { wait } from '@saulx/utils'
import { objectField } from './objectField.js'

const meta = {
  title: 'Form/Object',
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

const ts = `import * as React from 'react'

export function Svg({ style, width = 20, height = 20 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="a b c"
      />
    </svg>
  )
}
`

const fileUpload = async ({ value }, updateProgress) => {
  if (!value) {
    return undefined
  }
  let p = 0
  while (p < 100) {
    p += 10
    updateProgress(p)
    await wait(100)
  }
  return 'https://i.imgur.com/DRmh6S9.jpeg'
}

export const Object = () => {
  return (
    <Form
      onFileUpload={fileUpload}
      variant="small"
      values={{
        ratings: {
          powerful: 'rgb(78,56,188)',
        },
        object: {
          location: {
            snurp: {
              id: 'flap',
              name: 'flap/bla/Screenshot_213123213213.png',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            doink: 'th123212',
          },
        },
        orderWithDescription: {
          code: ts,
          json: JSON.stringify(
            { y: 1, x: 1, z: 1, someThing: 'great' },
            null,
            2,
          ),
        },
      }}
      fields={objectField}
      onChange={(values) => {}}
    />
  )
}

export const ObjectReadOnly = () => {
  return (
    <Form
      onFileUpload={fileUpload}
      variant="small"
      values={{
        bla: {
          id: '12345',
          snurp: Date.now(),
          bla: 'https://i.imgur.com/DRmh6S9.jpeg',
        },
      }}
      fields={{
        bla: {
          readOnly: true,
          type: 'object',
          properties: {
            bla: { type: 'string', contentMediaType: 'image/*' },
            id: { title: 'Id', type: 'string', format: 'basedId' },
            snurp: { type: 'timestamp', display: 'date-time-text' },
          },
        },
      }}
    />
  )
}
