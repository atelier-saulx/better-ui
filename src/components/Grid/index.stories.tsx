import * as React from 'react'
import {
  Grid,
  Dropdown,
  Button,
  IconCopy,
  IconDelete,
  IconMoreHorizontal,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
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
    <div style={{ padding: 64, height: 'calc(100vh - 150px)' }}>
      <Grid
        size={400}
        values={items}
        pagination={{
          type: 'scroll',
          total: items?.length ?? 0,
        }}
      />
    </div>
  )
}
