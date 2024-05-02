import * as React from 'react'
import {
  Button,
  DropdownHookProvider,
  IconDelete,
  IconMoreVertical,
  Dropdown,
  useDropdown,
} from '../../index.js'

const meta = {
  title: 'Atoms/Dropdown',
  decorators: [
    (Story) => (
      <DropdownHookProvider>
        <Story />
      </DropdownHookProvider>
    ),
  ],
}
export default meta

export const Default = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button shape="square" variant="neutral">
          <IconMoreVertical />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        {Array.from({ length: 200 }).map((_, i) => (
          <Dropdown.Item
            key={i}
            onClick={() => {
              alert(`delete ${i}`)
            }}
            icon={<IconDelete />}
          >
            Delete {i}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown.Root>
  )
}

function SimpleDropdown({ close, numberOfItems }) {
  return (
    <Dropdown.Items>
      {Array.from({ length: numberOfItems }).map((_, i) => (
        <Dropdown.Item
          key={i}
          onClick={() => {
            close(`delete ${i}`)
          }}
        >
          Delete {i}
        </Dropdown.Item>
      ))}
    </Dropdown.Items>
  )
}

export const Hook = () => {
  const { open } = useDropdown()

  return (
    <Button
      shape="square"
      variant="neutral"
      onClick={async () => {
        const value = await open(SimpleDropdown, { numberOfItems: 5 })
      }}
    >
      <IconMoreVertical />
    </Button>
  )
}
