import React, { useState } from 'react'
import {
  MultiSelectInput,
  SelectInput,
  SearchInput,
  Stack,
  border,
  Text,
  Switch,
  IconIcListBulleted,
  IconIcTextAlignJustify,
  Button,
  IconDelete,
  IconSortAsc,
  IconSortDesc,
  IconMoreHorizontal,
  Dropdown,
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
  order,
  setOrder,
  onClear,
}) => {
  const [selectedTime, setSelectedTime] = useState(null)

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
      gap={16}
      style={{ marginBottom: 24, borderBottom: border(), paddingBottom: 16 }}
    >
      <Text
        color="secondary"
        variant="body-light"
        style={{ width: 164 }}
        singleLine
      >
        Showing {counter} out of {totalCount}
      </Text>
      <Switch
        data={[<IconIcTextAlignJustify />, <IconIcListBulleted />]}
        onChange={(v) => {
          if (v === 0) {
            setTimeGroup(null)
          } else if (v === 1) {
            setTimeGroup(selectedTime || 1)
          }
        }}
        selected={timeGroup ? 1 : 0}
      />
      <Button
        variant="icon-only"
        onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
      >
        {order === 'desc' ? <IconSortDesc /> : <IconSortAsc />}
      </Button>
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
        value={timeGroup}
        options={timeOptions}
        onChange={(v) => {
          setTimeGroup(v)
          setSelectedTime(v)
        }}
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
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Button shape="square" variant="icon-only">
            <IconMoreHorizontal />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Items>
          <Dropdown.Item onClick={onClear} icon={<IconDelete />}>
            Clear logs
          </Dropdown.Item>
        </Dropdown.Items>
      </Dropdown.Root>

      {/* <Button variant="icon-only">
        <IconDelete />
      </Button> */}
    </Stack>
  )
}
