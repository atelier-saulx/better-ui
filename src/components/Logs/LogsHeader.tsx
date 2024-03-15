import React from 'react'
import { MultiSelectInput, SearchInput, Stack } from '../../index.js'

export const LogsHeader = ({
  setSrvcFilters,
  msgFilter,
  setMsgFilter,
  options,
}) => {
  return (
    <Stack style={{ marginBottom: 24 }}>
      <MultiSelectInput
        placeholder="Log types"
        options={options}
        onChange={(v) => setSrvcFilters(Array.from(v))}
        style={{
          minWidth: 174,
        }}
      />
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
