import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import {
  Text,
  IconCalendar,
  IconChevronDown,
  IconChevronTop,
  border,
  useControllableState,
  TextInput,
  boxShadow,
} from '../../index.js'
import { textVariants } from '../../components/Text/index.js'
import { borderRadius, color } from '../../utils/colors.js'
import { styled, Style } from 'inlines'
import {
  addMonths,
  format as rawFormat,
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
  hoursToMilliseconds,
  minutesToMilliseconds,
} from 'date-fns'

const format = (...args) => {
  try {
    // @ts-ignore
    return rawFormat(...args)
  } catch (e) {
    return ''
  }
}

type DateInputValue = number | { start: number; end: number }

export type DateInputProps = {
  range?: boolean
  time?: boolean
  value?: DateInputValue
  defaultValue?: DateInputValue
  min?: number
  max?: number
  checksum?: number
  onChange?: (value: DateInputValue) => void
  variant?: 'regular' | 'small'
  error?: boolean
  label?: string
  description?: string
  disabled?: boolean
  style?: Style
}

const DateTextButton = styled('button', {
  background: 'transparent',
  border: 'none',
  color: color('content', 'primary'),
  margin: 0,
  padding: '4px 16px',
  textAlign: 'left',
  ...textVariants.body,
  '&:hover': {
    background: color('background', 'neutral'),
  },
})

const DateMonthButton = styled('button', {
  alignItems: 'center',
  background: 'transparent',
  border: 'none',
  borderRadius: borderRadius('tiny'),
  display: 'flex',
  height: 24,
  justifyContent: 'center',
  margin: 0,
  padding: 0,
  width: 24,
  '&:hover': {
    background: color('background', 'neutral'),
  },
  ...textVariants.body,
})

function isDateWithinRange(date: number, min: number, max: number) {
  if (!min && !max) {
    return true
  } else if (min && max) {
    return (
      compareAsc(new Date(date), new Date(min)) !== -1 &&
      compareAsc(new Date(date), new Date(max)) !== 1
    )
  } else if (min) {
    return compareAsc(new Date(date), new Date(min)) !== -1
  } else if (max) {
    return compareAsc(new Date(date), new Date(max)) !== 1
  }
}

export function DateInput({
  range = false,
  time = false,
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange,
  checksum,
  variant = 'regular',
  error,
  label,
  description,
  disabled,
  style,
  min: minProp,
  max: maxProp,
}: DateInputProps) {
  let [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValueProp,
    onChange,
    checksum,
  })
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null)
  const [pendingRangePart, setPendingRangePart] = React.useState<Date | null>(
    null,
  )
  const [pendingStartTime, setPendingStartTime] = React.useState('')
  const [pendingEndTime, setPendingEndTime] = React.useState('')
  const startTimeInputRef = React.useRef<HTMLInputElement>(null)
  const endTimeInputRef = React.useRef<HTMLInputElement>(null)

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
    let curr = startOfWeek(startOfMonth(startOfDay(currentMonth)), {
      weekStartsOn: 1,
    })
    const end = endOfWeek(endOfMonth(startOfDay(currentMonth)), {
      weekStartsOn: 1,
    })

    while (compareAsc(curr, end) < 1) {
      days.push(curr)
      curr = addDays(curr, 1)
    }

    return days
  }, [currentMonth])

  function handleChange(value: DateInputValue | undefined) {
    if (!value) {
      setValue(undefined)
      return
    }

    if (typeof value === 'object') {
      if (
        (value.start && !isDateWithinRange(value.start, minProp, maxProp)) ||
        (value.end && !isDateWithinRange(value.end, minProp, maxProp))
      ) {
        return
      }
    } else if (!isDateWithinRange(value, minProp, maxProp)) {
      return
    }

    setValue(value)
  }

  React.useEffect(() => {
    if (value) {
      if (typeof value === 'object') {
        if (
          (value.start && !isDateWithinRange(value.start, minProp, maxProp)) ||
          (value.end && !isDateWithinRange(value.end, minProp, maxProp))
        ) {
          setValue(undefined)
        }
      } else if (!isDateWithinRange(value, minProp, maxProp)) {
        setValue(undefined)
      }
    }
  }, [value])

  const Wrapper = label ? styled.label : styled.div

  return (
    <Popover.Root
      onOpenChange={(open) => {
        if (!open && document.activeElement === startTimeInputRef?.current) {
          startTimeInputRef.current.blur()
        }

        if (!open && document.activeElement === endTimeInputRef?.current) {
          endTimeInputRef.current.blur()
        }
      }}
    >
      <Popover.Trigger asChild>
        <Wrapper
          style={{
            display: 'flex',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'default',
            flexDirection: 'column',
            width: '100%',
            '&[data-state="open"] > div': {
              border: `1px solid ${color('interactive', 'primary')}  !important`,
              boxShadow: `0 0 0 2px color-mix(in srgb, ${color('interactive', 'primary')}  20%, transparent) !important`,
            },
            ...(error && {
              '&[data-state="open"] > div': {
                border: border('error'),
                boxShadow: boxShadow('error'),
              },
            }),
            ...style,
          }}
          onClick={(e) => (disabled ? e.preventDefault() : null)}
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
              border: variant === 'small' ? '1px solid transparent' : border(),
              '&:hover': {
                border:
                  variant === 'small'
                    ? '1px solid transparent'
                    : border('hover'),
              },
              '&:focus, &:focus:hover': {
                border: `1px solid ${color('interactive', 'primary')} `,
                boxShadow: boxShadow('focus'),
              },
              ...(error && {
                border: border('error'),
                '&:hover': {
                  border: border('error'),
                },
                '&:focus, &:focus:hover': {
                  border: border('error'),
                  boxShadow: boxShadow('error'),
                },
              }),
            }}
          >
            <IconCalendar />
            <Text singleLine>
              {value &&
                (typeof value === 'object'
                  ? `${format(
                      value.start,
                      time ? `dd/MM/yyyy HH:mm` : 'dd/MM/yyyy',
                    )} - ${format(
                      value.end,
                      time ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy',
                    )}`
                  : format(value, time ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy')) +
                  ` ${
                    new Date()
                      .toLocaleTimeString('en-us', { timeZoneName: 'short' })
                      .split(' ')[2]
                  }`}
            </Text>
          </styled.div>
          {description !== undefined ? (
            <Text
              color="secondary"
              variant="body-bold"
              style={{ marginTop: 8 }}
            >
              {description}
            </Text>
          ) : null}
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
            border: border(),
            background: color('background', 'screen'),
            boxShadow: boxShadow('elevation'),
            borderRadius: borderRadius('small'),
            overflowY: 'auto',
          }}
        >
          <div>
            <Text variant="body-light" style={{ marginBottom: 10 }}>
              {Intl.DateTimeFormat().resolvedOptions().timeZone} (
              {
                new Date()
                  .toLocaleTimeString('en-us', { timeZoneName: 'short' })
                  .split(' ')[2]
              }
              )
            </Text>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text variant="body-strong">
                {format(currentMonth, 'MMMM yyyy')}
              </Text>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <DateMonthButton
                  onClick={() => {
                    setCurrentMonth(addMonths(currentMonth, -1))
                  }}
                >
                  <IconChevronDown />
                </DateMonthButton>
                <DateMonthButton
                  onClick={() => {
                    setCurrentMonth(addMonths(currentMonth, 1))
                  }}
                >
                  <IconChevronTop />
                </DateMonthButton>
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
                    ...textVariants['body-bold'],
                    ...((!range || (range && !pendingRangePart)) && {
                      '&:hover': {
                        background: color('background', 'neutral'),
                      },
                    }),
                    color:
                      isSameMonth(currentMonth, day) &&
                      isDateWithinRange(day, minProp, maxProp)
                        ? color('content', 'primary')
                        : color('content', 'secondary'),
                    ...(isToday(day) && {
                      border: `1px solid ${color('interactive', 'primary')}`,
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
                          border: `1px solid ${color('interactive', 'primary-hover')} `,
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
                          : `color-mix(in srgb, ${color('interactive', 'primary')} 20%, transparent)`,
                        ...(isSameDay(pendingRangePart, day) && {
                          color: color('content', 'inverted'),
                        }),
                        borderTopLeftRadius:
                          isSameDay(
                            min([pendingRangePart, hoveredDate]),
                            day,
                          ) || isMonday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderBottomLeftRadius:
                          isSameDay(
                            min([pendingRangePart, hoveredDate]),
                            day,
                          ) || isMonday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderTopRightRadius:
                          isSameDay(
                            max([pendingRangePart, hoveredDate]),
                            day,
                          ) || isSunday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        borderBottomRightRadius:
                          isSameDay(
                            max([pendingRangePart, hoveredDate]),
                            day,
                          ) || isSunday(day)
                            ? borderRadius('tiny')
                            : '0px',
                        ...(!isMonday(day) &&
                          !isSameDay(
                            min([pendingRangePart, hoveredDate]),
                            day,
                          ) && {
                            '&:before': {
                              pointerEvents: 'none',
                              position: 'absolute',
                              left: '-11px',
                              top: '0',
                              bottom: '0',
                              content: "''",
                              display: 'block',
                              background: `color-mix(in srgb, ${color('interactive', 'primary')}  20%, transparent)`,
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
                                  'primary-hover',
                                ),
                              },
                            }
                          : {
                              background: `color-mix(in srgb, ${color('interactive', 'primary')}  20%, transparent)`,
                              '&:hover': {
                                background: `color-mix(in srgb, ${color('interactive', 'primary')} 40%, transparent)`,
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
                              background: `color-mix(in srgb, ${color('interactive', 'primary')}  20%, transparent)`,
                              width: '10px',
                              height: 'calc(100% + 2px)',
                              marginTop: '-1px',
                            },
                          }),
                      }),
                  }}
                  onClick={() => {
                    // make sure time keeps consistent if you change date
                    const timeInMs =
                      hoursToMilliseconds(+pendingStartTime.slice(0, 2)) +
                      minutesToMilliseconds(+pendingStartTime.slice(-2))

                    if (range) {
                      const endingTimeInMs =
                        hoursToMilliseconds(+pendingEndTime.slice(0, 2)) +
                        minutesToMilliseconds(+pendingEndTime.slice(-2))

                      if (pendingRangePart) {
                        handleChange({
                          start:
                            min([pendingRangePart, day]).getTime() + timeInMs,
                          end:
                            max([pendingRangePart, day]).getTime() +
                            endingTimeInMs,
                        })
                        setPendingRangePart(null)
                        return
                      }
                      setPendingRangePart(day)
                      return
                    }

                    handleChange(day.getTime() + timeInMs)
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
                      ref={startTimeInputRef}
                      placeholder="11:00"
                      variant="small"
                      value={pendingStartTime}
                      onChange={setPendingStartTime}
                      onBlur={() => {
                        if (!value) return
                        const result = parse(
                          pendingStartTime,
                          'HH:mm',
                          new Date(),
                        )

                        if (isNaN(result.getTime())) {
                          return
                        }

                        if (typeof value === 'object') {
                          handleChange({
                            ...value,
                            start: setHours(
                              setMinutes(value.start, result.getMinutes()),
                              result.getHours(),
                            ).getTime(),
                          })
                        } else {
                          handleChange(
                            setHours(
                              setMinutes(value, result.getMinutes()),
                              result.getHours(),
                            ).getTime(),
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
                        disabled={disabled}
                        ref={endTimeInputRef}
                        placeholder="11:00"
                        variant="small"
                        value={pendingEndTime}
                        onChange={setPendingEndTime}
                        onBlur={() => {
                          if (!value || !(typeof value === 'object')) return
                          const result = parse(
                            pendingEndTime,
                            'HH:mm',
                            new Date(),
                          )

                          if (isNaN(result.getTime())) {
                            return
                          }

                          handleChange({
                            ...value,
                            end: setHours(
                              setMinutes(value.end, result.getMinutes()),
                              result.getHours(),
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
                <DateTextButton
                  onClick={() => {
                    handleChange(Date.now())
                  }}
                >
                  Now
                </DateTextButton>
                <DateTextButton
                  onClick={() => {
                    handleChange(startOfDay(new Date()).getTime())
                  }}
                >
                  Today
                </DateTextButton>
                <DateTextButton
                  onClick={() => {
                    if (!value) {
                      handleChange(addDays(new Date(), +1).getTime())
                      return
                    }

                    if (value && !(typeof value === 'object')) {
                      handleChange(addDays(value, +1).getTime())
                    }
                  }}
                >
                  Select next date
                </DateTextButton>

                <DateTextButton
                  onClick={() => {
                    if (!value) {
                      handleChange(addDays(new Date(), -1).getTime())
                      return
                    }

                    if (value && !(typeof value === 'object')) {
                      handleChange(addDays(value, -1).getTime())
                    }
                  }}
                >
                  Select previous date
                </DateTextButton>
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
              <DateTextButton
                onClick={() => {
                  setCurrentMonth(new Date())
                  handleChange(undefined)
                  setHoveredDate(null)
                  setPendingRangePart(null)
                }}
              >
                Clear
              </DateTextButton>
            </styled.div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
