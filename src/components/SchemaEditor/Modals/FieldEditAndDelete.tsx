import * as React from 'react'
import { Modal } from '../../Modal/index.js'
import { Button } from '../../Button/index.js'
import { Dropdown } from '../../Dropdown/index.js'
import { IconMoreHorizontal } from '../../Icons/index.js'
// import { FieldModal } from './FieldModal.js'
import { useClient } from '@based/react'

export const FieldEditAndDelete = ({ item, typeName }) => {
  // const { open } = Modal.useModal()
  const modal = Modal.useModal()

  const client = useClient()

  console.log(item)

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="neutral-transparent" shape="square">
          <IconMoreHorizontal />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item
        //   onClick={async () => {
        //     const result = await open(({ close }) => (
        //       <Modal
        //         onConfirm={() => {
        //           close('close this')
        //         }}
        //       >
        //         {/* Field modal add prefilled field */}
        //         <FieldModal fieldType={item.type} />
        //       </Modal>
        //     ))

        //     console.log(result)
        //   }}
        >
          Edit
        </Dropdown.Item>
        {/* 
        <Modal.Root>
          <Modal.Trigger>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Modal.Trigger>
          <Modal.Overlay>
            {({ close }) => (
              <>
                <Modal.Title
                  children={`Are you sure you want to delete ${item.label}?`}
                />

                <Modal.Message
                  variant="error"
                  message={`you are about to delete the field: ${item.label} `}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />
                <Modal.Actions>
                  <Button variant="neutral" onClick={close}>
                    Cancel
                  </Button>
                  <Button
                    variant="error"
                    onClick={async () => {
                      await client.call('db:set-schema', {
                        mutate: true,
                        schema: {
                          types: {
                            [typeName]: {
                              fields: {
                                [item.name]: { $delete: true },
                              },
                            },
                          },
                        },
                      })

                      close()
                    }}
                  >
                    Delete
                  </Button>
                </Modal.Actions>
              </>
            )}
          </Modal.Overlay>
        </Modal.Root> */}
        <Dropdown.Item
          onClick={() => {
            modal.open(
              <Modal
                title={`Are you sure you want to delete ${item.label}?`}
                onConfirm={async () => {
                  console.log('delete this')

                  await client.call('db:set-schema', {
                    mutate: true,
                    schema: {
                      types: {
                        [typeName]: {
                          fields: {
                            [item.name]: { $delete: true },
                          },
                        },
                      },
                    },
                  })

                  close()
                }}
              >
                <Modal.Message
                  variant="error"
                  message={`you are about to delete the field: ${item.label} `}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />
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
