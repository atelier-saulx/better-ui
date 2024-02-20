import React from 'react'
import { Calendar } from '../../index.js'
import type { Meta } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'
import { format } from 'date-fns'

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
  // const { data: fakedata, loading } = useQuery('fakedata', {
  //   arraySize: 2,
  //   id: '',
  //   // src: '',
  //   // status: '',
  //   title: '',
  //   // number: '',
  //   // name: '',
  //   // price: '',
  //   // color: '',
  //   createdAt: '',
  //   updatedAt: '',
  // })

  // if (loading) {
  //   return null
  // }

  let fakedata = []

  fakedata.push({
    id: 'XXXX',
    title: 'Snurp the snurp',
    createdAt: 1708364692974,
    updatedAt: 1708515134327,
  })

  fakedata.push({
    id: 'FFFFf',
    title: 'Flapper de flaape',
    createdAt: 1706664692974,
    updatedAt: 1709915134327,
  })

  console.log('fake data --> from function 🍝', fakedata)

  const startDate = Number(format(new Date('December 17, 2022 03:24:00'), 'T'))
  const endDate = Number(format(new Date('March 17, 2024 03:24:00'), 'T'))

  return (
    <Calendar
      data={fakedata}
      labelField="title"
      timeStartField="createdAt"
      timeEndField="updatedAt"
      view="week"
      onClick={() => console.log('hellow')}
      startRange={startDate}
      endRange={endDate}
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
      timeStartField="updatedAt"
      view="month"
    />
  )
}
