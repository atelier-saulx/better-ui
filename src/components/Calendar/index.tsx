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
  isSameDay,
  toDate,
} from 'date-fns'
import {
  Button,
  IconChevronDown,
  IconChevronTop,
  border,
  borderRadius,
  textVariants,
  Text,
  color,
  Stack,
} from '../../index.js'
import { styled } from 'inlines'

export type CalendarProps = {
  data?: {}[]
}

export const Calendar = ({ data }: CalendarProps) => {
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

  console.log(data, 'from calender')

  // timestamps to the right days
  // console.log('-> to Date', toDate(1707747955118))
  // console.log('-> new Date,', new Date(2014, 2, 11, 18, 0))
  // console.log(isSameDay(1392098430000, new Date(2014, 1, 11, 18, 0)))
  // console.log('display month', displayMonth)

  //1 filter the right month and year from data
  // TODO variable field createdAt...
  let monthData = data.filter((item) =>
    isSameMonth(displayMonth, item['createdAt']),
  )

  console.log(monthData, '🍟')
  //2 from that data filter the right days

  return (
    <styled.div
      style={{
        border: border(),
        borderRadius: borderRadius('medium'),
        padding: 24,
      }}
    >
      <styled.div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 24,
          ...textVariants['body-strong'],
          fontSize: 16,
        }}
      >
        <styled.div>{format(displayMonth, 'MMMM yyyy')}</styled.div>
        <styled.div>
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
        </styled.div>
      </styled.div>
      <styled.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0px',
        }}
      >
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <styled.div
            key={index}
            style={{
              height: 24,
              width: 124,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: border(),
              backgroundColor: color('interactive', 'primary-muted'),
            }}
          >
            <Text style={{ color: color('interactive', 'primary') }}>
              {day}
            </Text>
          </styled.div>
        ))}
        {getDays().map((day) => {
          // TODO Variable craetedat
          const dayDates = monthData.filter((item) =>
            isSameDay(day, item['createdAt']),
          )

          return (
            <Stack
              key={day.toISOString()}
              style={{
                height: 124,
                width: 124,
                border: border(),
                borderRadius: 4,
                position: 'relative',
                paddingTop: 32,
              }}
              gap={2}
              grid
            >
              <Text
                color="secondary"
                style={{ position: 'absolute', right: 8, top: 3 }}
              >
                {isSameMonth(day, displayMonth) && format(day, 'd')}
              </Text>

              {dayDates.map((item, idx) => (
                <Text
                  key={idx}
                  singleLine
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    marginBlockEnd: '0px',
                    marginBlockStart: '0px',
                    lineHeight: '15px',
                    borderBottom: border(),
                  }}
                >
                  {item?.title}
                </Text>
              ))}
            </Stack>
          )
        })}
      </styled.div>
    </styled.div>
  )
}
