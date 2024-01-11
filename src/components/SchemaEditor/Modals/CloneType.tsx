import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
import { useClient, useQuery } from '@based/react'

export const CloneType = ({ onConfirm, typeName }) => {
  const [name, setName] = React.useState(typeName + '-copy')
  const [displayName, setDisplayName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  const { data } = useQuery('db:schema')

  return (
    <Modal
      confirmLabel="Copy"
      onConfirm={async () => {
        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [name]: {
                meta: {
                  displayName: displayName,
                  description: description,
                },
                fields: data.types[typeName].fields,
              },
            },
          },
        })

        onConfirm('close')
      }}
    >
      <Stack gap={12} grid>
        <Text variant="title-modal">Clone {typeName}</Text>
        <TextInput
          label="Type name"
          onChange={(v) => setName(v)}
          value={name}
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
    </Modal>
  )
}
