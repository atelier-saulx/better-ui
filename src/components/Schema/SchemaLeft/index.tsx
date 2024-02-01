import React from 'react'
import { Sidebar, Stack, Text } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'

export const SchemaLeft = ({ schema }) => {
  const [type, setType] = useContextState('type')

  const sidebarData = Object.keys(schema.types)
    .sort((a, b) => a.localeCompare(b))
    .map((item, idx) => ({
      key: idx,
      label: item,
      value: item,
    }))

  return (
    <Sidebar
      header={
        <Stack>
          <Text variant="caption">Types</Text>
          {/* <AddType setActive={setActive} light /> */}
        </Stack>
      }
      size="small"
      value={type}
      onValueChange={(v) => setType(v)}
      style={{ maxWidth: 224 }}
      data={sidebarData}
    />
  )
}
