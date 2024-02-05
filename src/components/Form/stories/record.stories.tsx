import * as React from 'react'
import { Form, Modal } from '../../../index.js'

const meta = {
  title: 'Form/Record',
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

export const Record = () => {
  return (
    <Form
      variant="small"
      values={{
        record: {
          flap: 'flap',
          snurp: 'derp',
        },
        ratings: {
          powerful: 'rgb(78,56,188)',
        },
        recordObject: {
          flap: { price: 200 },
          flup: { price: 50 },
        },
        recordObjectBig: {
          big: {},
          blap: {},
        },
      }}
      fields={{
        record: {
          title: 'Fun record',
          type: 'record',
          values: {
            type: 'string',
          },
        },
        recordMultiline: {
          title: 'Multiline record',
          type: 'record',
          values: {
            type: 'string',
            multiline: true,
          },
        },
        recordObject: {
          title: 'Nested record',
          type: 'record',
          values: {
            title: 'Ratings',
            description: 'Rating of things',
            type: 'object',
            properties: {
              price: { type: 'number', title: 'Price' },
              quality: { type: 'string', title: 'Quality' },
              time: { type: 'timestamp', title: 'Time' },
              powerful: {
                type: 'string',
                title: 'Power Level',
                format: 'rgbColor',
              },
            },
          },
        },
        recordObjectBig: {
          title: 'Nested big record',
          type: 'record',
          values: {
            title: 'Restaurant',
            description: 'Restaurant of the form',
            type: 'object',
            properties: {
              name: { type: 'string', title: 'Name' },
              isItDope: {
                title: 'Dopeness',
                type: 'boolean',
              },
              bla: {
                type: 'reference',
                bidirectional: {
                  fromField: 'bla',
                },
                title: 'Bla',
                allowedTypes: ['root'],
              },
              contact: {
                title: 'Contact',
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  phone: { type: 'string', format: 'mobilePhone' },
                  email: { type: 'string', format: 'email' },
                  picture: { type: 'string', contentMediaType: '*/*' },
                },
              },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.log({
          values,
          changed,
          checksum,
          based,
        })
      }}
    />
  )
}
