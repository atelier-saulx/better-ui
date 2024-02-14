import React, { ReactNode, useState } from 'react'
import { Button, FileInput, TextAreaInput, Modal } from '../../../index.js'

export function AddImageModal({
  children,
  defaultCaption = '',
  onSave,
  mode = 'add',
}: {
  children: ReactNode
  mode?: 'add' | 'edit'
  defaultCaption?: string
  onSave: (value: { file: { src: string }; caption: string }) => void
}) {
  const [file, setFile] = useState<{ src: string } | null>(null)
  const [caption, setCaption] = useState(defaultCaption)

  return (
    <Modal.Root>
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title>
              {mode === 'add' ? 'Add image' : 'Edit image'}
            </Modal.Title>
            <Modal.Body>
              <FileInput
                style={{ marginBottom: 12 }}
                onChange={(file) => {
                  // TODO actually upload file
                  if (file) {
                    const todoUrl = URL.createObjectURL(file)
                    setFile({ src: todoUrl })
                  }
                }}
                label="Image"
              />
              <TextAreaInput
                value={caption}
                onChange={setCaption}
                label="Caption"
              />
            </Modal.Body>
            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onSave({ file, caption })
                  close()
                }}
              >
                {mode === 'add' ? 'Add' : 'Save changes'}
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}
