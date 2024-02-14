import React, { ReactNode, useState } from 'react'
import { Button, Modal, TextInput, CheckboxInput } from '../../../index.js'

export function LinkModal({
  children,
  onSave,
}: {
  children: ReactNode
  onSave: (value: string, targetBlank: boolean) => void
}) {
  const [url, setUrl] = useState('')
  const [targetBlank, setTargetBlank] = useState(false)

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title>Set an url</Modal.Title>
            <Modal.Body>
              <TextInput
                autoFocus
                label="Enter an url"
                value={url}
                onChange={(v) => setUrl(v)}
                style={{ marginBottom: 12 }}
              />
              <CheckboxInput
                style={{ marginTop: 16 }}
                label="Open in new window"
                value={targetBlank}
                onChange={(v) => setTargetBlank(v)}
              />
            </Modal.Body>
            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave(url, targetBlank)
                  close()

                  setUrl('')
                  setTargetBlank(false)
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
