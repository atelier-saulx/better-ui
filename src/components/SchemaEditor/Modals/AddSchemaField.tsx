import * as React from 'react'
import { Button } from '../../Button/index.js'
import { IconPlus } from '../../Icons/index.js'
import { Modal } from '../../Modal/index.js'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Container } from '../../Container/index.js'
import { Thumbnail } from '../../Thumbnail/index.js'

export const AddSchemaField = () => {
  const { open } = Modal.useModal()

  return (
    <Button
      shape="rectangle"
      size="small"
      onClick={async () => {
        const result = await open(({ close }) => (
          <Modal
            onConfirm={() => {
              close('flap')
            }}
          >
            <Text variant="bodyBold" style={{ marginBottom: 12 }}>
              Add a new field to your schema type
            </Text>
            <TextInput
              placeholder="Search for a field"
              style={{ marginBottom: 12 }}
            />

            <Container
              title="String"
              description="Non-internationalized string"
              prefix={<Thumbnail text="String" color="positive-muted" />}
            />
          </Modal>
        ))
        console.log({ result })
      }}
    >
      <IconPlus />
      Add Field
    </Button>
  )
}
