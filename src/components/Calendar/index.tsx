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
  format,
  millisecondsToMinutes,
  endOfDay,
  startOfDay,
  eachDayOfInterval,
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
  onClick?: () => void
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
  // display month is the date // could be better named in hindsight
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
  console.log(currentTimeHours, currentTimeMinutes)

  // get data that overlaps days
  console.log('⚱️🩸', data)
  // split it up into multiple days
  //// add new object duplicate , but with start date and endDate
  // React.useEffect(() => {
  if (timeEndField && view === 'week') {
    for (let i = 0; i < data.length; i++) {
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
  console.log('remove this son of a bitch')

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

  let monthData = data?.filter((item) =>
    isSameMonth(displayMonth, item[timeStartField]),
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

      <ScrollArea style={{ height: 800 }}>
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
          {view === 'month' &&
            getDays().map((day, idx) => {
              const dayDates = monthData.filter((item) =>
                isSameDay(day, item[timeStartField]),
              )
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

          {view === 'week' &&
            getDays().map((day, idx) => {
              const dayDates = monthData.filter((item) =>
                isSameDay(day, item[timeStartField]),
              )

              return idx < 7 ? (
                <WeekDayColumn
                  // view={view}
                  key={idx}
                  day={day}
                  // idx={idx}
                  // displayMonth={displayMonth}
                  onClick={onClick}
                  dayDates={dayDates}
                  labelField={labelField}
                  timeStartField={timeStartField}
                  timeEndField={timeEndField}
                />
              ) : null
            })}

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
            ></styled.div>
          )}
        </styled.div>
      </ScrollArea>
    </styled.div>
  )
}
