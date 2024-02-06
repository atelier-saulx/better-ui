import * as React from 'react'
import { Modal } from '../../Modal/index.js'
import { Button } from '../../Button/index.js'
import { Dropdown } from '../../Dropdown/index.js'
import { IconMoreHorizontal } from '../../Icons/index.js'
import { Text } from '../../Text/index.js'
import { findPath } from '../findpath.js'
import { AddField } from './AddField.js'

export const FieldEditAndDelete = ({
  item,
  itemName,
  typeTitle,
  schema,
  setSchema,
  setSomethingChanged,
}) => {
  const { open } = Modal.useModal()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button variant="neutral-transparent" shape="square" size="small">
          <IconMoreHorizontal />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Items>
        <Dropdown.Item
          onClick={async () => {
            console.log('clicked item', itemName)

            const filteredPath = itemName.split('.').filter((field) => {
              let isField = true
              if (isField) {
                isField = false
                return true
              }
              if (field === 'properties') {
                isField = true
              }
              return false
            })

            const fieldMeta = await open(({ close }) => (
              <AddField
                typeTitle={typeTitle}
                fieldType={item?.type}
                // use edit item for edit options
                editItem={item}
                itemName={itemName}
                path={filteredPath}
                onConfirm={close}
                schema={schema}
                setSchema={setSchema}
                setSomethingChanged={setSomethingChanged}
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
                    schema.types[typeTitle].fields,
                    itemName,
                  )

                  nestedPath.push(itemName)

                  let nestedPathArr = nestedPath[0].split('.')

                  const currentFields = schema.types[typeTitle].fields
                  const fields = {}

                  let from = currentFields
                  let dest = fields
                  let i = 0
                  const l = nestedPathArr.length

                  while (i < l) {
                    const key = nestedPathArr[i++]
                    dest[key] = { ...from[key] }

                    dest = dest[key]
                    // add delete for the nested fields
                    if (
                      dest.hasOwnProperty('properties') &&
                      itemName === nestedPathArr[nestedPathArr.length - 1]
                    ) {
                      for (const x in dest['properties']) {
                        dest['properties'][x].$delete = true
                      }
                    }

                    from = from[key]
                  }

                  // @ts-ignore
                  dest.$delete = true

                  // update schema 🐠
                  schema.types[typeTitle].fields = {
                    ...schema.types[typeTitle].fields,
                    ...fields,
                  }

                  setSomethingChanged(true)

                  setSchema({ ...schema })

                  close('close it')
                }}
              >
                <Text variant="title-modal">{`Are you sure you want to delete ${itemName}?`}</Text>
                <Modal.Message
                  variant="error"
                  message={`you are about to delete the field: ${itemName} `}
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
