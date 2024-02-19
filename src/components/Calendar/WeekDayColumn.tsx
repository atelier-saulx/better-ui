import React from 'react'
import { styled } from 'inlines'
import { border, color } from '../../utils/colors.js'
import {
  isSameDay,
  isSameMonth,
  startOfDay,
  format,
  millisecondsToMinutes,
} from 'date-fns'
import { Text, Stack } from '../../index.js'

const StyledGridLine = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  height: 1,
  backgroundColor: color('border', 'default'),
})

export const WeekDayColumn = ({
  dayDates,
  day,
  labelField,
  timestampField,
}) => {
  console.log('dayDates', dayDates)
  console.log('DAY', day)

  // all week dates // now check if its is
  console.log('TOTAL MINUTES THIS DAY', format(1708416613118, 'm'))

  console.log('Start of DAY ->', format(startOfDay(day), 'T'))

  let startOfThisDayMs: number = Number(format(startOfDay(day), 'T'))

  return (
    <styled.div
      style={{
        height: 1440,
        borderRight: border(),
        borderTop: border(),
        position: 'relative',
      }}
    >
      {/* {format(1708416613118, 'HH:mm')} */}

      {dayDates?.map((item, idx) => {
        let miliSecondsOnThisDay = item[timestampField] - startOfThisDayMs
        let totalMinutesOnThisDay = millisecondsToMinutes(miliSecondsOnThisDay)

        return (
          <Stack
            gap={8}
            style={{ position: 'absolute', top: `${totalMinutesOnThisDay}px` }}
          >
            <Text variant="caption">
              {format(item[timestampField], 'HH:mm')}
            </Text>
            <Text singleLine>{item[labelField]}</Text>
          </Stack>
        )
      })}

      {/* grid */}
      {[...Array(24).keys()].map((_, idx) => (
        <StyledGridLine style={{ top: `${60 * idx}px` }} />
      ))}
    </styled.div>
  )
}
