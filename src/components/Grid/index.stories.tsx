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

export const Default = () => {
  const { data: items, loading } = useQuery('fakedata', {
    arraySize: 10,
    id: '',
    title: '',
    description: '',
    image: '',
    renderAs: '',
  })

  if (loading) {
    return null
  }

  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        itemAction={() => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}

export const Row = () => {
  const { data: items, loading } = useQuery('fakedata', {
    arraySize: 10,
    id: '',
    title: '',
    description: '',
    image: '',
    renderAs: '',
  })

  if (loading) {
    return null
  }

  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        variant="row"
        itemAction={() => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}

export const SortableRow = () => {
  const { data: items, loading } = useQuery('fakedata', {
    arraySize: 10,
    id: '',
    title: '',
    description: '',
    image: '',
    renderAs: '',
  })

  if (loading) {
    return null
  }

  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        sortable
        onChange={(items) => {
          console.info(items)
        }}
        variant="row"
        itemAction={() => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item icon={<IconCopy />}>Duplicate</Dropdown.Item>
              <Dropdown.Item icon={<IconDelete />}>Delete</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}
