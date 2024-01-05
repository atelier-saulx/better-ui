import * as React from 'react'
import { Text } from '../../Text/index.js'
import { Modal } from '../../Modal/index.js'
import { Button } from '../../Button/index.js'
import { Dropdown } from '../../Dropdown/index.js'
import { IconMoreHorizontal } from '../../Icons/index.js'
import { FieldModal } from './FieldModal.js'

export const FieldOptions = ({ item }) => {
  const { open } = Modal.useModal()
  const modal = Modal.useModal()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="neutral-transparent" shape="square">
          <IconMoreHorizontal />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item
          onClick={async () => {
            const result = await open(({ close }) => (
              <Modal
                onConfirm={() => {
                  close('close this')
                }}
              >
                {/* Field modal add prefilled field */}
                <FieldModal fieldType={item.type} />
              </Modal>
            ))

            console.log(result)
          }}
        >
          Edit
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            modal.open(
              <Modal>
                <Text variant="bodyBold">
                  Are you sure you want to delete {item.label}?
                </Text>

                <Modal.Actions>
                  <Button
                    variant="error"
                    onClick={() => {
                      console.log('delete this field')
                      close()
                    }}
                  >
                    Delete
                  </Button>
                </Modal.Actions>
              </Modal>
            )
          }}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
