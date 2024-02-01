import * as React from 'react'
import {
  Text,
  TextAreaInput,
  TextInput,
  Stack,
  Modal,
} from '../../../../index.js'

import { useClient, useQuery } from '@based/react'

export const CloneType = ({ onConfirm, typeTitle }) => {
  const [title, setTitle] = React.useState(typeTitle + '-copy')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  const { data } = useQuery('db:schema')

  return (
    <Modal
      confirmProps={{ disabled: !title || title?.length < 3 }}
      confirmLabel="Copy"
      onConfirm={async () => {
        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [title]: {
                description: description,

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
          onChange={(v) => setTitle(v)}
          value={title}
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
