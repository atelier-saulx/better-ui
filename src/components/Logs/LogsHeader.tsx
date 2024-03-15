import React from 'react'
import { MultiSelectInput, SearchInput, Stack } from '../../index.js'

export const LogsHeader = ({
  srvcFilters,
  setSrvcFilters,
  msgFilter,
  setMsgFilter,
}) => {
  return (
    <Stack style={{ marginBottom: 24 }}>
      <MultiSelectInput placeholder="Log types" options={[]} />
      <SearchInput
        placeholder="Search logs"
        value={msgFilter}
        onChange={(v) => {
          setMsgFilter(v)
        }}
      />
    </Stack>
  )
}
