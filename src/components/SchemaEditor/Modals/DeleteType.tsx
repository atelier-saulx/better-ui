import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
import { useClient } from '@based/react'

export const DeleteType = ({ onConfirm, typeTitle, setActive }) => {
  const [testString, setTestString] = React.useState('')

  const client = useClient()

  return (
    <Modal
      confirmLabel="Delete"
      confirmProps={{ disabled: testString !== typeTitle, variant: 'error' }}
      onConfirm={async () => {
        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [typeTitle]: {
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
        <Text variant="title-modal">Delete {typeTitle}</Text>
        <Modal.Message
          variant="error"
          message={`You are about to delete ${typeTitle}`}
        />
        <TextInput
          label={`Type ${typeTitle} in the field to confirm`}
          value={testString}
          onChange={(v) => setTestString(v)}
        />
      </Stack>
    </Modal>
  )
}
