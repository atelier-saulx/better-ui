import React from 'react'
import { Dropdown, Button, Text, color, border } from '../../index.js'
import { styled } from 'inlines'
import { format } from 'date-fns'

export const MoreButton = ({
  day,
  dayDates,
  displayMonth,
  labelField,
  view,
  onClick,
}) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <Button
          variant="primary-link"
          size="small"
          style={{
            textDecoration: 'none !important',
            position: 'absolute',
            bottom: view === 'week' ? '12px' : '6px',
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
              onClick(_)
            }}
          >
            {_[labelField]}
          </Dropdown.Item>
        ))}
      </Dropdown.Items>
    </Dropdown.Root>
  )
}
