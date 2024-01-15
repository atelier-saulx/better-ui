import * as React from 'react'
import { Sidebar, IconViewBoxes, IconEdit, IconUsers } from '../../index.js'
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
          { label: 'Overview', value: 'overview', icon: <IconViewBoxes /> },
          { label: 'Content', value: 'content', icon: <IconEdit /> },
          { label: 'Users', value: 'users', icon: <IconUsers /> },
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
            { label: 'Overview', value: 'overview', icon: <IconViewBoxes /> },
            { label: 'Content', value: 'content', icon: <IconEdit /> },
          ],
          Other: [{ label: 'Users', value: 'users', icon: <IconUsers /> }],
        }}
      />
    </div>
  )
}
