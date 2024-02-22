import React from 'react'
import { Text, border, color, Stack, boxShadow } from '../../index.js'
import { format, isSameDay } from 'date-fns'
import { styled } from 'inlines'

export const SubHeader = ({ view, dayDates }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        border: border(),
        // boxShadow: boxShadow('elevation'),
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginBottom: '-1px',
      }}
    >
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
        <Stack
          justify="center"
          key={index}
          gap={12}
          style={{
            padding: '8px',
            height: 48,
            borderRight: index < 6 ? border() : 'none',
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
    </styled.div>
  )
}
