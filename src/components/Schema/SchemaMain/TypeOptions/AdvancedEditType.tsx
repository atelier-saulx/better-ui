import * as React from 'react'
import { Text, Code, Stack, Modal, Button } from '../../../../index.js'
import { useClient, useQuery } from '@based/react'

export const AdvancedEditType = ({ onConfirm, typeTitle }) => {
  const [schemaCode, setSchemaCode] = React.useState('')

  const client = useClient()

  const { data, loading } = useQuery('db:schema')

  React.useEffect(() => {
    if (!loading) {
      setSchemaCode(JSON.stringify(data?.types[typeTitle]?.fields, null, 2))
    }
  }, [loading])

  return (
    <Modal
      noActions
      style={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: '100%',
        maxWidth: 767,
      }}
    >
      <Stack gap={12} grid>
        <Text variant="title-modal">Edit {typeTitle} through code.</Text>
        <Code
          language="json"
          onChange={(v) => setSchemaCode(v)}
          value={schemaCode}
        />
      </Stack>

      <Modal.Actions>
        <Button variant="neutral" onClick={() => onConfirm('close')}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await client.call('db:set-schema', {
              mutate: true,
              schema: {
                types: {
                  [typeTitle]: {
                    fields: JSON.parse(schemaCode),
                  },
                },
              },
            })

            onConfirm('close')
          }}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
