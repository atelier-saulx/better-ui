import * as React from 'react'
import type { Meta } from '@storybook/react'
import {
  Layout,
  Page,
  Header,
  Sidebar,
  IconSettings,
  IconUsers,
  IconViewBoxes,
  Text,
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
  return (
    <Page>
      {Array.from({ length: 30 }).map((_, i) => (
        <Text
          key={i}
          variant="body-strong"
          style={{ fontSize: 64, lineHeight: '64px' }}
        >
          Page A content
        </Text>
      ))}
    </Page>
  )
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

      {page === 'x' && <Page>nested x</Page>}
      {page === 'y' && <Page>nested y</Page>}
    </>
  )
}

const PageC = () => {
  return <Page>page C content</Page>
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
          { label: 'Overview', value: 'a', prefix: <IconViewBoxes /> },
          { label: 'Users', value: 'b', prefix: <IconUsers /> },
          { label: 'Settings', value: 'c', prefix: <IconSettings /> },
        ]}
        value={page}
        onValueChange={(newValue) => {
          setPage(newValue)

          // if the new value is in this list then we close the sidebar otherwise open
          // (page b has a nested sidebar, others don't)
          setOpen(!['b'].includes(newValue))
        }}
        open={open}
        onOpenChange={setOpen}
      />

      {page === 'a' && <PageA />}
      {page === 'b' && <PageB />}
      {page === 'c' && <PageC />}
    </Layout>
  )
}
