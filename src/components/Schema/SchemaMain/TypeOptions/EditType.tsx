import * as React from 'react'
import {
  Text,
  TextInput,
  TextAreaInput,
  Stack,
  Modal,
} from '../../../../index.js'

import { useClient, useQuery } from '@based/react'

export const EditType = ({ onConfirm, typeTitle }) => {
  const [description, setDescription] = React.useState('')

  const client = useClient()

  const { data, loading } = useQuery('db:schema')

  React.useEffect(() => {
    if (!loading) {
      setDescription(data.types[typeTitle].description)
    }
  }, [loading])

  return (
    <Modal
      confirmLabel="Edit"
      onConfirm={async () => {
        console.log(description)

        await client.call('db:set-schema', {
          mutate: true,
          schema: {
            types: {
              [typeTitle]: {
                description: description,
                // meta ?? TODO yves // description dissappears if you set something??
                meta: {
                  description: description,
                },
              },
            },
          },
        })

        onConfirm('close')
      }}
    >
      <Stack gap={12} grid>
        <Text variant="title-modal">Edit this {typeTitle}</Text>
        <TextInput label="Type name" disabled value={typeTitle} />
        <TextAreaInput
          label="Description"
          onChange={(v) => setDescription(v)}
          value={description}
        />
      </Stack>
    </Modal>
  )
}
