import * as React from 'react'
import { Calendar } from '../../index.js'

const meta = {
  title: 'Components/Calendar',
  decorators: [(Story) => <Story />],
}

export default meta

export const Default = () => {
  return (
    <div style={{ height: '80vh' }}>
      <Calendar
        data={[
          // {
          //   start: 'Sat Feb 24 2024 14:35:11 GMT+0000',
          //   end: 'Sat Feb 26 2024 14:35:11 GMT+0000',
          //   label: 'event1',
          // },
          {
            start: 'Sat Feb 24 2024 14:35:11 GMT+0000',
            end: 'Sat Feb 27 2024 12:11 GMT+0000',
            label: 'event2',
          },
          {
            start: 'Sat Feb 23 2024 14:35:11 GMT+0000',
            end: 'Sat Feb 27 2024 16:35:11 GMT+0000',
            label: 'eventXXXXX XXEFAF AFEF',
          },
          {
            //     end: 1710235719058,
            //  end: new Date(1710235719058),
            start: 'Sat Feb 25 2024 16:35:11 GMT+0000',
            label: 'event3',
          },
          // {
          //   start: 'Sat Feb 25 2024 14:35:11 GMT+0000',
          //   end: 'Sat Feb 25 2024 16:35:11 GMT+0000',
          //   label: 'event4',
          // },
          // {
          //   start: 'Sat Feb 25 2024 14:35:11 GMT+0000',
          //   end: 'Sat Feb 25 2024 16:35:11 GMT+0000',
          //   label: 'event5',
          // },
          // {
          //   start: 'Sat Feb 25 2024 14:35:11 GMT+0000',
          //   end: 'Sat Feb 25 2024 16:35:11 GMT+0000',
          //   label: 'event6',
          // },
          // {
          //   start: 'Sat Feb 25 2024 14:35:11 GMT+0000',
          //   end: 'Sat Feb 25 2024 16:35:11 GMT+0000',
          //   label: 'event7',
          // },
          // {
          //   start: 'Sat Feb 25 2024 14:35:11 GMT+0000',
          //   end: 'Sat Feb 25 2024 16:35:11 GMT+0000',
          //   label: 'event8',
          // },
        ]}
        startField="start"
        endField="end"
        labelField="label"
        onItemClick={(item) => {
          console.log('clicked item', item)
        }}
      />
    </div>
  )
}
