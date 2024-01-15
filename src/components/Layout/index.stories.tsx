import * as React from 'react'
import type { Meta } from '@storybook/react'
import {
  Layout,
  LayoutContent,
  Header,
  Sidebar,
  IconSettings,
  IconUsers,
  IconViewBoxes,
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
      <Sidebar
        data={[
          { label: 'Nested X', value: 'x' },
          { label: 'Nested Y', value: 'y' },
        ]}
        value={page}
        onValueChange={setPage}
        collapsable={false}
      />

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
  const [open, setOpen] = React.useState(true)

  return (
    <Layout
      header={
        <Header
          logo={<div>Logo</div>}
          navigation={<div>navigation items</div>}
        />
      }
    >
      <Sidebar
        data={[
          { label: 'Overview', value: 'a', icon: <IconViewBoxes /> },
          { label: 'Users', value: 'b', icon: <IconUsers /> },
          { label: 'Settings', value: 'c', icon: <IconSettings /> },
        ]}
        value={page}
        onValueChange={(newValue) => {
          setPage(newValue)

          // if the new value is in this list then we close the sidebar otherwise open
          // (page b has a nested sidebar, others don't)
          setOpen(!['b'].includes(newValue))
        }}
        collapsable={false}
        open={open}
        onOpenChange={setOpen}
      />

      {page === 'a' && <PageA />}
      {page === 'b' && <PageB />}
      {page === 'c' && <PageC />}
    </Layout>
  )
}
