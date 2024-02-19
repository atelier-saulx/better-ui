import React from 'react'
import { Text, border, color, Stack } from '../../index.js'
import { format, isSameDay } from 'date-fns'

export const SubHeader = ({ view, dayDates }) => {
  return (
    <>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
        <Stack
          justify="center"
          key={index}
          gap={12}
          style={{
            padding: '8px',
            height: 48,
            borderRight: border(),
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderTopRightRadius: index === 6 ? 8 : 0,
            backgroundColor: color('background', 'muted'),
          }}
        >
          <Text weight="strong">{day} </Text>
          {view === 'week' && (
            <Text
              color="secondary"
              style={{
                color:
                  isSameDay(Number(format(dayDates[index], 'T')), Date.now()) &&
                  color('interactive', 'primary'),
              }}
              weight="strong"
            >
              {format(dayDates[index], 'd')}
            </Text>
          )}
        </Stack>
      ))}
    </>
  )
}
