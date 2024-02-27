import * as React from 'react'
import { Text, border, color } from '../../index.js'
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  compareAsc,
  endOfWeek,
  format,
  isSameDay,
} from 'date-fns'

export type CalendarProps = {}

export function Calendar(props: CalendarProps) {
  const [today] = React.useState(new Date())
  const [currentDay, setCurrentDay] = React.useState(new Date())
  const days = React.useMemo(() => {
    const days = []

    let curr = startOfWeek(startOfMonth(currentDay), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(currentDay), { weekStartsOn: 1 })

    while (compareAsc(curr, end) < 1) {
      days.push(curr)
      curr = addDays(curr, 1)
    }

    return days
  }, [currentDay])

  console.log(days)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
        }}
      >
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
          <div
            style={{
              textAlign: 'right',
              padding: 4,
            }}
          >
            <Text>{day}</Text>
          </div>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
          border: border(),
        }}
      >
        {days.map((day, i) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 4,
              ...(i % 7 !== 0 && { borderLeft: border() }),
              ...(i < days.length - 7 && { borderBottom: border() }),
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                gap: 3,
              }}
            >
              {isSameDay(startOfMonth(day), day) && (
                <Text>{format(day, 'MMM.')}</Text>
              )}
              <div
                style={{
                  minWidth: 24,
                  borderRadius: 9999,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  ...(isSameDay(day, today) && {
                    background: color('interactive', 'primary'),
                    color: color('content', 'inverted'),
                  }),
                }}
              >
                <Text color="inherit">{format(day, 'd')}</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
