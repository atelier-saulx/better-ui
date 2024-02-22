import React, { ReactNode, useState } from 'react'
import { Button, Modal, Code } from '../../../index.js'

export function AddEmbedModal({
  children,
  onSave,
}: {
  children: ReactNode
  onSave: (value) => void
}) {
  const [html, setHtml] = useState('')

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title>Embed your code</Modal.Title>
            <Modal.Body>
              <Code
                value={html}
                onChange={(v) => setHtml(v)}
                style={{ marginBottom: 12 }}
                autoFocus
                language="html"
              />
            </Modal.Body>
            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave(html)
                  close()

                  setHtml('')
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
