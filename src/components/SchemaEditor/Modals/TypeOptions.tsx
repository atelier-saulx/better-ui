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
import { Text } from '../../Text/index.js'
import { EditType } from './EditType.js'
import { CloneType } from './CloneType.js'
import { AdvancedEditType } from './AdvancedEditType.js'

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
        <Dropdown.Item
          icon={<IconEdit />}
          onClick={() => {
            modal.open(({ close }) => {
              return <EditType onConfirm={close} typeName={typeName} />
            })
          }}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          icon={<IconCopy />}
          onClick={() => {
            modal.open(({ close }) => {
              return <CloneType onConfirm={close} typeName={typeName} />
            })
          }}
        >
          Clone type
        </Dropdown.Item>
        <Dropdown.Item
          icon={<IconFunction />}
          onClick={() => {
            modal.open(({ close }) => {
              return <AdvancedEditType onConfirm={close} typeName={typeName} />
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
                <Modal
                  confirmLabel="Delete"
                  confirmVariant="error"
                  confirmDisabled={deleteString !== typeName}
                  onConfirm={async () => {
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

                    setDeleteString('')
                    close('close')
                    // TODO @yves
                    console.log('CHANGE ROUTE')
                  }}
                >
                  <Text variant="title-modal">{`Are you sure you want to delete ${typeName}?`}</Text>
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
                </Modal>
              )
            })
          }}
        >
          Delete type
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
