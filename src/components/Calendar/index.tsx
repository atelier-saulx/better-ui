import * as React from 'react'
import {
  Button,
  IconChevronLeft,
  IconChevronRight,
  SelectInput,
  Switch,
  Text,
  border,
  borderRadius,
  color,
} from '../../index.js'
import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  compareAsc,
  endOfWeek,
  format,
  isSameDay,
  addMonths,
  addWeeks,
  startOfDay,
  endOfDay,
  isWithinInterval,
  isSameMonth,
} from 'date-fns'
import { styled } from 'inlines'

export type CalendarProps = {
  data: { [key: string]: any }[]
  labelField: string
  startField: string
  endField: string
  onItemClick?: (item: { [key: string]: any }) => void
}

const today = new Date()

export function Calendar({
  data,
  startField,
  endField,
  labelField,
  onItemClick,
}: CalendarProps) {
  const [view, setView] = React.useState<'month' | 'week'>('month')
  const [currentPeriodStart, setCurrentPeriodStart] = React.useState(new Date())
  const days = React.useMemo(() => {
    const days = []

    if (view === 'month') {
      let curr = startOfWeek(startOfMonth(currentPeriodStart), {
        weekStartsOn: 1,
      })
      const end = endOfWeek(endOfMonth(currentPeriodStart), { weekStartsOn: 1 })

      while (compareAsc(curr, end) < 1) {
        days.push(curr)
        curr = addDays(curr, 1)
      }
    } else if (view === 'week') {
      let curr = startOfWeek(currentPeriodStart, {
        weekStartsOn: 1,
      })
      const end = endOfWeek(currentPeriodStart, { weekStartsOn: 1 })

      while (compareAsc(curr, end) < 1) {
        days.push(curr)
        curr = addDays(curr, 1)
      }
    }

    return days
  }, [currentPeriodStart, view])

  const events = React.useMemo(() => {
    return data
      .filter((e) => e[startField] && e[endField])
      .map((e) => ({
        data: { ...e },
        _start: new Date(e[startField]),
        _end: new Date(e[endField]),
        _day_interval: {
          start: startOfDay(new Date(e[startField])),
          end: endOfDay(new Date(e[endField])),
        },
      }))
  }, [data, startField, endField])

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
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <Text variant="title-modal">
          {format(currentPeriodStart, 'yyyy. MMMM')}
        </Text>
        {/* <div
          style={{
            display: 'flex',
            gap: 2,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Button
            style={
              view === 'month' && {
                background: color('background', 'neutral'),
                border: border('hover'),
              }
            }
            variant="neutral"
            size="small"
            onClick={() => {
              setView('month')
            }}
          >
            Month
          </Button>
          <Button
            style={
              view === 'week' && {
                background: color('background', 'neutral'),
                border: border('hover'),
              }
            }
            variant="neutral"
            size="small"
            onClick={() => {
              setView('week')
            }}
          >
            Week
          </Button>
        </div> */}
        <div style={{ display: 'flex', gap: 2 }}>
          <Button
            variant="neutral"
            shape="square"
            size="small"
            onClick={() => {
              setCurrentPeriodStart(
                view === 'month'
                  ? addMonths(currentPeriodStart, -1)
                  : addWeeks(currentPeriodStart, -1),
              )
            }}
          >
            <IconChevronLeft />
          </Button>
          <Button
            variant="neutral"
            size="small"
            onClick={() => {
              setCurrentPeriodStart(today)
            }}
          >
            Today
          </Button>
          <Button
            variant="neutral"
            shape="square"
            size="small"
            onClick={() => {
              setCurrentPeriodStart(
                view === 'month'
                  ? addMonths(currentPeriodStart, 1)
                  : addWeeks(currentPeriodStart, 1),
              )
            }}
          >
            <IconChevronRight />
          </Button>
        </div>
      </div>

      {view === 'week' && (
        <>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
            }}
          >
            {days.map((day) => (
              <div
                key={day.toISOString()}
                style={{
                  padding: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Text>{format(day, 'MMM')}</Text>
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
            ))}
          </div>
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
              gridAutoRows: 'minmax(0, 1fr)',
              border: border(),
            }}
          >
            {days.map((day, i) => (
              <div
                key={`content-${day.toISOString()}`}
                style={{ padding: 4, ...(i !== 0 && { borderLeft: border() }) }}
              >
                {events
                  .filter((e) => isWithinInterval(day, e._day_interval))
                  .map((e) => (
                    <styled.div
                      key={`${day.toISOString()}-${e.data[labelField]}`}
                      onClick={() => {
                        onItemClick?.(e.data)
                      }}
                      style={{
                        cursor: 'pointer',
                        borderRadius: borderRadius('small'),
                        background: color('background', 'neutral'),
                        padding: '0 4px',
                        '&:hover': {
                          background: color('interactive', 'primary'),
                          color: color('content', 'inverted'),
                        },
                      }}
                    >
                      <Text color="inherit">{e.data[labelField]}</Text>
                    </styled.div>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'month' && (
        <>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
            }}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
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
              gridAutoRows: 'minmax(0, 1fr)',
              border: border(),
            }}
          >
            {days.map((day, i) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  ...(i % 7 !== 0 && { borderLeft: border() }),
                  ...(i < days.length - 7 && { borderBottom: border() }),
                }}
                key={day.toISOString()}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    gap: 4,
                    padding: 4,
                    color: isSameMonth(day, currentPeriodStart)
                      ? color('content', 'primary')
                      : color('content', 'secondary'),
                  }}
                >
                  {isSameDay(startOfMonth(day), day) && (
                    <Text color="inherit">{format(day, 'MMM.')}</Text>
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
                <div
                  style={{
                    flex: 1,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      overflow: 'auto',
                      padding: '0 4px 4px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    {events
                      .filter((e) => isWithinInterval(day, e._day_interval))
                      .map((e) => (
                        <styled.div
                          key={`${day.toISOString()}-${e.data[labelField]}`}
                          onClick={() => {
                            onItemClick?.(e.data)
                          }}
                          style={{
                            cursor: 'pointer',
                            borderRadius: borderRadius('small'),
                            background: color('background', 'neutral'),
                            padding: '0 4px',
                            '&:hover': {
                              background: color('interactive', 'primary'),
                              color: color('content', 'inverted'),
                            },
                          }}
                        >
                          <Text color="inherit">{e.data[labelField]}</Text>
                        </styled.div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
