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
      <Stack justify="start" gap={16}>
        <Text
          color="secondary"
          variant="body-light"
          style={{ minWidth: 164, width: 164 }}
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
          variant="neutral"
          shape="square"
          // variant="icon-only"
          onClick={() => setOrder(order === 'desc' ? 'asc' : 'desc')}
        >
          {order === 'desc' ? <IconSortDesc /> : <IconSortAsc />}
        </Button>
        <MultiSelectInput
          singleLine
          placeholder="Log types"
          options={options}
          onChange={(v) => setSrvcFilters(Array.from(v))}
          style={{
            minWidth: 186,
            maxWidth: 186,
            width: '100%',
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
            minWidth: 142,
          }}
          variant="small"
        />
      </Stack>

      <Stack justify="end" gap={16}>
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
      </Stack>
    </Stack>
  )
}
