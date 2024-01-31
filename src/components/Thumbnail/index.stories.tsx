import * as React from 'react'
import { Thumbnail, IconBorderLeft, Stack } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { faker } from '@faker-js/faker'

const meta: Meta<typeof Thumbnail> = {
  title: 'Atoms/Thumbnail',
  component: Thumbnail,
}

export default meta

export const Image: StoryObj<typeof Thumbnail> = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    size: 'large',
    shape: 'square',
    color: 'informative',
  },
}

export const Icon: StoryObj<typeof Thumbnail> = {
  args: {
    // src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //  text: 'flappie',
    size: 'large',
    shape: 'circle',
    icon: <IconBorderLeft />,
    color: 'informative-muted',
  },
}

export const Placeholder: StoryObj<typeof Thumbnail> = {
  args: {
    text: 'AB',
    size: 'large',
    shape: 'circle',
    color: 'positive-muted',
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

const facesNames = new Array(100).fill(null).map(() => ({
  src: faker.image.avatar(),
  id: faker.string.uuid().slice(0, 8),
  description: faker.lorem.words({ min: 0, max: 10 }),
  firstName: faker.person.firstName(),
  createdAt: faker.date.recent().valueOf(),
  lastUpdated: faker.date.recent().valueOf(),
  powerTime: faker.date.recent().valueOf(),
  city: faker.location.city(),
}))

export const Gallery = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return <Thumbnail text={v.firstName} key={v.id} />
      })}
    </Stack>
  )
}

export const GalleryMuted = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return <Thumbnail color="auto-muted" text={v.firstName} key={v.id} />
      })}
    </Stack>
  )
}

export const GalleryMutedOutline = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
        return (
          <Thumbnail outline color="auto-muted" text={v.firstName} key={v.id} />
        )
      })}
    </Stack>
  )
}

export const GalleryMutedOutlineCircle = () => {
  return (
    <Stack grid>
      {facesNames.map((v) => {
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
