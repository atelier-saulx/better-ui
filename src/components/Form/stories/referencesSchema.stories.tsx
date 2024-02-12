import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { faker } from '@faker-js/faker/locale/en'

const meta = {
  title: 'Form/ReferencesSchema',
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

const people = new Array(10).fill(null).map(() => ({
  avatar: {
    src: faker.image.avatar(),
    name: faker.word.adverb(),
    id: faker.string.uuid().slice(0, 8),
  },
  category: {
    id: faker.string.uuid().slice(0, 8),
    name: 'Category ' + faker.word.adverb(),
    logo: {
      src: faker.image.avatar(),
      name: faker.word.adverb(),
      id: faker.string.uuid().slice(0, 8),
    },
  },
  name: faker.person.firstName(),
  id: faker.string.uuid().slice(0, 8),
  password: faker.string.alphanumeric(10),
  email: faker.internet.email(),
}))

export const ReferencesFullSchema = () => {
  return (
    <Form
      values={{
        people,
      }}
      fields={{
        people: {
          sortable: true,
          title: 'People time',
          type: 'references',
          allowedTypes: ['person', 'user'],
        },
      }}
      schema={{
        types: {
          person: {
            fields: {
              name: { type: 'string' },
              avatar: { type: 'reference', allowedTypes: ['file'] },
              category: { type: 'reference', allowedTypes: ['category'] },
            },
          },
          user: {
            fields: {
              name: { type: 'string' },
              avatar: { type: 'reference', allowedTypes: ['file'] },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', format: 'strongPassword' },
            },
          },
          file: {
            fields: {
              mimeType: { type: 'string' },
              name: { type: 'string' },
              src: { type: 'string', contentMediaType: '*/*' },
            },
          },
          category: {
            fields: {
              name: { type: 'string' },
              logo: { type: 'reference', allowedTypes: ['file'] },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}

export const ReferencesFullSchemaEditable = () => {
  return (
    <Form
      editableReferences
      values={{
        people,
      }}
      fields={{
        people: {
          sortable: true,
          title: 'People time',
          type: 'references',
          allowedTypes: ['person'],
        },
      }}
      schema={{
        types: {
          person: {
            fields: {
              name: { type: 'string' },
              avatar: { type: 'reference', allowedTypes: ['file'] },
              category: { type: 'reference', allowedTypes: ['category'] },
            },
          },
          file: {
            fields: {
              mimeType: { type: 'string' },
              name: { type: 'string' },
              src: { type: 'string', contentMediaType: '*/*' },
            },
          },
          category: {
            fields: {
              name: { type: 'string' },
              logo: { type: 'reference', allowedTypes: ['file'] },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}
