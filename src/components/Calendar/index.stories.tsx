import React from 'react'
import { Calendar } from '../../index.js'
import type { Meta } from '@storybook/react'
import { fakeDate } from './fakeData.js'
import { Page } from '../../index.js'

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  decorators: [
    (Story) => (
      <Page
        style={{
          width: '100%',
          height: '50vh',
        }}
      >
        <Story />
      </Page>
    ),
  ],
}

export default meta

export const Default = () => {
  return (
    <Calendar data={fakeDate} labelField="name" timestampField="updatedAt" />
  )
}
