import * as React from 'react'
import { SchemaEditor, Modal } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery, useClient } from '@based/react'

const meta: Meta<typeof SchemaEditor> = {
  title: 'Based/SchemaEditor',
  decorators: [
    (Story) => (
      <Provider
        client={based({
          org: 'demo',
          project: 'demo',
          env: 'production',
        })}
      >
        <Modal.Provider>
          <Story />
        </Modal.Provider>
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  // for now
  const example = {
    types: {
      birds: {
        meta: {
          description: 'big and small birds',
          name: 'bird',
          displayName: 'Birdies',
        },
        fields: {
          id: {
            index: 0,
            meta: { name: 'Id' },
            type: 'id',
          },
          flap: {
            index: 1,
            meta: { name: 'Flap', displayName: 'Flappie' },
            type: 'string',
          },
          flip: {
            index: 2,
            meta: { name: 'fLip', displayName: 'Flippiie' },
            type: 'number',
          },
        },
      },
    },
  }

  // get a schema
  const client = useClient()

  const { data: schema, loading: loadingSchema } = useQuery('db:schema')

  console.log(client, schema, loadingSchema)

  return <SchemaEditor schema={example} />
}
