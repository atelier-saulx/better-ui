import React from 'react'
import { styled } from 'inlines'
import { border, color, hashNonSemanticColor } from '../../utils/colors.js'
import { format } from 'date-fns'
import { Text } from '../../index.js'

export const WeekDayColumn = ({
  dayDates,
  day,
  labelField,
  timeStartField,
  timeEndField,
  onClick,
}) => {
  return (
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
        let itemsInThisHour = dayDates?.filter(
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

                console.log(
                  'hours, minutes',
                  durationTime,
                  durationTimeInHours,
                  durationTimeInMinutes,
                  item,
                )
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
                  onClick={onClick}
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
  )
}
