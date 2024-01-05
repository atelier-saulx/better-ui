import * as React from 'react'
import { Text } from '../../Text/index.js'
import { Modal } from '../../Modal/index.js'
import { Button } from '../../Button/index.js'

export const DeleteFieldModal = ({ item, close }) => {
  return (
    <>
      {/* <Modal.Message ///todo here /> */}
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
    </>
  )
}
