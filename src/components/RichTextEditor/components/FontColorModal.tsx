import React, { ReactNode, useState } from 'react'
import { Button, Modal, ColorInput } from '../../../index.js'

export function FontColorModal({
  mode,
  children,
  onSave,
}: {
  mode?: 'background' | 'font'
  children: ReactNode
  onSave: (value) => void
}) {
  const [color, setColor] = useState('')

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title>
              {mode === 'font'
                ? 'Change the font color'
                : 'Change the background color'}
            </Modal.Title>
            <Modal.Body>
              <ColorInput
                label="select a color"
                value={color}
                onChange={(v) => setColor(v)}
                style={{ marginBottom: 12 }}
              />
              <Button
                variant="neutral"
                onClick={() => {
                  if (mode === 'font') {
                    setColor('#1b242c')
                  } else {
                    setColor('#fff')
                  }
                }}
              >
                Set to default color
              </Button>
            </Modal.Body>
            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave(color)
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
