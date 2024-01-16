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

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Sidebar
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

export const WithGroups = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Sidebar
        data={{
          Database: [
            { label: 'Overview', value: 'overview', prefix: <IconViewBoxes /> },
            { label: 'Content', value: 'content', prefix: <IconEdit /> },
          ],
          Other: [{ label: 'Users', value: 'users', prefix: <IconUsers /> }],
        }}
      />
    </div>
  )
}
