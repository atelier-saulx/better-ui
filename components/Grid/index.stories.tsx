import * as React from 'react'
import { Grid } from './'
import type { Meta } from '@storybook/react'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof Grid> = {
  title: 'Components/(WIP) Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const items = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  title: faker.system.commonFileName(),
  description: faker.lorem.words({ min: 0, max: 10 }),
  image: faker.image.url(),
  renderAs: faker.helpers.arrayElement(['folder', 'file', 'image']) as
    | 'folder'
    | 'file'
    | 'image',
}))

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid items={items} />
    </div>
  )
}

export const Row = () => {
  return (
    <div style={{ padding: 64 }}>
      <Grid items={items} variant="row" />
    </div>
  )
}
