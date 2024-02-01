import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
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
