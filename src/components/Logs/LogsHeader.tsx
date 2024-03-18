import React from 'react'
import {
  MultiSelectInput,
  SelectInput,
  SearchInput,
  Stack,
  border,
  Text,
  Switch,
  IconViewSchedule,
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
    { value: 720, label: '12 hours' },
    { value: 1440, label: 'per day' },
  ]

  return (
    <Stack
      justify="start"
      gap={24}
      style={{ marginBottom: 24, borderBottom: border(), paddingBottom: 16 }}
    >
      <Text color="secondary" variant="body-light">
        Showing {counter} out of {totalCount}
      </Text>
      <Switch
        data={[<div>fa</div>, <IconViewSchedule />]}
        onChange={(v) => console.log(v)}
      />
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
        style={{ marginLeft: 'auto' }}
        placeholder="Search logs"
        value={msgFilter}
        onChange={(v) => {
          setMsgFilter(v)
        }}
      />
    </Stack>
  )
}
