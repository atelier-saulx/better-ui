import * as React from 'react'
import { SchemaEditor, Modal, Page } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useClient, useQuery } from '@based/react'

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
          <Page>
            <Story />
          </Page>
        </Modal.Provider>
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  // // get a schema
  const client = useClient()
  const { data, loading: loadingSchema } = useQuery('db:schema')
  const testData = client.query('db:schema').cache?.v

  console.log('xx', testData, data, loadingSchema)

  return <SchemaEditor schema={testData || { types: { fields: {} } }} />
}
