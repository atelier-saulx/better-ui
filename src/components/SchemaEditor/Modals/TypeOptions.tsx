import * as React from 'react'
import { Button } from '../../Button/index.js'
import { Dropdown } from '../../Dropdown/index.js'
import {
  IconEdit,
  IconMoreHorizontal,
  IconCopy,
  IconFunction,
  IconDelete,
} from '../../Icons/index.js'

export const TypeOptions = () => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="icon-only">
          <IconMoreHorizontal />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item icon={<IconEdit />}>Edit name</Dropdown.Item>
        <Dropdown.Item icon={<IconCopy />}>Clone type</Dropdown.Item>
        <Dropdown.Item icon={<IconFunction />}>Advanced edit</Dropdown.Item>
        <Dropdown.Item icon={<IconDelete />}>Delete type</Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
