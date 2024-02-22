import React, { ReactNode, useEffect, useState } from 'react'
import {
  Button,
  FileInput,
  TextAreaInput,
  Modal,
  useUploadFile,
} from '../../../index.js'

export function AddImageModal({
  children,
  defaultCaption = '',
  onSave,
  mode = 'add',
  onOpenChange,
}: {
  children?: ReactNode
  mode?: 'add' | 'edit'
  defaultCaption?: string
  onSave: (value: { file: { src: string }; caption: string }) => void
  onOpenChange?: (open: boolean) => void
}) {
  const [file, setFile] = useState<{ src: string } | null>(null)
  const [caption, setCaption] = useState(defaultCaption)
  const { handleFileInputChange, status, progress } = useUploadFile()

  return (
    <Modal.Root open={!children} onOpenChange={onOpenChange}>
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
                status={status}
                progress={progress}
                onChange={handleFileInputChange((file) => {
                  setFile({ src: file.src })
                })}
                label="Image"
                mimeType="image/*"
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
