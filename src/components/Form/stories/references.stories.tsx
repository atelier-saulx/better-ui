import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import { faker } from '@faker-js/faker'

const meta = {
  title: 'Form/References',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

const faces = new Array(50).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
}))

const facesNames = new Array(50).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
  description: faker.lorem.words({ min: 0, max: 10 }),
  firstName: faker.person.firstName(),
  createdAt: faker.date.recent().valueOf(),
  lastUpdated: faker.date.recent().valueOf(),
  powerTime: faker.date.recent().valueOf(),
  city: faker.location.city(),
}))

const facesLess = new Array(20).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
  name: faker.person.firstName(),
}))

const getRandomRef = () => {
  const id = faker.string.uuid().slice(0, 8)
  const choices = [
    {
      id,
      src: faker.image.avatar(),
      name: faker.person.fullName(),
    },
    { id, title: faker.lorem.sentence(3) },
    id,
    {
      id,
      status: faker.lorem.words(1),
      title: faker.lorem.sentence(3),
      src: faker.image.avatar(),
      number: faker.number.int(10),
      name: faker.person.fullName(),
    },
    {
      id,
      src: faker.image.avatar(),
      name: faker.person.fullName(),
      status: faker.lorem.words(1),
    },
  ]
  return choices[Math.floor(Math.random() * choices.length)]
}

export const References = () => {
  const { open } = Modal.useModal()
  return (
    <Form
      values={{
        refTags: faces,
        people: facesNames,
        nonSortablePeople: facesNames.slice(0, 5),
        peopleLess: facesLess,
        refs: [
          'x211212',
          { id: '212cwcwe', name: 'my snurp' },
          {
            id: '212cwcwe',
            src: 'https://images.secretlab.co/theme/common/collab_pokemon_catalog_charizard-min.png',
          },
          { id: '212cwcwe' },
        ],
      }}
      onClickReference={async ({ path }) => {
        open(({ close }) => {
          return (
            <Modal onConfirm={() => close(getRandomRef())}>
              <Modal.Title>Go to "{path.join('/')}"</Modal.Title>
            </Modal>
          )
        })
      }}
      onSelectReference={async ({ path }) => {
        return open(({ close }) => {
          return (
            <Modal variant="large" onConfirm={() => close(getRandomRef())}>
              <Modal.Title>REFERENCE! {path.join('/')}</Modal.Title>
            </Modal>
          )
        })
      }}
      onSelectReferences={async ({ path }) => {
        return open(({ close }) => {
          const newItems: any[] = []
          const len = ~~(Math.random() * 100)
          for (let i = 0; i < len; i++) {
            newItems.push(getRandomRef())
          }
          return (
            <Modal variant="large" onConfirm={() => close(newItems)}>
              <Modal.Title>REFERENCE! {path.join('/')}</Modal.Title>
            </Modal>
          )
        })
      }}
      fields={{
        people: {
          sortable: true,
          title: 'People time',
          type: 'references',
        },
        nonSortablePeople: {
          title: 'People time (no drag)',
          type: 'references',
        },
        ref: {
          title: 'Single reference',
          type: 'reference',
          description: 'A single ref',
        },
        logo: {
          title: 'Single reference fronm file',
          type: 'reference',
          description: 'A single ref',
          allowedTypes: ['file'],
        },
        refTags: {
          title: 'Multi references',
          type: 'references',
          sortable: true,
          description: 'Multi ref',
        },
        peopleLess: {
          title: 'People',
          type: 'references',
        },

        refs: {
          title: 'Multi references',
          type: 'references',
          description: 'Multi ref',
          sortable: true,
        },
        object: {
          title: 'Refs in an object',
          type: 'object',
          description: 'Some refs',
          properties: {
            ref: {
              title: 'Single reference',
              type: 'reference',
              description: 'A single ref',
            },
            refs: {
              title: 'Multi references',
              type: 'references',
              description: 'Multi ref',
            },
          },
        },
      }}
      onChange={(values, changed, checksum, based) => {
        console.info({ values, changed, checksum, based })
      }}
    />
  )
}
