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
      <Sidebar value={active} onValueChange={setActive}>
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
      <Sidebar value={active} onValueChange={setActive}>
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

export const Multiple = () => {
  const [active, setActive] = React.useState(null)
  const [open, setOpen] = React.useState(true)

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex' }}>
      <Sidebar
        value={active}
        onValueChange={(newActive) => {
          if (['complex'].includes(newActive)) {
            setOpen(false)
          } else {
            setOpen(true)
          }

          setActive(newActive)
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <SidebarItem value="simple" icon={<IconLayerThree />}>
          Simple page
        </SidebarItem>
        <SidebarItem value="complex" icon={<IconViewDashboard />}>
          Complex page
        </SidebarItem>
      </Sidebar>

      {active === 'simple' && <SimplePage />}
      {active === 'complex' && <ComplexPage />}
    </div>
  )
}

const ComplexPage = () => {
  const [active, setActive] = React.useState('one')

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar value={active} onValueChange={setActive} collapsable={false}>
        <SidebarItem value="one" icon={<IconUsers />}>
          Nested page #1
        </SidebarItem>
        <SidebarItem value="two" icon={<IconSettings />}>
          Nested page #2
        </SidebarItem>
      </Sidebar>

      {active === 'one' && (
        <div style={{ padding: 32 }}>complex one content</div>
      )}
      {active === 'two' && (
        <div style={{ padding: 32 }}>complex two content</div>
      )}
    </div>
  )
}

const SimplePage = () => {
  return <div style={{ padding: 32 }}>simple page content</div>
}
