import * as React from 'react'
import {
  Sidebar,
  IconViewBoxes,
  IconEdit,
  IconUsers,
  IconAlert,
  Badge,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import { BasedLogoWithText } from '../Icons/extras.js'

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  const [v, setV] = React.useState('overview')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
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
    </div>
  )
}

export const Logo = () => {
  const [v, setV] = React.useState('overview')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
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
    </div>
  )
}

export const Collapsable = () => {
  const [v, setV] = React.useState('overview')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
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
    </div>
  )
}

export const Groups = () => {
  const [v, setV] = React.useState('overview')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
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
    </div>
  )
}
