import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Form/ReferencesSchema',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Modal.Provider>
          <Story />
        </Modal.Provider>
      </Provider>
    ),
  ],
}

export default meta

export const ReferencesFullSchema = () => {
  const { data: people, loading } = useQuery('fakedata', {
    arraySize: 10,
    avatar: {
      src: '',
      name: '',
      id: '',
    },
    category: {
      id: '',
      name: '',
      logo: {
        src: '',
        name: '',
        id: '',
      },
    },
    name: '',
    id: '',
    password: '',
    email: '',
  })

  if (loading) {
    return null
  }

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
      onChange={(values, changed, checksum, based) => {}}
    />
  )
}

export const ReferencesFullSchemaEditable = () => {
  const { data: people, loading } = useQuery('fakedata', {
    arraySize: 10,
    avatar: {
      src: '',
      name: '',
      id: '',
    },
    category: {
      id: '',
      name: '',
      logo: {
        src: '',
        name: '',
        id: '',
      },
    },
    name: '',
    id: '',
    password: '',
    email: '',
  })

  if (loading) {
    return null
  }

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
      onChange={(values, changed, checksum, based) => {}}
    />
  )
}

export const NoFlexibleWidth = () => {
  const { data: people, loading } = useQuery('fakedata', {
    arraySize: 10,
    avatar: {
      src: '',
      name: '',
      id: '',
    },
    category: {
      id: '',
      name: '',
      logo: {
        src: '',
        name: '',
        id: '',
      },
    },
    type: 'person',
    name: '',
    id: '',
    password: '',
    email: '',
  })

  if (loading) {
    return null
  }

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
              id: { type: 'string', format: 'basedId', readOnly: true },
              price: { type: 'number' },
              bla: { type: 'number' },
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {}}
    />
  )
}

export const IncorrectReferences = () => {
  const { data: people, loading } = useQuery('fakedata', {
    arraySize: 10,
    avatar: {
      src: '',
      name: '',
      id: '',
    },
    name: '',
    id: '',
  })

  if (loading) {
    return null
  }

  const example = {
    fields: {
      attachments: {
        title: 'Multiple attachments',
        type: 'references',
      },
    },
    schema: {
      types: {
        todo: {
          pluralName: '',
          description: '',
          title: 'todo',
          fields: {
            // index: {
            //   title: 'index',
            //   type: 'number',
            // },
            id: {
              format: 'basedId',
              type: 'string',
            },
            attachments: {
              title: 'Multiple attachments',
              type: 'references',
            },
            // createdAt: {
            //   type: 'timestamp',
            //   display: 'human',
            // },
            name: {
              title: 'name',
              type: 'string',
            },
            updatedAt: {
              type: 'timestamp',
              // display: 'human',
            },
          },
        },
      },
    },
    values: {
      attachments: [
        {
          createdAt: 1707741394210,
          id: '1000b2640e',
          index: 676,
          type: 'todo',
          updatedAt: 1707741394210,
        },
        {
          createdAt: 1707519600000,
          id: '1001532335',
          index: 1,
          name: 'flap1231231249889',
          type: 'todo',
          updatedAt: 1707820578097,
        },
      ],
    },
  }

  return (
    <Form
      editableReferences
      values={example.values}
      // @ts-ignore
      fields={example.fields}
      // @ts-ignore
      schema={example.schema}
      onChange={(values, changed, checksum, based) => {}}
    />
  )
}
