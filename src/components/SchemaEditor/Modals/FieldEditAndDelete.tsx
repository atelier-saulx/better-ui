import * as React from 'react'
import { Modal } from '../../Modal/index.js'
import { Button } from '../../Button/index.js'
import { Dropdown } from '../../Dropdown/index.js'
import { IconMoreHorizontal } from '../../Icons/index.js'
// import { FieldModal } from './FieldModal.js'
import { useClient, useQuery } from '@based/react'
import { findPath } from '../utils/findPath.js'

export const FieldEditAndDelete = ({ item, typeName }) => {
  // const { open } = Modal.useModal()
  const { open } = Modal.useModal()

  const client = useClient()

  const { data, loading } = useQuery('db:schema')

  const nestedPath = findPath(
    data.types[typeName].fields,
    item.name || item.meta.name
  )

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

        <Dropdown.Item
          onClick={async () => {
            const deleteThis = await open(({ close }) => (
              <Modal
                title={`Are you sure you want to delete ${
                  item?.name || item.meta.name
                }?`}
                confirmLabel="Delete"
                onConfirm={async () => {
                  console.log('delete this')

                  nestedPath.push(item?.name || item.meta?.name)
                  const keys = nestedPath
                  let fields = keys
                    .reverse()
                    .reduce((res, key) => ({ [key]: res }), { $delete: true })

                  // fields = [result]   { $delete: true}
                  console.log('hallow?', fields)

                  await client.call('db:set-schema', {
                    mutate: true,
                    schema: {
                      types: {
                        [typeName]: {
                          fields: fields,
                        },
                      },
                    },
                  })
                  close('yo')
                }}
              >
                <Modal.Message
                  variant="error"
                  message={`you are about to delete the field: ${
                    item?.name || item.meta.name
                  } `}
                  style={{ marginTop: 20, marginBottom: 20 }}
                />
              </Modal>
            ))
            console.log('deltea', deleteThis)
          }}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
