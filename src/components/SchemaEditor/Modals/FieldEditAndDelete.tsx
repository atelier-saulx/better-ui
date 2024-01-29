import * as React from 'react'
import { Modal } from '../../Modal/index.js'
import { Button } from '../../Button/index.js'
import { Dropdown } from '../../Dropdown/index.js'
import { IconMoreHorizontal } from '../../Icons/index.js'
import { Text } from '../../Text/index.js'
import { useClient, useQuery } from '@based/react'
import { findPath } from '../utils/findPath.js'
import { AddField } from './AddField.js'

export const FieldEditAndDelete = ({ item, typeTitle }) => {
  const { open } = Modal.useModal()

  const client = useClient()

  const { data } = useQuery('db:schema')

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
            const fieldMeta = await open(({ close }) => (
              <AddField
                typeTitle={typeTitle}
                fieldType={item?.type}
                // use edit item for edit options
                editItem={item}
                onConfirm={close}
              />
            ))
            console.log(fieldMeta, '?')
          }}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          onClick={async () => {
            const deleteThis = await open(({ close }) => (
              <Modal
                confirmLabel="Delete"
                confirmProps={{ variant: 'error' }}
                onConfirm={async () => {
                  const nestedPath = findPath(
                    data.types[typeTitle].fields,
                    item.title,
                  )

                  nestedPath.push(item?.title)

                  const currentFields = data.types[typeTitle].fields
                  const fields = {}

                  let from = currentFields
                  let dest = fields
                  let i = 0
                  const l = nestedPath.length

                  while (i < l) {
                    const key = nestedPath[i++]

                    dest[key] = { ...from[key] }
                    dest = dest[key]
                    from = from[key]
                  }

                  // @ts-ignore
                  dest.$delete = true

                  await client.call('db:set-schema', {
                    mutate: true,
                    schema: {
                      types: {
                        [typeTitle]: {
                          fields,
                        },
                      },
                    },
                  })
                  close('close it')
                  console.log(deleteThis)
                }}
              >
                <Text variant="title-modal">{`Are you sure you want to delete ${item?.title}?`}</Text>
                <Modal.Message
                  variant="error"
                  message={`you are about to delete the field: ${item?.title} `}
                  style={{ marginTop: 24, marginBottom: 20 }}
                />
              </Modal>
            ))
          }}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Items>
    </Dropdown.Root>
  )
}