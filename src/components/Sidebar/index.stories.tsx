import * as React from 'react'
import {
  Sidebar,
  SidebarGroup,
  SidebarItem,
  IconViewBoxes,
  IconChartBar,
  IconEdit,
  IconUsers,
  IconSettings,
  IconAttachment,
  IconLayerThree,
  IconViewDashboard,
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
  const [active, setActive] = React.useState('overview')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Sidebar value={active} onChange={setActive} collapsed>
        <SidebarItem value="overview" icon={<IconViewBoxes />}>
          Overview
        </SidebarItem>
        <SidebarItem value="content" icon={<IconEdit />}>
          Content
        </SidebarItem>
        <SidebarItem value="users" icon={<IconUsers />}>
          Users
        </SidebarItem>
        <SidebarItem value="stats" icon={<IconChartBar />}>
          Statistics
        </SidebarItem>
        <SidebarItem value="about">About</SidebarItem>
        <SidebarItem value="blog">Blog</SidebarItem>
        <SidebarItem value="contact">Contact</SidebarItem>
      </Sidebar>
    </div>
  )
}

export const WithGroups = () => {
  const [active, setActive] = React.useState('overview')

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Sidebar value={active} onChange={setActive}>
        <SidebarGroup title="Database">
          <SidebarItem value="overview" icon={<IconViewDashboard />}>
            Overview
          </SidebarItem>
          <SidebarItem value="schema" icon={<IconLayerThree />}>
            Schema builder
          </SidebarItem>
          <SidebarItem value="content" icon={<IconEdit />}>
            Content
          </SidebarItem>
          <SidebarItem value="assets" icon={<IconAttachment />}>
            Assets
          </SidebarItem>
        </SidebarGroup>

        <SidebarGroup title="General">
          <SidebarItem value="settings" icon={<IconSettings />}>
            Settings
          </SidebarItem>
        </SidebarGroup>
      </Sidebar>
    </div>
  )
}
