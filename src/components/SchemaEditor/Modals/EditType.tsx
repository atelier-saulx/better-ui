import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
import { useClient, useQuery } from '@based/react'

export const EditType = ({ onConfirm, typeName }) => {
  const [displayName, setDisplayName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const client = useClient()

  const { data, loading } = useQuery('db:schema')

  React.useEffect(() => {
    if (!loading) {
      setDisplayName(data.types[typeName].meta?.displayName)
      setDescription(data.types[typeName].meta?.description)
    }
  }, [loading])

  return (
    <Modal
      confirmLabel="Edit"
      onConfirm={async () => {
        const type = typeName
        const typeSchema = {
          meta: {
            name: typeName,
            displayName: displayName,
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

        onConfirm('close')
      }}
    >
      <Stack gap={12} grid>
        <Text variant="title-modal">Edit this {typeName}</Text>
        <TextInput label="Type name" disabled value={typeName} />
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
