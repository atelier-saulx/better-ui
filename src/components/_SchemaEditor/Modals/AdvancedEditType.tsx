import * as React from 'react'
import { Text } from '../../Text/index.js'
import { Code } from '../../Code/index.js'
import { Stack } from '../../Stack/index.js'
import { Modal } from '../../Modal/index.js'
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
      confirmLabel="Confirm"
      style={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: '100%',
        maxWidth: 767,
      }}
      onConfirm={async () => {
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
      <Stack gap={12} grid>
        <Text variant="title-modal">Edit {typeTitle} through code.</Text>
        <Code
          language="json"
          onChange={(v) => setSchemaCode(v)}
          value={schemaCode}
        />
      </Stack>
    </Modal>
  )
}
