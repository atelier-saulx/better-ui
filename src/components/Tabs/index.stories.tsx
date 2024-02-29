import * as React from 'react'
import { Tabs } from '../../index.js'
import type { Meta } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
}

export default meta

export const Default = () => {
  const [tab, setTab] = React.useState('overview')

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      data={[
        { label: 'Overview', value: 'overview' },
        { label: 'Integrations', value: 'integrations' },
        { label: 'Settings', value: 'settings' },
      ]}
    />
  )
}
