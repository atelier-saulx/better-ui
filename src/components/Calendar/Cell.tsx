import React from 'react'
import { Stack, Text, color, border } from '../../index.js'
import { styled } from 'inlines'
import { MoreButton } from './MoreButton.js'
import { isSameDay, isSameMonth, format } from 'date-fns'

export const Cell = ({
  day,
  idx,
  displayMonth,
  dayDates,
  labelField,
  view,
}) => {
  return (
    <Stack
      direction="column"
      key={day.toISOString()}
      style={{
        height: view === 'month' ? 124 : 420,
        aspectRatio: view === 'month' ? 1 : 0.33,
        borderTop: border(),
        borderRight: border(),
        borderBottomRightRadius: idx === 34 ? 8 : 0,
        position: 'relative',
        padding: view === 'month' ? '26px 8px 26px 8px' : '12px 8px',
        display: 'block',
      }}
      gap={2}
      grid
    >
      {isSameDay(day, Date.now()) && view === 'month' ? (
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
        view === 'month' && (
          <Text
            color="secondary"
            style={{ position: 'absolute', right: 8, top: 3 }}
          >
            {isSameMonth(day, displayMonth) && format(day, 'd')}
          </Text>
        )
      )}

      {dayDates.map((item: { title?: string }, idx) =>
        idx < 4 ? (
          <styled.div
            key={idx}
            onClick={() => console.log('clicked ->', item[labelField])}
          >
            <Text
              singleLine={view === 'month'}
              style={{
                fontSize: 13,
                // marginBottom: view === 'month' ? 2 : 7,
                marginBlockEnd: view === 'month' ? '0px' : '4px',
                marginBlockStart: '0px',
                lineHeight: '17px',
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
        <MoreButton
          view={view}
          day={day}
          dayDates={dayDates}
          displayMonth={displayMonth}
          labelField={labelField}
        />
      )}
    </Stack>
  )
}
