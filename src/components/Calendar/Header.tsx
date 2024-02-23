import React from 'react'
import {
  Stack,
  Button,
  IconChevronLeft,
  Text,
  IconChevronTop,
  IconChevronDown,
  IconChevronRight,
  Switch,
} from '../../index.js'
import { addMonths, format, addYears, addWeeks } from 'date-fns'
import { styled } from 'inlines'

export const Header = ({
  setDisplayMonth,
  displayMonth,
  view,
  setView,
  startRange,
  endRange,
}) => {
  return (
    <Stack style={{ marginBottom: 16 }} justify="between">
      <Stack>
        <Text singleLine variant="title-modal">
          {view === 'month'
            ? format(displayMonth, 'yyyy MMMM')
            : format(displayMonth, 'yyyy') +
              ' Week ' +
              (format(displayMonth, 'w', { weekStartsOn: 0 }) === '1'
                ? 52
                : Number(format(displayMonth, 'w', { weekStartsOn: 0 })) - 1)}
        </Text>
      </Stack>
      {/* <Stack>
        <Switch
          data={['Month', 'Week']}
          activeTab={view.slice(0, 1).toUpperCase() + view.slice(1)}
          onChange={(v) => setView(v.toLowerCase())}
        />
      </Stack> */}

      <Stack justify="end" gap={0}>
        <Button
          disabled={
            startRange &&
            startRange > Number(format(addMonths(displayMonth, -1), 'T')) &&
            startRange > Number(format(addYears(displayMonth, -1), 'T'))
          }
          size="small"
          variant="neutral"
          shape="square"
          onClick={() => {
            if (view === 'week') {
              setDisplayMonth(addWeeks(displayMonth, -1))
            } else {
              setDisplayMonth(addMonths(displayMonth, -1))
            }
          }}
        >
          <IconChevronLeft />
        </Button>
        <Button
          variant="neutral"
          size="small"
          onClick={() => {
            setDisplayMonth(addWeeks(new Date(), 1))
            console.log('What week number', format(new Date(), 'w'))
          }}
        >
          Today
        </Button>
        <Button
          disabled={
            endRange &&
            endRange < Number(format(addMonths(displayMonth, 0), 'T')) &&
            endRange < Number(format(addYears(displayMonth, 0), 'T'))
          }
          size="small"
          variant="neutral"
          shape="square"
          onClick={() => {
            if (view === 'week') {
              setDisplayMonth(addWeeks(displayMonth, 1))
            } else {
              setDisplayMonth(addMonths(displayMonth, 1))
            }
          }}
        >
          <IconChevronRight />
        </Button>
      </Stack>
    </Stack>
  )
}
