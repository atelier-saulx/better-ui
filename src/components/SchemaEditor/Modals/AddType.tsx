import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Button } from '../../Button/index.js'
import { Modal } from '../../Modal/index.js'
import { IconPlus } from '../../Icons/index.js'
import { useClient } from '@based/react'

type AddTypeProps = {
  setActive: (x: string) => void
  light?: boolean
}

export const AddType = ({ setActive, light }: AddTypeProps) => {
  const [typeTitle, setTypeTitle] = React.useState('')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button
          variant={light ? 'primary-transparent' : 'primary'}
          size={light ? 'small' : 'medium'}
        >
          <IconPlus style={{ marginRight: 5 }} /> Add Type
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
                    setTypeTitle(v)
                  }}
                  value={typeTitle}
                />

                <TextAreaInput
                  label="Description"
                  onChange={(v) => setDescription(v)}
                  value={description}
                />
              </Stack>
            </Modal.Body>

            <Modal.Actions>
              <Button
                variant="neutral"
                onClick={() => {
                  setTypeTitle('')
                  setDescription('')
                  close()
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={typeTitle.length < 3}
                onClick={async () => {
                  const typeSchema = {
                    title: typeTitle,
                    description: description,
                  }

                  await client.call('db:set-schema', {
                    mutate: true,
                    schema: {
                      types: {
                        [typeTitle]: {
                          ...typeSchema,
                        },
                      },
                    },
                  })

                  setActive(typeTitle)
                  setTypeTitle(typeTitle)
                  setDescription('')
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
