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

  let fakedata = []

  // if (loading) {
  //   return null
  // }

  fakedata.push({
    id: 'XXXX',
    title: 'Snurp the snurp',
    createdAt: 1708364692974,
    updatedAt: 1708515134327,
  })

  console.log('fake data --> from function 🍝', fakedata)

  return (
    <Calendar
      data={fakedata}
      labelField="title"
      timeStartField="createdAt"
      timeEndField="updatedAt"
      view="week"
      onClick={() => console.log('hellow')}
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
