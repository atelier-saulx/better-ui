import * as React from 'react'
import type { Meta } from '@storybook/react'
import {
  Layout,
  LayoutContent,
  Header,
  Sidebar,
  SidebarItem,
} from '../../index.js'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const PageA = () => {
  return <LayoutContent>page A content</LayoutContent>
}

const PageB = () => {
  const [page, setPage] = React.useState('x')

  return (
    <>
      <Sidebar value={page} onValueChange={setPage} collapsable={false}>
        <SidebarItem value="x">Nested X</SidebarItem>
        <SidebarItem value="y">Nested Y</SidebarItem>
      </Sidebar>

      {page === 'x' && <LayoutContent>nested x</LayoutContent>}
      {page === 'y' && <LayoutContent>nested y</LayoutContent>}
    </>
  )
}

const PageC = () => {
  return <LayoutContent>page C content</LayoutContent>
}

export const Default = () => {
  const [page, setPage] = React.useState('a')

  return (
    <Layout
      header={
        <Header
          logo={<div>Logo</div>}
          navigation={<div>navigation items</div>}
        />
      }
    >
      <Sidebar value={page} onValueChange={setPage} collapsable={false}>
        <SidebarItem value="a">Page A</SidebarItem>
        <SidebarItem value="b">Page B</SidebarItem>
        <SidebarItem value="c">Page C</SidebarItem>
      </Sidebar>

      {page === 'a' && <PageA />}
      {page === 'b' && <PageB />}
      {page === 'c' && <PageC />}
    </Layout>
  )
}
