import * as React from 'react'
import { Thumbnail, IconBorderLeft, Stack } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import based from '@based/client'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof Thumbnail> = {
  title: 'Atoms/Thumbnail',
  component: Thumbnail,
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Image: StoryObj<typeof Thumbnail> = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    size: 'large',
    shape: 'square',
    color: 'blue',
  },
}

export const Icon: StoryObj<typeof Thumbnail> = {
  args: {
    // src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // text: 'flappie',
    size: 'large',
    shape: 'circle',
    icon: <IconBorderLeft />,
    color: 'raspberry-soft',
  },
}

export const Placeholder: StoryObj<typeof Thumbnail> = {
  args: {
    text: 'AB',
    size: 'large',
    shape: 'circle',
    // color: 'auto',
    color: 'aquamarine-soft',
    outline: true,
  },
}

export const Counter: StoryObj<typeof Thumbnail> = {
  args: {
    text: 'AB',
    size: 'large',
    shape: 'square',
    count: 8,
  },
}

export const Gallery = () => {
  const { data: facesNames, loading } = useQuery('fakedata', {
    arraySize: 100,
    src: '',
    id: '',
    description: '',
    firstName: '',
    createdAt: '',
    lastUpdated: '',
    powerTime: '',
    city: '',
  })
  return (
    <Stack grid>
      {facesNames?.map((v) => {
        return <Thumbnail outline text={v.firstName} key={v.id} />
      })}
    </Stack>
  )
}

export const GalleryMuted = () => {
  const { data: facesNames, loading } = useQuery('fakedata', {
    arraySize: 100,
    src: '',
    id: '',
    description: '',
    firstName: '',
    createdAt: '',
    lastUpdated: '',
    powerTime: '',
    city: '',
  })
  return (
    <Stack grid>
      {facesNames?.map((v) => {
        return <Thumbnail color="auto-muted" text={v.firstName} key={v.id} />
      })}
    </Stack>
  )
}

export const GalleryMutedOutline = () => {
  const { data: facesNames, loading } = useQuery('fakedata', {
    arraySize: 100,
    src: '',
    id: '',
    description: '',
    firstName: '',
    createdAt: '',
    lastUpdated: '',
    powerTime: '',
    city: '',
  })
  return (
    <Stack grid>
      {facesNames?.map((v) => {
        return (
          <Thumbnail outline color="auto-muted" text={v.firstName} key={v.id} />
        )
      })}
    </Stack>
  )
}

export const GalleryMutedOutlineCircle = () => {
  const { data: facesNames, loading } = useQuery('fakedata', {
    arraySize: 100,
    src: '',
    id: '',
    description: '',
    firstName: '',
    createdAt: '',
    lastUpdated: '',
    powerTime: '',
    city: '',
  })
  return (
    <Stack grid>
      {facesNames?.map((v) => {
        return (
          <Thumbnail
            size="extra-extra-large"
            src={v.src}
            shape="circle"
            outline
            color="auto-muted"
            text={v.firstName}
            key={v.id}
          />
        )
      })}
    </Stack>
  )
}
