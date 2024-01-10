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
import { useClient } from '@based/react'
import { TextInput } from '../../TextInput/index.js'

export const TypeOptions = ({ typeName }) => {
  const modal = Modal.useModal()

  const client = useClient()

  const [deleteString, setDeleteString] = React.useState('')

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

        <Dropdown.Item
          icon={<IconDelete />}
          onClick={() => {
            modal.open(
              <Modal title={`Are you sure you want to delete ${typeName}?`}>
                <Modal.Message
                  variant="error"
                  message={`you are about to delete the type: ${typeName} and all of it's children`}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />

                <TextInput
                  label={`type ${typeName} to confirm the deleting of this type.`}
                  value={deleteString}
                  onChange={(v) => setDeleteString(v)}
                  autoFocus
                />

                <Modal.Actions>
                  <Button
                    variant="error"
                    onClick={async () => {
                      console.log('delete this', deleteString)

                      // if (deleteString === typeName) {
                      console.log('👍')
                      await client.call('db:set-schema', {
                        mutate: true,
                        schema: {
                          types: {
                            [typeName]: {
                              $delete: true,
                            },
                          },
                        },
                      })
                      // }
                      setDeleteString('')
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
          Delete type
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
