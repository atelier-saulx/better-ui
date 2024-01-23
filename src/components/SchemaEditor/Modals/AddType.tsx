import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Button } from '../../Button/index.js'
import { Modal } from '../../Modal/index.js'
import { IconPlus } from '../../Icons/index.js'
import { useClient } from '@based/react'
import { styled } from 'inlines'
import { border, color } from '../../../utils/colors.js'

export const AddType = ({ setActive }) => {
  const [typeName, setTypeName] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  return (
    <Modal.Root>
      <Modal.Trigger>
        <styled.p
          style={{
            defaultColor: 'primary',
            defaultTag: 'p',
            fontWeight: 600,
            letterSpacing: '-0.14px',
            lineHeight: `24px`,
            fontSize: '14px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            alignItems: 'center',
            border: border(),
            padding: '8px 8px',
            borderRadius: 8,
            maxWidth: 124,
            marginBottom: '16px',
            marginBlockStart: '0em',
            '&:hover': {
              background: color('background', 'neutral'),
              border: border('hover'),
            },
          }}
        >
          <IconPlus style={{ marginRight: 10, marginBottom: '-5px' }} /> Add
          Type
        </styled.p>
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
              <Button
                variant="neutral"
                onClick={() => {
                  setTypeName('')
                  setDisplayName('')
                  setDescription('')
                  close()
                }}
              >
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
                  setTypeName('')
                  setDisplayName('')
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
