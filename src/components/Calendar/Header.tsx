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
  console.log('START_RANge', startRange)
  console.log('week -1??', Number(format(addWeeks(displayMonth, -1), 'T')))

  return (
    <styled.div>
      <Stack style={{ marginBottom: 12 }}>
        <Switch
          data={['month', 'week']}
          activeTab={view}
          onChange={(v) => setView(v)}
        />
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
      </Stack>
      <Stack style={{ marginBottom: 16 }} justify="between">
        {view === 'week' && (
          <Stack justify="start" gap={0}>
            <Button
              disabled={
                startRange &&
                startRange > Number(format(addWeeks(displayMonth, -1), 'T'))
              }
              size="small"
              variant="neutral-transparent"
              shape="square"
              onClick={() => {
                setDisplayMonth(addWeeks(displayMonth, -1))
              }}
            >
              <IconChevronLeft />
            </Button>
            <Button
              disabled={
                endRange &&
                endRange < Number(format(addWeeks(displayMonth, 1), 'T'))
              }
              size="small"
              variant="neutral-transparent"
              shape="square"
              onClick={() => {
                setDisplayMonth(addWeeks(displayMonth, 1))
              }}
            >
              <IconChevronRight />
            </Button>
            <Text style={{ marginLeft: 10 }} variant="title-modal">
              Week {format(displayMonth, 'w')}
            </Text>
          </Stack>
        )}

        {/* // monthts */}
        <Stack justify={view === 'week' ? 'center' : 'start'} gap={0}>
          <Button
            disabled={
              startRange &&
              startRange > Number(format(addMonths(displayMonth, -1), 'T')) &&
              startRange > Number(format(addYears(displayMonth, -1), 'T'))
            }
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addMonths(displayMonth, -1))
            }}
          >
            {view === 'week' ? <IconChevronTop /> : <IconChevronLeft />}
          </Button>
          <Button
            disabled={
              endRange &&
              endRange < Number(format(addMonths(displayMonth, 0), 'T')) &&
              endRange < Number(format(addYears(displayMonth, 0), 'T'))
            }
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addMonths(displayMonth, 1))
            }}
          >
            {view === 'week' ? <IconChevronDown /> : <IconChevronRight />}
          </Button>
          <Text style={{ marginLeft: 10 }} variant="title-modal">
            {format(displayMonth, 'MMMM')}
          </Text>
        </Stack>

        {/* // Years */}
        <Stack justify="end" gap={0}>
          <Text variant="title-modal" style={{ marginRight: 10 }}>
            {format(displayMonth, 'yyyy')}
          </Text>
          <Button
            disabled={
              startRange &&
              startRange > Number(format(addYears(displayMonth, -1), 'T'))
            }
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addYears(displayMonth, -1))
            }}
          >
            <IconChevronTop />
          </Button>
          <Button
            disabled={
              endRange &&
              endRange < Number(format(addYears(displayMonth, 1), 'T'))
            }
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addYears(displayMonth, 1))
            }}
          >
            <IconChevronDown />
          </Button>
        </Stack>
      </Stack>
    </styled.div>
  )
}
