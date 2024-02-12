import React from 'react'
import { Calendar } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import based from '@based/client'
import { useQuery, Provider } from '@based/react'
import { faker } from '@faker-js/faker'
import { border, borderRadius, Page } from '../../index.js'

const meta: Meta<typeof Calendar> = {
  title: 'Atoms/Calendar',
  decorators: [
    (Story) => (
      <Page
        style={{
          width: '100%',
          height: '50vh',
          // border: border(),
          // borderRadius: borderRadius('medium'),
        }}
      >
        <Story />
      </Page>
    ),
  ],
}

export default meta

const data = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

// INPUT
// key: value
// timestamp
//
// [{
//   title / name : 'flaop',
//   / created at / ts: 1707737103235
// }]

// determine

export const Default = () => {
  console.log('FAKER DATA', data)

  return <Calendar data={data} />
}
