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
import { Modal } from '../../Modal/index.js'
import { EditType } from './EditType.js'
import { CloneType } from './CloneType.js'
import { AdvancedEditType } from './AdvancedEditType.js'
import { DeleteType } from './DeleteType.js'

export const TypeOptions = ({ typeTitle, setActive }) => {
  const modal = Modal.useModal()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="icon-only">
          <IconMoreHorizontal />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item
          icon={<IconEdit />}
          onClick={() => {
            modal.open(({ close }) => {
              return <EditType onConfirm={close} typeTitle={typeTitle} />
            })
          }}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          icon={<IconCopy />}
          onClick={() => {
            modal.open(({ close }) => {
              return <CloneType onConfirm={close} typeTitle={typeTitle} />
            })
          }}
        >
          Clone type
        </Dropdown.Item>
        <Dropdown.Item
          icon={<IconFunction />}
          onClick={() => {
            modal.open(({ close }) => {
              return (
                <AdvancedEditType onConfirm={close} typeTitle={typeTitle} />
              )
            })
          }}
        >
          Advanced edit
        </Dropdown.Item>
        {/* DELETE TYPE */}
        <Dropdown.Item
          icon={<IconDelete />}
          onClick={() => {
            modal.open(({ close }) => {
              return (
                <DeleteType
                  onConfirm={close}
                  typeTitle={typeTitle}
                  setActive={setActive}
                />
              )
            })
          }}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
