import * as React from 'react'
import { List, border } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Virtualized = () => {
  const { data: items, loading } = useQuery('fakedata', {
    arraySize: 1000,
    id: '',
    title: '',
    createdAt: '',
    src: '',
    color: '',
  })

  return (
    <div style={{ height: 'calc(100vh - 150px)', border: border() }}>
      <List
        values={items}
        fields={{
          id: { type: 'string', format: 'basedId' },
          title: { type: 'string' },
          createdAt: { type: 'timestamp' },
        }}
        pagination={{
          type: 'scroll',
          total: items?.length ?? 0,
        }}
      />
    </div>
  )
}
