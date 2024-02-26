import React, { useEffect } from 'react'
import { styled } from 'inlines'
import { border, color, hashNonSemanticColor } from '../../utils/colors.js'
import {
  format,
  isSameDay,
  endOfDay,
  startOfDay,
  formatDuration,
  intervalToDuration,
} from 'date-fns'
import { Text } from '../../index.js'

export const WeekDayColumn = ({
  dayDates,
  day,
  labelField,
  timeStartField,
  timeEndField,
  onClick,
  displayMonth,
}) => {
  // item + next day is a thing set end time to end of day
  // if(item[labelField] )

  // check if the next dayDate has this field , then set end time to end

  // console.log(dayDates, 'DayDatES')
  // console.log(day)

  // for (let i = 0; i < dayDates.length; i++) {
  //   if (isSameDay(day, dayDates[i][timeEndField])) {
  //     dayDates[i][timeStartField] = Number(format(startOfDay(day), 'T'))
  //   }
  //   if (isSameDay(day, dayDates[i][timeStartField])) {
  //     dayDates[i][timeEndField] = Number(
  //       format(endOfDay(dayDates[i][timeEndField]), 'T'),
  //     )
  //   } else if (!isSameDay(day, dayDates[i][timeStartField])) {
  //     dayDates[i][timeStartField] = Number(format(startOfDay(day), 'T'))
  //   }
  //   // else if (isSameDay(day, dayDates[i][timeEndField])) {
  //   //   dayDates[i][timeStartField] = Number(
  //   //     format(startOfDay(dayDates[i][timeEndField]), 'T'),
  //   //   )
  //   // }
  //   // else if (isSameDay(day, dayDates[i][timeEndField])) {
  //   //   dayDates[i][timeEndField] = dayDates[i][timeEndField]
  //   // }
  // }

  // let newDates = dayDates?.map((item) => {
  //   // endField day
  //   if (
  //     // in between days?
  //     !isSameDay(day, item[timeEndField]) &&
  //     !isSameDay(day, item[timeStartField])
  //   ) {
  //     item[timeStartField] = Number(format(startOfDay(day), 'T'))
  //     item[timeEndField] = Number(format(endOfDay(day), 'T'))
  //     return item
  //   } else if (
  //     isSameDay(day, item[timeEndField]) &&
  //     !isSameDay(day, item[timeStartField])
  //   ) {
  //     item[timeStartField] = Number(format(startOfDay(day), 'T'))

  //     return item
  //   }
  //   // startDay
  //   else if (
  //     !isSameDay(day, item[timeEndField]) &&
  //     isSameDay(day, item[timeStartField])
  //   ) {
  //     item[timeEndField] = Number(format(endOfDay(day), 'T'))
  //     return item
  //   }
  //   // else {
  //   //   return item
  //   // }
  // })

  // console.log(dayDates, 'new DATES??')
  console.log('--> ', dayDates)
  console.log('dsaag ', day)

  const [tempDayDates, setTempDayDates] = React.useState(dayDates)

  // if (tempDayDates && displayMonth) {
  //   for (let i = 0; i < tempDayDates.length; i++) {
  //     if (
  //       isSameDay(tempDayDates[i][timeStartField], day) &&
  //       !isSameDay(tempDayDates[i][timeEndField], day)
  //     ) {
  //       console.log('START DAY 🧰', day)
  //     } else if (
  //       !isSameDay(tempDayDates[i][timeStartField], day) &&
  //       isSameDay(tempDayDates[i][timeEndField], day)
  //     ) {
  //       console.log('END DAY 🔫', day)
  //       tempDayDates[i][timeStartField] = startOfDay(day)
  //     }
  //   }
  // }

  let arr = []

  for (let i = 0; i < dayDates.length; i++) {
    if (
      isSameDay(dayDates[i][timeStartField], day) &&
      !isSameDay(dayDates[i][timeEndField], day)
    ) {
      console.log('START DAY 🧰', day)
      arr.push({ ...dayDates[i] })
    } else if (
      !isSameDay(dayDates[i][timeStartField], day) &&
      isSameDay(dayDates[i][timeEndField], day)
    ) {
      console.log('END DAY 🔫', day)
      // dayDates[i][timeStartField] = startOfDay(day)
      arr.push({ ...dayDates[i], [timeStartField]: startOfDay(day) })
    } else {
      arr.push({ ...dayDates[i] })
    }
  }

  return displayMonth ? (
    <styled.div
      style={{
        height: 1440,
        borderRight: border(),
        borderTop: border(),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {[...Array(24).keys()].map((_, idx) => {
        let itemsInThisHour = arr?.filter(
          (item) => Number(format(item[timeStartField], 'H')) === idx,
        )

        return (
          <styled.div
            key={idx}
            style={{
              borderBottom: border(),
              height: 60,
              width: '100%',
              display: 'flex',
              position: 'relative',
              gap: 2,
            }}
          >
            {itemsInThisHour.map((item, idx) => {
              let durationTimeInHours, durationTimeInMinutes
              // if endtime
              if (timeEndField) {
                let durationTime = item[timeEndField] - item[timeStartField]
                durationTimeInHours = format(durationTime, 'k')
                durationTimeInMinutes = format(durationTime, 'm')

                //   console.log(
                //     'hours, minutes',
                //     durationTime,
                //     durationTimeInHours,
                //     durationTimeInMinutes,
                //     item,
                //   )

                // console.log(
                //   'interval to duration',
                //   intervalToDuration({
                //     start: item[timeEndField],
                //     end: item[timeStartField],
                //   }),
                // )
              }

              return (
                <styled.div
                  key={idx}
                  style={{
                    marginTop: `${format(item[timeStartField], 'm')}px`,
                    display: 'flex',
                    backgroundColor: hashNonSemanticColor(
                      item[labelField],
                      true,
                    ),
                    borderRadius: 4,
                    zIndex: 1,
                    padding: '0px 3px',
                    height: timeEndField
                      ? `${(Number(durationTimeInHours) - 1) * 60 + Number(durationTimeInMinutes)}px`
                      : itemsInThisHour.length > 1
                        ? '44px'
                        : '44px',
                    width:
                      itemsInThisHour.length > 1
                        ? `${100 / itemsInThisHour.length}%`
                        : '100%',
                    flexDirection: 'column',
                    gap: itemsInThisHour.length > 1 ? 0 : 4,
                    alignItems: 'flex-start',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: color('interactive', 'primary-muted'),
                    },
                  }}
                  onClick={() => {
                    onClick(item)
                  }}
                >
                  <styled.div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      background: hashNonSemanticColor(item[labelField], false),
                      color: color('background', 'screen'),
                      display: 'flex',
                      borderRadius: 2,
                      padding: '2px 4px',
                      marginBottom: '-4px',
                    }}
                  >
                    <div>{format(item[timeStartField], 'HH:mm')}</div>
                    {timeEndField && (
                      <>
                        {' '}
                        <div> - </div>
                        <div>{format(item[timeEndField], 'HH:mm')}</div>
                      </>
                    )}
                  </styled.div>

                  <Text
                    singleLine
                    style={{ '& p': { fontSize: '12px !important' } }}
                  >
                    {item[labelField]}
                  </Text>
                </styled.div>
              )
            })}

            {format(day, 'EEEEE') === 'M' && (
              <Text
                variant="caption"
                style={{ position: 'absolute', left: '2px', top: '-11px' }}
              >
                {idx}:00
              </Text>
            )}
          </styled.div>
        )
      })}
    </styled.div>
  ) : null
}
