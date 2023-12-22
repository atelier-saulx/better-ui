import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import {
  Text,
  textVariants,
  IconCalendar,
  IconChevronDown,
  IconChevronTop,
  border,
  borderRadius,
  color,
  useControllableState,
  TextInput,
} from '~'
import { styled, Style } from 'inlines'
import {
  addMonths,
  format,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  compareAsc,
  endOfWeek,
  isToday,
  isSameDay,
  isWithinInterval,
  min,
  max,
  isSameMonth,
  isMonday,
  isSunday,
  startOfDay,
  parse,
  setHours,
  setMinutes,
} from 'date-fns'

type DateInputValue = number | { start: number; end: number }

export type DateInputProps = {
  range?: boolean
  time?: boolean
  value?: DateInputValue
  defaultValue?: DateInputValue
  onChange?: (value: DateInputValue) => void
  variant?: 'regular' | 'small'
  error?: boolean
  label?: string
  style?: Style
}

export function DateInput({
  range = false,
  time = false,
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange,
  variant = 'regular',
  error,
  label,
  style,
}: DateInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange,
  })
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null)
  const [pendingRangePart, setPendingRangePart] = React.useState<Date | null>(
    null
  )
  const [pendingStartTime, setPendingStartTime] = React.useState('')
  const [pendingEndTime, setPendingEndTime] = React.useState('')

  React.useEffect(() => {
    if (value) {
      if (typeof value === 'object') {
        setPendingStartTime(format(value.start, 'HH:mm'))
        setPendingEndTime(format(value.end, 'HH:mm'))
      } else {
        setPendingStartTime(format(value, 'HH:mm'))
      }
    } else {
      setPendingStartTime('')
      setPendingEndTime('')
    }
  }, [value])

  const getDays = React.useCallback(() => {
    const days = []
    let curr = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })

    while (compareAsc(curr, end) < 1) {
      days.push(curr)
      curr = addDays(curr, 1)
    }

    return days
  }, [currentMonth])

  const Wrapper = label ? styled.label : styled.div

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Wrapper
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            '&[data-state="open"] > div': {
              border: '1px solid var(--interactive-primary) !important',
              boxShadow:
                '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent) !important',
            },
            ...(error && {
              '&[data-state="open"] > div': {
                border: '1px solid var(--semantic-background-error)',
                boxShadow:
                  '0 0 0 2px color-mix(in srgb, var(--semantic-background-error) 20%, transparent)',
              },
            }),
            ...style,
          }}
        >
          {label && (
            <styled.span
              style={{
                marginBottom: 8,
                fontSize: 14,
                lineHeight: '24px',
                fontWeight: 500,
              }}
            >
              {label}
            </styled.span>
          )}
          <styled.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 14,
              lineHeight: '24px',
              fontWeight: 500,
              width: '100%',
              minHeight: variant === 'regular' ? 42 : 32,
              padding: variant === 'regular' ? '8px 12px' : '3px 10px',
              borderRadius:
                variant === 'regular'
                  ? borderRadius('small')
                  : borderRadius('tiny'),
              border:
                variant === 'small'
                  ? '1px solid transparent'
                  : '1px solid var(--interactive-secondary)',
              '&:hover': {
                border:
                  variant === 'small'
                    ? '1px solid transparent'
                    : '1px solid var(--interactive-secondary-hover)',
              },
              '&:focus, &:focus:hover': {
                border: '1px solid var(--interactive-primary)',
                boxShadow:
                  '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
              },
              ...(error && {
                border: '1px solid var(--semantic-background-error)',
                '&:hover': {
                  border: '1px solid var(--semantic-background-error)',
                },
                '&:focus, &:focus:hover': {
                  border: '1px solid var(--semantic-background-error)',
                  boxShadow:
                    '0 0 0 2px color-mix(in srgb, var(--semantic-background-error) 20%, transparent)',
                },
              }),
            }}
          >
            <IconCalendar />
            <div>
              {value &&
                (typeof value === 'object'
                  ? `${format(
                      value.start,
                      time ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'
                    )} - ${format(
                      value.end,
                      time ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'
                    )}`
                  : format(value, time ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'))}
            </div>
          </styled.div>
        </Wrapper>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          style={{
            maxHeight:
              'calc(var(--radix-popover-content-available-height) - 8px)',
            padding: '16px 16px 0px',
            border: '1px solid var(--interactive-secondary)',
            background: color('background', 'screen'),
            boxShadow: 'var(--shadow-elevation)',
            borderRadius: borderRadius('small'),
            overflowY: 'auto',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text variant="bodyStrong">
                {format(currentMonth, 'MMMM yyyy')}
              </Text>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <styled.button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: 'transparent',
                    width: 24,
                    height: 24,
                    borderRadius: borderRadius('tiny'),
                    '&:hover': {
                      background: color('background', 'neutral'),
                    },
                    ...textVariants.body,
                  }}
                  onClick={() => {
                    setCurrentMonth(addMonths(currentMonth, -1))
                  }}
                >
                  <IconChevronDown />
                </styled.button>
                <styled.button
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0,
                    margin: 0,
                    border: 'none',
                    background: 'transparent',
                    width: 24,
                    height: 24,
                    borderRadius: borderRadius('tiny'),
                    '&:hover': {
                      background: color('background', 'neutral'),
                    },
                    ...textVariants.body,
                  }}
                  onClick={() => {
                    setCurrentMonth(addMonths(currentMonth, 1))
                  }}
                >
                  <IconChevronTop />
                </styled.button>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 28px)',
                gridAutoRows: '28px',
                padding: '16px 0',
                gap: 10,
              }}
            >
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...textVariants.body,
                  }}
                >
                  {day}
                </div>
              ))}
              {getDays().map((day) => (
                <styled.button
                  key={day.toISOString()}
                  style={{
                    position: 'relative',
                    padding: 0,
                    margin: 0,
                    border: '1px solid transparent',
                    background: 'transparent',
                    borderTopLeftRadius: borderRadius('tiny'),
                    borderBottomLeftRadius: borderRadius('tiny'),
                    borderTopRightRadius: borderRadius('tiny'),
                    borderBottomRightRadius: borderRadius('tiny'),
                    ...textVariants.bodyBold,
                    ...((!range || (range && !pendingRangePart)) && {
                      '&:hover': {
                        background: color('background', 'neutral'),
                      },
                    }),
                    color: isSameMonth(currentMonth, day)
                      ? color('content', 'primary')
                      : color('content', 'secondary'),
                    ...(isToday(day) && {
                      border: '1px solid var(--interactive-primary)',
                    }),
                    ...(value &&
                      (typeof value === 'object'
                        ? !pendingRangePart &&
                          (isSameDay(day, value.start) ||
                            isSameDay(day, value.end))
                        : isSameDay(day, value)) && {
                        background: color('interactive', 'primary'),
                        color: color('content', 'inverted'),
                        '&:hover': {
                          background: color('interactive', 'primary-hover'),
                          border: '1px solid var(--interactive-primary-hover)',
                        },
                      }),
                    ...(pendingRangePart &&
                      hoveredDate &&
                      isWithinInterval(day, {
                        start: min([pendingRangePart, hoveredDate]),
                        end: max([pendingRangePart, hoveredDate]),
                      }) && {
                        background: isSameDay(pendingRangePart, day)
                          ? color('interactive', 'primary')
                          : 'color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
                        ...(isSameDay(pendingRangePart, day) && {
                          color: color('content', 'inverted'),
                        }),
                        borderTopLeftRadius:
                          isSameDay(
                            min([pendingRangePart, hoveredDate]),
                            day
                          ) || isMonday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderBottomLeftRadius:
                          isSameDay(
                            min([pendingRangePart, hoveredDate]),
                            day
                          ) || isMonday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderTopRightRadius:
                          isSameDay(
                            max([pendingRangePart, hoveredDate]),
                            day
                          ) || isSunday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderBottomRightRadius:
                          isSameDay(
                            max([pendingRangePart, hoveredDate]),
                            day
                          ) || isSunday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        ...(!isMonday(day) &&
                          !isSameDay(
                            min([pendingRangePart, hoveredDate]),
                            day
                          ) && {
                            '&:before': {
                              pointerEvents: 'none',
                              position: 'absolute',
                              left: '-11px',
                              top: '0',
                              bottom: '0',
                              content: "''",
                              display: 'block',
                              background:
                                'color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
                              width: '10px',
                              height: 'calc(100% + 2px)',
                              marginTop: '-1px',
                            },
                          }),
                      }),
                    ...(!pendingRangePart &&
                      value &&
                      typeof value === 'object' &&
                      isWithinInterval(day, {
                        start: min([value.start, value.end]),
                        end: max([value.start, value.end]),
                      }) && {
                        ...(isSameDay(value.start, day) ||
                        isSameDay(value.end, day)
                          ? {
                              background: color('interactive', 'primary'),
                              color: color('content', 'inverted'),
                              '&:hover': {
                                background: color(
                                  'interactive',
                                  'primary-hover'
                                ),
                              },
                            }
                          : {
                              background:
                                'color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
                              '&:hover': {
                                background:
                                  'color-mix(in srgb, var(--interactive-primary) 40%, transparent)',
                              },
                            }),
                        borderTopLeftRadius:
                          isSameDay(min([value.start, value.end]), day) ||
                          isMonday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderBottomLeftRadius:
                          isSameDay(min([value.start, value.end]), day) ||
                          isMonday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderTopRightRadius:
                          isSameDay(max([value.start, value.end]), day) ||
                          isSunday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderBottomRightRadius:
                          isSameDay(max([value.start, value.end]), day) ||
                          isSunday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        ...(!isMonday(day) &&
                          !isSameDay(min([value.start, value.end]), day) && {
                            '&:before': {
                              pointerEvents: 'none',
                              position: 'absolute',
                              left: '-11px',
                              top: '0',
                              bottom: '0',
                              content: "''",
                              display: 'block',
                              background:
                                'color-mix(in srgb, var(--interactive-primary) 20%, transparent)',
                              width: '10px',
                              height: 'calc(100% + 2px)',
                              marginTop: '-1px',
                            },
                          }),
                      }),
                  }}
                  onClick={() => {
                    if (range) {
                      if (pendingRangePart) {
                        setValue({
                          start: min([pendingRangePart, day]).getTime(),
                          end: max([pendingRangePart, day]).getTime(),
                        })
                        setPendingRangePart(null)
                        return
                      }
                      setPendingRangePart(day)
                      return
                    }

                    setValue(day.getTime())
                  }}
                  onMouseEnter={() => {
                    if (!range) return

                    setHoveredDate(day)
                  }}
                >
                  {format(day, 'd')}
                </styled.button>
              ))}
            </div>
            {time && (
              <>
                <div
                  style={{
                    borderTop: border(),
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: -16,
                    marginRight: -16,
                  }}
                >
                  <Text>{range ? 'Start time' : 'Time'}</Text>
                  <div style={{ width: 80 }}>
                    <TextInput
                      placeholder="11:00"
                      variant="small"
                      value={pendingStartTime}
                      onChange={setPendingStartTime}
                      onBlur={() => {
                        if (!value) return
                        const result = parse(
                          pendingStartTime,
                          'HH:mm',
                          new Date()
                        )

                        if (isNaN(result.getTime())) {
                          return
                        }

                        if (typeof value === 'object') {
                          setValue({
                            ...value,
                            start: setHours(
                              setMinutes(value.start, result.getMinutes()),
                              result.getHours()
                            ).getTime(),
                          })
                        } else {
                          setValue(
                            setHours(
                              setMinutes(value, result.getMinutes()),
                              result.getHours()
                            ).getTime()
                          )
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          ;(e.target as HTMLInputElement).blur()
                        }
                      }}
                    />
                  </div>
                </div>
                {range && (
                  <div
                    style={{
                      padding: '0 16px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginLeft: -16,
                      marginRight: -16,
                    }}
                  >
                    <Text>End time</Text>
                    <div style={{ width: 80 }}>
                      <TextInput
                        placeholder="11:00"
                        variant="small"
                        value={pendingEndTime}
                        onChange={setPendingEndTime}
                        onBlur={() => {
                          if (!value || !(typeof value === 'object')) return
                          const result = parse(
                            pendingEndTime,
                            'HH:mm',
                            new Date()
                          )

                          if (isNaN(result.getTime())) {
                            return
                          }

                          setValue({
                            ...value,
                            end: setHours(
                              setMinutes(value.end, result.getMinutes()),
                              result.getHours()
                            ).getTime(),
                          })
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            ;(e.target as HTMLInputElement).blur()
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
            {!range && (
              <div
                style={{
                  borderTop: border(),
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px 0',
                  marginLeft: -16,
                  marginRight: -16,
                }}
              >
                <styled.button
                  style={{
                    margin: 0,
                    border: 'none',
                    background: 'transparent',
                    padding: '4px 16px',
                    textAlign: 'left',
                    color: color('content', 'primary'),
                    ...textVariants.body,
                    '&:hover': {
                      background: color('background', 'neutral'),
                    },
                  }}
                  onClick={() => {
                    setValue(startOfDay(new Date()).getTime())
                  }}
                >
                  Today
                </styled.button>
                <styled.button
                  style={{
                    margin: 0,
                    border: 'none',
                    background: 'transparent',
                    padding: '4px 16px',
                    textAlign: 'left',
                    color: color('content', 'primary'),
                    ...textVariants.body,
                    '&:hover': {
                      background: color('background', 'neutral'),
                    },
                  }}
                  onClick={() => {
                    if (!value) {
                      setValue(addDays(new Date(), +1).getTime())
                      return
                    }

                    if (value && !(typeof value === 'object')) {
                      setValue(addDays(value, +1).getTime())
                    }
                  }}
                >
                  Select next date
                </styled.button>

                <styled.button
                  style={{
                    margin: 0,
                    border: 'none',
                    background: 'transparent',
                    padding: '4px 16px',
                    textAlign: 'left',
                    ...textVariants.body,
                    '&:hover': {
                      background: color('background', 'neutral'),
                    },
                  }}
                  onClick={() => {
                    if (!value) {
                      setValue(addDays(new Date(), -1).getTime())
                      return
                    }

                    if (value && !(typeof value === 'object')) {
                      setValue(addDays(value, -1).getTime())
                    }
                  }}
                >
                  Select previous date
                </styled.button>
              </div>
            )}
            <styled.div
              style={{
                borderTop: border(),
                padding: '8px 0',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: -16,
                marginRight: -16,
              }}
            >
              <styled.button
                style={{
                  margin: 0,
                  border: 'none',
                  background: 'transparent',
                  padding: '4px 16px',
                  textAlign: 'left',
                  color: color('content', 'primary'),
                  ...textVariants.body,
                  '&:hover': {
                    background: color('background', 'neutral'),
                  },
                }}
                onClick={() => {
                  setCurrentMonth(new Date())
                  setValue(undefined)
                  setHoveredDate(null)
                  setPendingRangePart(null)
                }}
              >
                Clear
              </styled.button>
            </styled.div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
