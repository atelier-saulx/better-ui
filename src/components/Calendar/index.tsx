import * as React from 'react'
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addMonths,
  compareAsc,
  endOfWeek,
  isSameMonth,
  isSameWeek,
  isSameDay,
  format,
  endOfDay,
  addWeeks,
  eachDayOfInterval,
  areIntervalsOverlapping,
  startOfDay,
} from 'date-fns'
import { ScrollArea, border, borderRadius, color } from '../../index.js'
import { styled } from 'inlines'
import { Header } from './Header.js'
import { SubHeader } from './SubHeader.js'
import { MonthCell } from './MonthCell.js'
import { WeekDayColumn } from './WeekDayColumn.js'

export type CalendarProps = {
  data?: {}[]
  timeStartField?: string
  timeEndField?: string
  labelField?: string
  view?: 'month' | 'week' | 'day'
  onClick?: (item: any) => void
  startRange?: number
  endRange?: number
}

export const Calendar = ({
  data,
  timeStartField = 'createdAt',
  timeEndField,
  labelField = 'title',
  view: viewProp = 'month',
  onClick,
  startRange,
  endRange,
}: CalendarProps) => {
  // display month is the date // could be better named in hindsight // for that start week offset
  const [displayMonth, setDisplayMonth] = React.useState(
    addWeeks(new Date(), 1),
  )
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
      let curr = startOfWeek(startOfWeek(displayMonth), { weekStartsOn: 1 })
      const end = endOfWeek(endOfWeek(displayMonth), { weekStartsOn: 1 })

      while (compareAsc(curr, end) < 1) {
        days.push(curr)
        curr = addDays(curr, 1)
      }
    }

    return days
  }, [displayMonth, view])

  let currentTimeHours = Number(format(new Date(), 'H'))
  let currentTimeMinutes = Number(format(new Date(), 'm'))

  if (timeEndField && view === 'week') {
    for (let i = 0; i < data.length; i++) {
      if (!data[i][timeStartField] || !data[i][timeEndField]) continue

      let numberOfDays = eachDayOfInterval({
        start: new Date(data[i][timeStartField]),
        end: new Date(data[i][timeEndField]),
      })

      if (numberOfDays) {
        for (let j = 0; j < numberOfDays?.length; j++) {
          if (j !== 0 && j !== numberOfDays.length - 1) {
            data.push({
              ...data[i],
              [timeStartField]: Number(format(numberOfDays[j], 'T')),
              [timeEndField]: Number(format(endOfDay(numberOfDays[j]), 'T')),
            })
          } else if (j !== 0) {
            data.push({
              ...data[i],
              [timeStartField]: Number(format(numberOfDays[j], 'T')),
            })
          }
        }
      }
    }
  }

  data = [...removeDuplicates(data)]

  function removeDuplicates(data) {
    return data.filter(
      (obj, index) =>
        data.findIndex(
          (item) =>
            item[timeStartField] === obj[timeStartField] &&
            item[labelField] === obj[labelField],
        ) === index,
    )
  }

  // get weekdata
  let weekData = data?.filter(
    (item) =>
      isSameWeek(addWeeks(displayMonth, -1), item[timeStartField]) ||
      isSameWeek(addWeeks(displayMonth, -1), item[timeEndField]) ||
      isSameWeek(
        addDays(addWeeks(displayMonth, -1), 7),
        item[timeStartField],
      ) ||
      isSameWeek(addDays(addWeeks(displayMonth, -1), 7), item[timeEndField]),
  )

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header
        displayMonth={displayMonth}
        setDisplayMonth={setDisplayMonth}
        view={view}
        setView={setView}
        startRange={startRange}
        endRange={endRange}
      />
      <SubHeader view={view} dayDates={getDays().map((day) => day)} />

      <styled.div
        style={{
          display: 'grid',
          overflow: 'auto',
          height: '100%',
          width: '100%',
          gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
          gridAutoRows: '1fr',
          gap: '0px',
          borderLeft: border(),
          borderRight: 'none',
          borderTopLeftRadius: 0,
          borderBottom: view === 'month' ? border() : 'none',
        }}
      >
        {view === 'month' &&
          getDays().map((day, idx) => {
            const dayDates = data.filter((item) => {
              if (!item[timeStartField] || !item[timeEndField]) return false

              return areIntervalsOverlapping(
                { start: startOfDay(day), end: endOfDay(day) },
                {
                  start: new Date(item[timeStartField]),
                  end: new Date(item[timeEndField]),
                },
              )
            })
            return (
              <MonthCell
                view={view}
                key={idx}
                day={day}
                idx={idx}
                displayMonth={displayMonth}
                dayDates={dayDates}
                labelField={labelField}
                onClick={onClick}
              />
            )
          })}

        {/* {view === 'week' &&
          getDays().map((day, idx) => {
            const dayDates = data

            return idx < 7 ? (
              <WeekDayColumn
                key={idx}
                day={day}
                onClick={onClick}
                dayDates={dayDates}
                labelField={labelField}
                timeStartField={timeStartField}
                timeEndField={timeEndField}
              />
            ) : null
          })} */}

        {/* // Red timeline */}
        {view === 'week' && (
          <styled.div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: `${currentTimeHours * 60 + 48 + currentTimeMinutes}px`,
              height: 1,
              backgroundColor: color('border', 'error'),
            }}
          >
            <styled.div
              style={{
                backgroundColor: color('border', 'error'),
                width: 32,
                marginLeft: 'auto',
                marginTop: '-9px',
                height: 18,
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}
            >
              <styled.div
                style={{
                  fontSize: '10px',
                  color: '#fff',
                  fontWeight: 600,
                  zIndex: 1,
                }}
              >
                {currentTimeHours}:{currentTimeMinutes}
              </styled.div>
            </styled.div>
          </styled.div>
        )}
        {/* // Red timeline */}
      </styled.div>
    </styled.div>
  )
}
