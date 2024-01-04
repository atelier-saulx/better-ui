import * as React from 'react'
// import { Style, styled } from 'inlines'
import { Button, IconPlus, Text, Modal } from '../../index.js'

export type SchemaEditorProps = {}

export const SchemaEditor = ({}: SchemaEditorProps) => {
  const { open } = Modal.useModal()

  return (
    <Modal.Provider>
      <div style={{ width: 676, height: 676 }}>
        <Text variant="bodyBold" as="h3">
          Schema
        </Text>
        <Button
          onClick={async () => {
            const result = await open(({ close }) => (
              <Modal
                onConfirm={() => {
                  close('yay')
                }}
              >
                xxx
              </Modal>
            ))

            console.log({ result })
          }}
          variant="neutral"
        >
          <IconPlus />
          Add a new type
        </Button>
      </div>
    </Modal.Provider>
  )
}
