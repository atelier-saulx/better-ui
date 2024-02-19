import React from 'react'
import { Calendar } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
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
  const { data: fakedata, loading } = useQuery('fakedata', {
    arraySize: 20,
    id: '',
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
    updatedAt: '',
  })

  if (loading) {
    return null
  }

  console.log('fake data --> from function 🍝', fakedata)

  return (
    <Calendar
      data={fakedata}
      labelField="title"
      timestampField="updatedAt"
      view="week"
    />
  )
}

export const WeekView = () => {
  const { data: fakedata, loading } = useQuery('fakedata', {
    arraySize: 20,
    id: '',
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
    updatedAt: '',
  })

  if (loading) {
    return null
  }

  return (
    <Calendar
      data={fakedata}
      labelField="title"
      timestampField="updatedAt"
      view="month"
    />
  )
}
