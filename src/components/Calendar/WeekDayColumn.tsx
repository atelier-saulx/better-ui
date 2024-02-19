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
  timeStartField,
  timeEndField,
  onClick,
}) => {
  console.log('dayDates', dayDates)
  console.log('DAY', day)
  console.log('TOTAL MINUTES THIS DAY', format(1708416613118, 'm'))
  console.log('Start of DAY ->', format(startOfDay(day), 'T'))

  let startOfThisDayMs: number = Number(format(startOfDay(day), 'T'))

  // see if fields are 15 min from eachother have overlap

  // let currentTime = Number(format(new Date(), 'T'))
  // let currentTimeOnThisDayInMinutes = millisecondsToMinutes(
  //   currentTime - startOfThisDayMs,
  // )

  return (
    <styled.div
      style={{
        height: 1440,
        borderRight: border(),
        borderTop: border(),
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'hidden',
      }}
    >
      {[...Array(24).keys()].map((_, idx) => {
        let itemsInThisHour = dayDates?.filter(
          (item) => Number(format(item[timeStartField], 'H')) === idx,
        )

        return (
          <styled.div
            style={{
              borderBottom: border(),
              height: 60,
              width: '100%',
              display: 'flex',
              gap: 2,
            }}
          >
            {itemsInThisHour.map((item) => (
              <styled.div
                style={{
                  marginTop: `${format(item[timeStartField], 'm')}px`,
                  display: 'flex',
                  backgroundColor: color('non-semantic-color', 'blue-soft'),
                  borderRadius: 4,
                  padding: '0px 3px',
                  height: itemsInThisHour.length > 1 ? '44px' : '24px',
                  width:
                    itemsInThisHour.length > 1
                      ? `${100 / itemsInThisHour.length}%`
                      : '100%',
                  flexDirection: itemsInThisHour.length > 1 ? 'column' : 'row',
                  gap: itemsInThisHour.length > 1 ? 0 : 4,
                  alignItems:
                    itemsInThisHour.length > 1 ? 'flex-start' : 'center',
                  '&:hover': {
                    backgroundColor: color(
                      'non-semantic-color',
                      'aquamarine-soft',
                    ),
                  },
                }}
                onClick={onClick}
              >
                <Text
                  variant="caption"
                  style={{
                    color: color('interactive', 'primary'),
                    marginBottom: itemsInThisHour.length > 1 ? '-4px' : 0,
                  }}
                >
                  {format(item[timeStartField], 'HH:mm')}
                </Text>
                <Text
                  singleLine
                  style={{ '& p': { fontSize: '12px !important' } }}
                >
                  {item[labelField]}
                </Text>
              </styled.div>
            ))}
          </styled.div>
        )
      })}

      {/* {dayDates?.map((item, idx) => {
        let miliSecondsOnThisDay = item[timeStartField] - startOfThisDayMs
        let totalMinutesOnThisDay = millisecondsToMinutes(miliSecondsOnThisDay)

        return (
          <Stack
            key={idx}
            gap={6}
            style={{
              position: 'absolute',
              top: `${totalMinutesOnThisDay}px`,
              padding: '0px 4px',
              borderRadius: '4px',
              margin: 2,
              backgroundColor: color('non-semantic-color', 'blue-soft'),
            }}
            onClick={onClick}
          >
            <Text
              variant="caption"
              style={{ color: color('non-semantic-color', 'blue') }}
            >
              {format(item[timeStartField], 'HH:mm')}
            </Text>
            <Text singleLine style={{ '& p': { fontSize: '12px !important' } }}>
              {item[labelField]}
            </Text>
          </Stack>
        )
      })} */}

      {/* grid */}
      {/* {[...Array(24).keys()].map((_, idx) => (
        <StyledGridLine style={{ top: `${60 * idx}px` }} />
      ))} */}

      {/* current time line*/}
      {/* <styled.div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${currentTimeOnThisDayInMinutes}px`,
          height: 1,
          backgroundColor: color('border', 'error'),
        }}
      ></styled.div> */}
    </styled.div>
  )
}
