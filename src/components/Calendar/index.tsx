import * as React from 'react'
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  compareAsc,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns'
import { border, borderRadius } from '../../index.js'
import { styled } from 'inlines'
import { Header } from './Header.js'
import { SubHeader } from './SubHeader.js'
import { Cell } from './Cell.js'

export type CalendarProps = {
  data?: {}[]
  timestampField?: string
  labelField?: string
  view?: 'month' | 'week' | 'day'
}

export const Calendar = ({
  data,
  timestampField = 'createdAt',
  labelField = 'title',
  view: viewProp = 'month',
}: CalendarProps) => {
  const [displayMonth, setDisplayMonth] = React.useState(new Date())
  const [view, setView] = React.useState(viewProp)

  const getDays = React.useCallback(() => {
    const days = []

    if (view === 'month') {
      let curr = startOfWeek(startOfMonth(displayMonth), { weekStartsOn: 1 })
      const end = endOfWeek(endOfMonth(displayMonth), { weekStartsOn: 1 })

      while (compareAsc(curr, end) < 1) {
        days.push(curr)
        curr = addDays(curr, 1)
      }
    } else if (view === 'week') {
      let curr = startOfWeek(startOfWeek(displayMonth), { weekStartsOn: 0 })
      const end = endOfWeek(endOfWeek(displayMonth), { weekStartsOn: 0 })

      while (compareAsc(curr, end) < 1) {
        days.push(curr)
        curr = addDays(curr, 1)
      }
    }

    return days
  }, [displayMonth])

  console.log(displayMonth, 'display month')

  // filter the monthly data
  let monthData = data?.filter((item) =>
    isSameMonth(displayMonth, item[timestampField]),
  )

  return (
    <styled.div
      style={{
        border: border(),
        borderRadius: borderRadius('medium'),
        padding: 24,
        width: '100%',
      }}
    >
      <Header
        displayMonth={displayMonth}
        setDisplayMonth={setDisplayMonth}
        view={view}
        setView={setView}
      />

      <styled.div
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0px',
          border: border(),
          borderRight: 'none',
          borderRadius: 8,
        }}
      >
        <SubHeader view={view} dayDates={getDays().map((day) => day)} />

        {getDays().map((day, idx) => {
          const dayDates = monthData.filter((item) =>
            isSameDay(day, item[timestampField]),
          )

          return (
            <Cell
              view={view}
              key={idx}
              day={day}
              idx={idx}
              displayMonth={displayMonth}
              dayDates={dayDates}
              labelField={labelField}
            />
          )
        })}
      </styled.div>
    </styled.div>
  )
}
