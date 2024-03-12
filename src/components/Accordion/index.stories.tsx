import * as React from 'react'
import { Accordion } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Accordion> & { description: string } = {
  title: 'Atoms/Accordion',
  description: "L'Accordion pour toi",
  component: Accordion,
}

export default meta

const data = [
  {
    title: 'Accordion item 1',
    description:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
  },
  {
    title: 'Accordion item 2',
    description:
      'Lorem ipsum is een opvultekst die drukkers, zetters, grafisch ontwerpers en dergelijken gebruiken om te kijken hoe een opmaak er grafisch uitziet.',
  },
  {
    title: 'Accordion item 3',
    description:
      "It's all a game of angles. Son of a gun. You can do anything your heart can imagine. You can't make a mistake. Anything that happens you can learn to use - and make something beautiful out of it. We spend so much of our life looking - but never seeing.",
  },
  {
    title: 'Accordion item 4',
    children: (
      <div style={{ background: 'yellow', width: 300, height: 100 }}>
        {' '}
        hallo 🐶
      </div>
    ),
  },
]

export const Default: StoryObj<typeof Accordion> = {
  args: {
    data: data,
  },
}

export const MultiExpand: StoryObj<typeof Accordion> = {
  args: {
    data: data,
    multiExpand: true,
    startOpen: 2,
  },
}
