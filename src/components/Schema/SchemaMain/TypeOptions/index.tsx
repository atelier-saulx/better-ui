import * as React from 'react'
import { Button, Dropdown, Modal } from '../../../../index.js'
import {
  IconEdit,
  IconMoreHorizontal,
  IconCopy,
  IconFunction,
  IconDelete,
} from '../../../Icons/index.js'
import { EditType } from './EditType.js'
import { CloneType } from './CloneType.js'
import { AdvancedEditType } from './AdvancedEditType.js'
import { DeleteType } from './DeleteType.js'
import { useContextState } from '../../../../hooks/ContextState/index.js'

export const TypeOptions = () => {
  const [type, setType] = useContextState('type')

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
              return <EditType onConfirm={close} typeTitle={type} />
            })
          }}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          icon={<IconCopy />}
          onClick={() => {
            modal.open(({ close }) => {
              return <CloneType onConfirm={close} typeTitle={type} />
            })
          }}
        >
          Clone type
        </Dropdown.Item>
        <Dropdown.Item
          icon={<IconFunction />}
          onClick={() => {
            modal.open(({ close }) => {
              return <AdvancedEditType onConfirm={close} typeTitle={type} />
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
                  typeTitle={type}
                  setActive={setType}
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
