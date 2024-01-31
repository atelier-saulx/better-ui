import * as React from 'react'
import {
  Sidebar,
  IconViewBoxes,
  IconEdit,
  IconUsers,
  IconAlert,
  Badge,
  color,
  IconBased,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import { BasedLogoWithText } from '../Icons/extras.js'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            background: color('background', 'muted'),
            height: '300px',
            width: '100%',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default meta

export const Default = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      value={v}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
          suffix: <Badge color="informative-muted">12</Badge>,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Small = () => {
  const [v, setV] = React.useState('overview')
  return (
    <Sidebar
      size="small"
      value={v}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const SmallCollapsed = () => {
  const [v, setV] = React.useState('overview')
  return (
    <Sidebar
      size="small"
      value={v}
      open={false}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Logo = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      value={v}
      onValueChange={setV}
      header={<BasedLogoWithText />}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
          suffix: <Badge color="informative-muted">12</Badge>,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Collapsable = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      collapsable
      value={v}
      onValueChange={setV}
      data={[
        {
          label: 'Overview',
          value: 'overview',
          prefix: <IconViewBoxes />,
          suffix: <Badge color="informative-muted">12</Badge>,
        },
        {
          label: 'Content',
          value: 'content',
          prefix: <IconEdit />,
          suffix: <IconAlert />,
        },
        { label: 'Users', value: 'users', prefix: <IconUsers /> },
      ]}
    />
  )
}

export const Groups = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      value={v}
      onValueChange={setV}
      header={<BasedLogoWithText />}
      data={{
        Group1: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Item ' + i,
          value: 'item' + i,
        })),
        Group2: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Group 2 Item ' + i,
          value: 'g2item' + i,
        })),
      }}
    />
  )
}

export const GroupsCollapsed = () => {
  const [v, setV] = React.useState('overview')

  return (
    <Sidebar
      open={false}
      value={v}
      onValueChange={setV}
      HeaderComponent={({ open }) =>
        open ? <BasedLogoWithText /> : <IconBased />
      }
      data={{
        Group1: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Item ' + i,
          value: 'item' + i,
          prefix: i,
        })),
        Group2: Array.from({ length: 16 }).map((_, i) => ({
          label: 'Group 2 Item ' + i,
          value: 'g2item' + i,
        })),
      }}
    />
  )
}
