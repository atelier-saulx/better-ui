import * as React from 'react'
import { Sidebar } from '../Sidebar/index.js'
import { AddType } from './Modals/AddType.js'
import { Stack } from '../Stack/index.js'
import { Text } from '../Text/index.js'

export const SchemaSideBar = ({ types, active, setActive }) => {
  const sidebarData = Object.keys(types)
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
          <AddType setActive={setActive} light />
        </Stack>
      }
      value={active}
      onValueChange={(v) => setActive(v)}
      style={{ maxWidth: 224 }}
      data={sidebarData}
    />
  )
}
