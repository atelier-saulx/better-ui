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
  // get a schema
  const client = useClient()

  const { data: schema, loading: loadingSchema } = useQuery('db:schema')

  console.log(client, schema, loadingSchema)

  return <SchemaEditor />
}
