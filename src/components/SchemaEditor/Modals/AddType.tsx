import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Button } from '../../Button/index.js'
import { Modal } from '../../Modal/index.js'
import { IconPlus } from '../../Icons/index.js'
import { useClient } from '@based/react'

export const AddType = ({ setActive }) => {
  const [typeName, setTypeName] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button
          variant="neutral"
          style={{ marginBottom: '32px', padding: '6px 12px' }}
        >
          <IconPlus style={{ marginRight: 8 }} /> Add Type
        </Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Body>
              <Stack gap={12} grid>
                <div>
                  <Text variant="title-modal">Create a new type</Text>
                  <Text color="secondary">
                    Add your own custom type to the schema.
                  </Text>
                </div>
                <TextInput
                  label="Type name"
                  onChange={(v) => {
                    setTypeName(v)
                  }}
                  value={typeName}
                />
                <TextInput
                  label="Display name (plural)"
                  onChange={(v) => setDisplayName(v)}
                  value={displayName}
                />
                <TextAreaInput
                  label="Description"
                  onChange={(v) => setDescription(v)}
                  value={description}
                />
              </Stack>
            </Modal.Body>

            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  const type = typeName
                  const typeSchema = {
                    meta: {
                      name: typeName,
                      displayName: displayName || typeName,
                      description: description,
                    },
                  }

                  await client.call('db:set-schema', {
                    mutate: true,
                    schema: {
                      types: {
                        [type]: typeSchema,
                      },
                    },
                  })

                  setActive(typeName)
                  close()
                }}
              >
                Create
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}
