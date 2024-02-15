import * as React from 'react'
import {
  Container,
  Thumbnail,
  Button,
  Dropdown,
  Virtualized,
  IconMoreHorizontal,
} from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'inlines'

const meta: Meta<typeof Container> = {
  title: 'Components/Virtualized',
  component: Container,
}

export default meta

export const Default = () => {
  return <styled.div></styled.div>
}
