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
import { faker } from '@faker-js/faker'

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

let thing = 0

const propItems = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  title: faker.system.commonFileName(),
  description: faker.lorem.words({ min: 0, max: 10 }),
  index: thing++,
  image: faker.image.urlLoremFlickr({ category: 'cats' }),
  renderAs: faker.helpers.arrayElement(['folder', 'file', 'image']) as
    | 'folder'
    | 'file'
    | 'image',
}))

export const Default = () => {
  const [items, setItems] = React.useState(propItems)
  console.log(items.length)

  return (
    <div style={{ padding: 64 }}>
      <Grid
        onUpload={(v) => console.log(v)}
        onMove={(v) => {
          for (const i in v) {
            console.log(v[i].index)
          }
        }}
        items={items}
        itemAction={(e) => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item
                onClick={() =>
                  setItems([
                    ...items,
                    { ...e, id: faker.string.uuid().slice(0, 8) },
                  ])
                }
                icon={<IconCopy />}
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setItems((v) => v.filter((i) => i.id !== e.id))}
                icon={<IconDelete />}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}

export const Row = () => {
  const [items, setItems] = React.useState(propItems)

  return (
    <div style={{ padding: 64 }}>
      <Grid
        items={items}
        variant="row"
        itemAction={(e) => (
          <Dropdown.Root>
            <Dropdown.Trigger>
              <Button variant="icon-only">
                <IconMoreHorizontal />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item
                onClick={() =>
                  setItems([
                    ...items,
                    { ...e, id: faker.string.uuid().slice(0, 8) },
                  ])
                }
                icon={<IconCopy />}
              >
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setItems((v) => v.filter((i) => i.id !== e.id))}
                icon={<IconDelete />}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        )}
      />
    </div>
  )
}

export const SortableRow = () => {
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
