import * as React from 'react'

import {
  addMonths,
  startOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
  addYears,
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
  Dropdown,
  boxShadow,
  IconChevronLeft,
  IconChevronRight,
} from '../../index.js'
import { styled } from 'inlines'

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
  view = 'month',
}: CalendarProps) => {
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

  // filter the monthly data
  let monthData = data.filter((item) =>
    isSameMonth(displayMonth, item[timestampField]),
  )

  return (
    <styled.div
      style={{
        border: border(),
        borderRadius: borderRadius('medium'),
        padding: 24,
        // maxWidth: 916,
        width: '100%',
      }}
    >
      <Stack style={{ marginBottom: 16 }}>
        <Stack justify="start" gap={0}>
          <Button
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addMonths(displayMonth, -1))
            }}
          >
            <IconChevronLeft />
          </Button>
          <Button
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addMonths(displayMonth, 1))
            }}
          >
            <IconChevronRight />
          </Button>
          <Text style={{ marginLeft: 10 }} variant="title-modal">
            {format(displayMonth, 'MMMM')}
          </Text>
        </Stack>

        <Stack justify="end" gap={0}>
          <Text variant="title-modal" style={{ marginRight: 10 }}>
            {format(displayMonth, 'yyyy')}
          </Text>
          <Button
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addYears(displayMonth, -1))
            }}
          >
            <IconChevronTop />
          </Button>
          <Button
            size="small"
            variant="neutral-transparent"
            shape="square"
            onClick={() => {
              setDisplayMonth(addYears(displayMonth, 1))
            }}
          >
            <IconChevronDown />
          </Button>
        </Stack>
      </Stack>

      <styled.div
        style={{
          display: 'grid',
          //  maxWidth: 868,
          width: '100%',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0px',
          border: border(),
          borderRight: 'none',
          borderRadius: 8,
        }}
      >
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <styled.div
            key={index}
            style={{
              height: 48,
              // width: 124,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: border(),
              borderTopLeftRadius: index === 0 ? 8 : 0,
              borderTopRightRadius: index === 6 ? 8 : 0,
              backgroundColor: color('background', 'muted'),
            }}
          >
            <Text weight="strong">{day}</Text>
          </styled.div>
        ))}
        {getDays().map((day, idx) => {
          const dayDates = monthData.filter((item) =>
            isSameDay(day, item[timestampField]),
          )

          return (
            <Stack
              key={day.toISOString()}
              style={{
                height: 124,
                // width: 124,
                aspectRatio: 1,
                borderTop: border(),
                borderRight: border(),
                borderBottomRightRadius: idx === 34 ? 8 : 0,
                position: 'relative',
                padding: '22px 8px 26px 8px',
              }}
              gap={2}
              grid
            >
              {isSameDay(day, Date.now()) ? (
                <Text
                  color="inverted"
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 3,
                    backgroundColor: color('interactive', 'primary'),
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                  }}
                >
                  {isSameMonth(day, displayMonth) && format(day, 'd')}
                </Text>
              ) : (
                <Text
                  color="secondary"
                  style={{ position: 'absolute', right: 8, top: 3 }}
                >
                  {isSameMonth(day, displayMonth) && format(day, 'd')}
                </Text>
              )}

              {dayDates.map((item: { title?: string }, idx) =>
                idx < 4 ? (
                  <styled.div
                    onClick={() => console.log('clicked ->', item[labelField])}
                  >
                    <Text
                      key={idx}
                      singleLine
                      style={{
                        fontSize: 13,
                        marginBottom: 2,
                        marginBlockEnd: '0px',
                        marginBlockStart: '0px',
                        lineHeight: '15px',
                        cursor: 'pointer',
                        '&:hover': {
                          color: `${color('content', 'secondary')} !important`,
                        },
                      }}
                      // @ts-ignore
                    >
                      {item[labelField]}
                    </Text>
                  </styled.div>
                ) : null,
              )}
              {dayDates.length > 4 && (
                <Dropdown.Root>
                  <Dropdown.Trigger>
                    <Button
                      variant="primary-link"
                      size="small"
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        '& > div > div': {
                          fontSize: '13px !important',
                          lineHeight: '16px !important',
                          fontWeight: '600 !important',
                        },
                      }}
                    >
                      {dayDates.length - 4} more
                    </Button>
                  </Dropdown.Trigger>
                  <Dropdown.Items>
                    <styled.div
                      style={{
                        backgroundColor: color('background', 'muted'),
                        padding: '8px 16px',
                        margin: '-8px -8px 6px -8px',
                        borderBottom: border(),
                      }}
                    >
                      <Text weight="strong">
                        {format(day, 'd')} {format(displayMonth, 'MMMM yyyy')}
                      </Text>
                    </styled.div>
                    {dayDates.map((_: { title?: string }, i) => (
                      <Dropdown.Item
                        key={i}
                        onClick={() => {
                          console.log('Snurp clicked')
                        }}
                      >
                        {_[labelField]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Items>
                </Dropdown.Root>
              )}
            </Stack>
          )
        })}
      </styled.div>
    </styled.div>
  )
}
