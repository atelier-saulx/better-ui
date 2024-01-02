import * as React from 'react'

import {
  addMonths,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  compareAsc,
  endOfWeek,
  format,
  isSameMonth,
} from 'date-fns'
import {
  Button,
  IconChevronDown,
  IconChevronTop,
  border,
  borderRadius,
  textVariants,
} from '../../index.js'

export type CalendarProps = {}

export function Calendar(_: CalendarProps) {
  const [displayMonth, setDisplayMonth] = React.useState(new Date())

  const getDays = React.useCallback(() => {
    const days = []
    let curr = startOfWeek(startOfMonth(displayMonth), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(displayMonth), { weekStartsOn: 1 })

    while (compareAsc(curr, end) < 1) {
      days.push(curr)
      curr = addDays(curr, 1)
    }

    return days
  }, [displayMonth])

  return (
    <div
      style={{
        border: border(),
        borderRadius: borderRadius('medium'),
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 24,
          ...textVariants.bodyBold,
          fontSize: 16,
        }}
      >
        <div>{format(displayMonth, 'MMMM yyyy')}</div>
        <div>
          <Button
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addMonths(displayMonth, -1))
            }}
          >
            <IconChevronDown />
          </Button>
          <Button
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addMonths(displayMonth, 1))
            }}
          >
            <IconChevronTop />
          </Button>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '24px',
        }}
      >
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
          <div
            key={index}
            style={{
              height: 24,
              width: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...textVariants.bodyBold,
              fontSize: 16,
            }}
          >
            {day}
          </div>
        ))}
        {getDays().map((day) => (
          <div
            key={day.toISOString()}
            style={{
              height: 24,
              width: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...textVariants.body,
              fontSize: 16,
            }}
          >
            {isSameMonth(day, displayMonth) && format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
