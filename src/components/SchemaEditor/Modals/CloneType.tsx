import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
import { useClient, useQuery } from '@based/react'

export const CloneType = ({ onConfirm, typeTitle }) => {
  const [name, setName] = React.useState(typeTitle + '-copy')
  const [displayName, setDisplayName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  const { data } = useQuery('db:schema')

  return (
    <Modal
      confirmProps={{ disabled: !name || name?.length < 3 }}
      confirmLabel="Copy"
      onConfirm={async () => {
        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [name]: {
                meta: {
                  displayName: displayName ? displayName : name,
                  description: description,
                },
                fields: data.types[typeTitle].fields,
              },
            },
          },
        })

        onConfirm('close')
      }}
    >
      <Stack gap={12} grid>
        <Text variant="title-modal">Clone {typeTitle}</Text>
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
