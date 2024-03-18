import React from 'react'
import {
  MultiSelectInput,
  SelectInput,
  SearchInput,
  Stack,
  border,
  Text,
} from '../../index.js'

export const LogsHeader = ({
  setSrvcFilters,
  msgFilter,
  setMsgFilter,
  options,
  timeGroup,
  setTimeGroup,
  counter,
  totalCount,
}) => {
  const timeOptions = [
    { value: 1, label: '1 minute' },
    { value: 3, label: '3 minutes' },
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 1200, label: '12 hours' },
    { value: 2400, label: 'per day' },
  ]

  return (
    <Stack
      style={{ marginBottom: 24, borderBottom: border(), paddingBottom: 24 }}
    >
      <Text color="secondary" variant="body-light">
        Showing {counter} out of {totalCount}
      </Text>
      <MultiSelectInput
        placeholder="Log types"
        options={options}
        onChange={(v) => setSrvcFilters(Array.from(v))}
        style={{
          minWidth: 174,
        }}
      />
      <SelectInput
        placeholder="Group by time"
        options={timeOptions}
        onChange={(v) => setTimeGroup(v)}
        style={{
          maxWidth: 142,
        }}
        variant="small"
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
