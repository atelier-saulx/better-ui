import React from 'react'
import { Stack, Text, color, border } from '../../index.js'
import { styled } from 'inlines'
import { MoreButton } from './MoreButton.js'
import { isSameDay, isSameMonth, format } from 'date-fns'

export const MonthCell = ({
  day,
  idx,
  displayMonth,
  dayDates,
  labelField,
  view,
  onClick,
}) => {
  return (
    <Stack
      direction="column"
      key={day.toISOString()}
      style={{
        aspectRatio: 1,
        height: '100%',
        borderTop: border(),
        borderRight: border(),
        borderBottomRightRadius: idx === 34 ? 8 : 0,
        position: 'relative',
        padding: '26px 8px 26px 8px',
        display: 'block',
      }}
      gap={2}
      grid
    >
      {isSameDay(day, Date.now()) ? (
        <Text
          color="inverted"
          style={{
            position: 'absolute',
            right: 5,
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
        idx < 3 ? (
          <styled.div
            key={idx}
            onClick={() => {
              onClick(item)
            }}
          >
            <Text
              color={isSameMonth(day, displayMonth) ? 'primary' : 'secondary'}
              singleLine
              style={{
                marginBlockEnd: '0px',
                marginBlockStart: '0px',
                lineHeight: '17px',
                cursor: 'pointer',
                '& p': {
                  fontSize: '13px !important',
                },
                '& :hover': {
                  color: `${color('content', 'secondary')} !important`,
                },
                '&:hover': {
                  color: `${color('content', 'secondary')} !important`,
                },
              }}
            >
              {item[labelField]}
            </Text>
          </styled.div>
        ) : null,
      )}
      {dayDates.length > 4 && (
        <MoreButton
          view={view}
          day={day}
          dayDates={dayDates}
          displayMonth={displayMonth}
          labelField={labelField}
          onClick={onClick}
        />
      )}
    </Stack>
  )
}
