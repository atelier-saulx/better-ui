import * as React from 'react'
import { Form, Modal } from '../../../index.js'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Form/References',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Modal.Provider>
          <Story />
        </Modal.Provider>
      </Provider>
    ),
  ],
}

export default meta

export const References = () => {
  const { open } = Modal.useModal()

  const { data: faces } = useQuery('fakedata', {
    arraySize: 50,
    src: '',
    id: '',
  })

  const { data: facesNames, loading } = useQuery('fakedata', {
    arraySize: 50,
    src: '',
    id: '',
    description: '',
    firstName: '',
    createdAt: '',
    lastUpdated: '',
    powerTime: '',
    city: '',
  })

  const { data: facesLess } = useQuery('fakedata', {
    arraySize: 20,
    src: '',
    id: '',
    name: '',
  })

  const { data: choices } = useQuery('fakedata', {
    arraySize: 200,
    id: '',
    title: '',
    name: '',
    src: '',
    status: '',
    number: '',
  })

  if (loading) {
    return null
  }

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
        return open(({ close }) => {
          const newFaces: any[] = []
          const len = ~~(Math.random() * 100)
          for (let i = 0; i < len; i++) {
            newFaces.push(faces[i])
          }

          return (
            <Modal onConfirm={() => close(newFaces)}>
              <Modal.Title>Go to "{path.join('/')}"</Modal.Title>
            </Modal>
          )
        })
      }}
      onSelectReference={async ({ path }) => {
        return open(({ close }) => {
          return (
            <Modal variant="large" onConfirm={() => close(choices[0])}>
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
            newItems.push(choices[i])
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
