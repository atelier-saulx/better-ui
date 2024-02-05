import * as React from 'react'
import { Schema, Modal, Page } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'demo',
  project: 'demo',
  env: 'production',
})

const meta: Meta<typeof Schema> = {
  title: 'Based/SchemaEditor',
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Modal.Provider>
          <Page style={{ width: 900 }}>
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
  const { data, loading } = useQuery('db:schema')

  console.log('Schema -->', data, 'loading =', loading)

  if (loading) {
    return null
  }

  return <Schema schemaInput={data} />
}
