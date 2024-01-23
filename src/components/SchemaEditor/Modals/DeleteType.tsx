import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
import { useClient } from '@based/react'

export const DeleteType = ({ onConfirm, typeName, setActive }) => {
  const [testString, setTestString] = React.useState('')

  const client = useClient()

  return (
    <Modal
      confirmLabel="Delete"
      confirmProps={{ disabled: testString !== typeName, variant: 'error' }}
      onConfirm={async () => {
        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [typeName]: {
                $delete: true,
              },
            },
          },
        })

        onConfirm('close')
        setActive('')
      }}
    >
      <Stack gap={12} grid>
        <Text variant="title-modal">Delete {typeName}</Text>
        <Modal.Message
          variant="error"
          message={`You are about to delete ${typeName}`}
        />
        <TextInput
          label={`Type ${typeName} in the field to confirm`}
          value={testString}
          onChange={(v) => setTestString(v)}
        />
      </Stack>
    </Modal>
  )
}
