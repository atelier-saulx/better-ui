import React from 'react'
import { Calendar } from '../../index.js'
import type { Meta } from '@storybook/react'
import { fakeDate } from './fakeData.js'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'demo',
  project: 'demo',
  env: 'production',
})

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  const { data: fakedata, loading } = useQuery('fakedata')

  console.log(fakedata)

  return (
    <Calendar
      data={fakeDate}
      labelField="name"
      //timestampField="updatedAt"
      view="month"
    />
  )
}
