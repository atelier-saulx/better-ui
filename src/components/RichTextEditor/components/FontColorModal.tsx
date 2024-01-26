import React, { ReactNode, useState } from 'react'
import { Button, Modal, ColorInput } from '../../../index.js'

export function FontColorModal({
  children,
  onSave,
  mode = 'add',
}: {
  children: ReactNode
  mode?: 'add' | 'edit'
  onSave: (value) => void
}) {
  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title>Change font color</Modal.Title>
            <Modal.Body>
              <ColorInput label="select a color" />
            </Modal.Body>
            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  //   onSave({ file, caption })
                  close()
                }}
              >
                Save changes
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}
