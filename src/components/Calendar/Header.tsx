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

export const Header = ({ setDisplayMonth, displayMonth, view, setView }) => {
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
          onClick={() => setDisplayMonth(new Date())}
        >
          Today
        </Button>
      </Stack>
      <Stack style={{ marginBottom: 16 }} justify="between">
        {view === 'week' && (
          <Stack justify="start" gap={0}>
            <Button
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

        <Stack justify={view === 'week' ? 'center' : 'start'} gap={0}>
          <Button
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

        <Stack justify="end" gap={0}>
          <Text variant="title-modal" style={{ marginRight: 10 }}>
            {format(displayMonth, 'yyyy')}
          </Text>
          <Button
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
