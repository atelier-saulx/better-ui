import * as React from 'react'
import {
  Button,
  IconChevronLeft,
  IconChevronRight,
  ScrollArea,
  Text,
  border,
  borderRadius,
  color,
  hashNonSemanticColor,
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
  getHours,
  getMinutes,
  intervalToDuration,
  isValid,
} from 'date-fns'
import { styled } from 'inlines'

export type CalendarProps = {
  data: { [key: string]: any }[]
  labelField: string
  startField: string
  endField: string
  onItemClick?: (item: { [key: string]: any }) => void
  height?: number
}

export function Calendar({
  data,
  startField,
  endField,
  labelField,
  onItemClick,
  height,
}: CalendarProps) {
  const [today] = React.useState(new Date())
  const [view, setView] = React.useState<'month' | 'week'>('month')
  const [currentPeriodStart, setCurrentPeriodStart] = React.useState(new Date())
  const weekViewCurrentTimeIndicatorRef = React.useRef<HTMLDivElement>()

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
    // if no endfield make endfield same as start field

    return data
      .map((e) => {
        if (e[startField] && !e[endField]) {
          console.log('🐱', e)
          e[endField] = e[startField]
          return e
        } else {
          return e
        }
      })
      .filter((e) => e[startField] && e[endField])

    // return data.filter((e) => e[startField] && e[endField])
  }, [data, startField, endField])

  console.log('events??,', events)

  React.useLayoutEffect(() => {
    if (view === 'week' && weekViewCurrentTimeIndicatorRef.current) {
      weekViewCurrentTimeIndicatorRef.current.scrollIntoView()
    }
  }, [view])

  return (
    <styled.div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <styled.div
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
        <styled.div
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
        </styled.div>
        <styled.div style={{ display: 'flex', gap: 2 }}>
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
        </styled.div>
      </styled.div>

      {view === 'week' && (
        <>
          {/* /// Days header start */}
          <styled.div
            style={{
              width: '100%',
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: border(),
            }}
          >
            {days.map((day) => (
              <styled.div
                key={day.toISOString()}
                style={{
                  flex: 1,
                  padding: 4,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 4,
                }}
              >
                <Text>{format(day, 'MMM')}</Text>
                <styled.div
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
                </styled.div>
              </styled.div>
            ))}
          </styled.div>
          {/* /// Days header end */}

          <ScrollArea
            style={{
              // border: '5px solid red',
              // overflowY: 'scroll',
              height: height,
            }}
          >
            <styled.div
              style={{
                flex: 1,
                width: '100%',
                position: 'relative',
                overflowY: 'auto',
                overflowX: 'hidden',
                border: border(),
                borderTop: '0px solid transparent',
              }}
            >
              <styled.div
                style={{
                  position: 'relative',
                  left: 0,
                  right: 0,
                  height: 1440,
                }}
              >
                <styled.div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <styled.div
                      style={{
                        position: 'absolute',
                        top: i * (1440 / 24),
                        width: '100%',
                        pointerEvents: 'none',
                        ...(i !== 0 && {
                          height: 1,
                          background: color('background', 'neutral'),
                        }),
                      }}
                    >
                      <styled.div style={{ transform: 'translateY(-50%)' }}>
                        <Text color="secondary">{`${i}`.padStart(2, '0')}</Text>
                      </styled.div>
                    </styled.div>
                  ))}
                  <styled.div
                    style={{
                      position: 'absolute',
                      top: getHours(today) * 60 + getMinutes(today),
                      width: '100%',
                      pointerEvents: 'none',
                      height: 1,
                      background: color('interactive', 'primary'),
                      scrollMargin: 128,
                    }}
                    ref={weekViewCurrentTimeIndicatorRef}
                  />
                  <styled.div
                    style={{
                      height: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
                      gridAutoRows: 'minmax(0, 1fr)',
                    }}
                  >
                    {days.map((day, i) => (
                      <styled.div
                        key={`content-${day.toISOString()}`}
                        style={{
                          padding: 4,
                          position: 'relative',

                          display: 'flex',
                          height: '100%',
                          width: '100%',
                          ...(i !== 0 && { borderLeft: border() }),
                        }}
                      >
                        {events
                          .filter(
                            (e) =>
                              isValid(new Date(e[startField])) &&
                              isValid(new Date(e[endField])),
                          )
                          .filter(
                            (e) =>
                              format(new Date(e[startField]), 'T') <=
                              format(new Date(e[endField]), 'T'),
                          )
                          .filter((e) =>
                            isWithinInterval(day, {
                              start: startOfDay(new Date(e[startField])),
                              end: endOfDay(new Date(e[endField])),
                            }),
                          )
                          .map((e, idx) => {
                            const start = new Date(
                              Math.max(
                                new Date(e[startField]).getTime(),
                                startOfDay(day).getTime(),
                              ),
                            )
                            const end = new Date(
                              Math.min(
                                new Date(e[endField]).getTime(),
                                endOfDay(day).getTime(),
                              ),
                            )

                            const top = getHours(start) * 60 + getMinutes(start)
                            const duration = intervalToDuration({ start, end })
                            const height =
                              duration.hours * 60 + duration.minutes

                            return (
                              <styled.div
                                style={{
                                  display: 'block',
                                  width: '100%',
                                }}
                              >
                                <styled.div
                                  key={`${day.toISOString()}-${e[labelField]}`}
                                  onClick={() => {
                                    onItemClick?.(e)
                                  }}
                                  style={{
                                    top: top + 4,
                                    height: height - 8,
                                    position: 'relative',
                                    left: 4,
                                    right: 4,
                                    minHeight: 24,
                                    cursor: 'pointer',
                                    borderRadius: borderRadius('small'),
                                    //     background: color('background', 'neutral'),
                                    backgroundColor: hashNonSemanticColor(
                                      e[labelField],
                                      true,
                                    ),
                                    padding: '0 4px',
                                    marginLeft: idx !== 0 ? 4 : 0,
                                    '&:hover': {
                                      color: color('interactive', 'primary'),
                                      backgroundColor: color(
                                        'interactive',
                                        'primary-muted',
                                      ),
                                    },
                                  }}
                                >
                                  <Text
                                    color="inherit"
                                    style={{
                                      position: 'absolute',
                                      // zIndex: idx === 0 ? 1 : 1 * idx + 1,
                                      // top: idx === 0 ? '0px' : 20 * idx + top,
                                      top: '0px',
                                      '&:hover': {
                                        color: color('interactive', 'primary'),
                                      },
                                    }}
                                    singleLine
                                  >
                                    {e[labelField]}
                                  </Text>
                                </styled.div>
                              </styled.div>
                            )
                          })}
                      </styled.div>
                    ))}
                  </styled.div>
                </styled.div>
              </styled.div>
            </styled.div>
          </ScrollArea>
        </>
      )}

      {view === 'month' && (
        <>
          <styled.div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0,1fr))',
            }}
          >
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <styled.div
                key={day}
                style={{
                  textAlign: 'right',
                  padding: 4,
                }}
              >
                <Text>{day}</Text>
              </styled.div>
            ))}
          </styled.div>
          <styled.div
            style={{
              flex: 1,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: `repeat(7, minmax(0px,1fr))`,
              gridAutoRows: `minmax(${height ? height / 5 : 0}px, 1fr)`,
              border: border(),
            }}
          >
            {days.map((day, i) => (
              <styled.div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  ...(i % 7 !== 0 && { borderLeft: border() }),
                  ...(i < days.length - 7 && { borderBottom: border() }),
                }}
                key={day.toISOString()}
              >
                <styled.div
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
                  <styled.div
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
                  </styled.div>
                </styled.div>
                <styled.div
                  style={{
                    flex: 1,
                    position: 'relative',
                  }}
                >
                  <styled.div
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
                    <ScrollArea>
                      {events
                        .filter(
                          (e) =>
                            isValid(new Date(e[startField])) &&
                            isValid(new Date(e[endField])),
                        )
                        .filter(
                          (e) =>
                            format(new Date(e[startField]), 'T') <=
                            format(new Date(e[endField]), 'T'),
                        )
                        .filter((e) =>
                          isWithinInterval(day, {
                            start: startOfDay(new Date(e[startField])),
                            end: endOfDay(new Date(e[endField])),
                          }),
                        )
                        .map((e) => (
                          <styled.div
                            key={`${day.toISOString()}-${e[labelField]}`}
                            onClick={() => {
                              onItemClick?.(e)
                            }}
                            style={{
                              cursor: 'pointer',
                              borderRadius: borderRadius('small'),
                              //  background: color('background', 'neutral'),
                              background: hashNonSemanticColor(
                                e[labelField],
                                true,
                              ),
                              padding: '0 4px',
                              marginBottom: '4px',
                              '&:hover': {
                                color: color('interactive', 'primary'),
                                background: color(
                                  'interactive',
                                  'primary-muted',
                                ),
                              },
                            }}
                          >
                            <Text color="inherit">{e[labelField]}</Text>
                          </styled.div>
                        ))}
                    </ScrollArea>
                  </styled.div>
                </styled.div>
              </styled.div>
            ))}
          </styled.div>
        </>
      )}
    </styled.div>
  )
}
