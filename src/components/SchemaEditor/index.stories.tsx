import * as React from 'react'
import { SchemaEditor, Modal } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery, useClient, useAuthState } from '@based/react'

const client = based({
  org: 'demo',
  project: 'demo',
  env: 'production',
})

const meta: Meta<typeof SchemaEditor> = {
  title: 'Based/SchemaEditor',
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
      cows: {},
      dogs: {},
    },
  }

  const authState = useAuthState()
  // get a schema
  const client = useClient()

  const { data, loading: loadingSchema, ...props } = useQuery('db:schema')

  console.log('🦐', authState)
  console.log('🐠', client, data, loadingSchema, props)

  const test = async () => {
    const data = await client.query('db:schema').get()
    console.info('w8 ff', data)
  }

  test()

  console.log(client.query('db:schema').cache?.v)

  return <SchemaEditor schema={example} />
}
