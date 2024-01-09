import * as React from 'react'
import { SchemaEditor, Modal, Page } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

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
          <Page style={{ width: 1024 }}>
            <Story />
          </Page>
        </Modal.Provider>
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  // get a schema
  const { data, loading: loadingSchema } = useQuery('db:schema')

  console.log('xx', data, loadingSchema)

  return <SchemaEditor schema={data || { types: { fields: {} } }} />
}