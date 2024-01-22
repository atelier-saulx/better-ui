import * as React from 'react'
import {
  Header,
  Dropdown,
  Button,
  IconSettings,
  Thumbnail,
  IconLogOut,
  Stack,
} from '../../index.js'
import type { Meta } from '@storybook/react'
import { BasedLogoWithText } from '../Icons/extras.js'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  return (
    <div style={{ width: 1000 }}>
      <Header
        logo={<BasedLogoWithText />}
        navigation={
          <Stack gap={24}>
            <Button size="small" variant="neutral">
              Documentation
            </Button>
            <Dropdown.Root>
              <Dropdown.Trigger>
                <div style={{ cursor: 'pointer' }}>
                  <Thumbnail text="MD" shape="circle" size="small" />
                </div>
              </Dropdown.Trigger>
              <Dropdown.Items>
                <Dropdown.Item icon={<IconSettings />}>Settings</Dropdown.Item>
                <Dropdown.Item icon={<IconLogOut />}>Logout</Dropdown.Item>
              </Dropdown.Items>
            </Dropdown.Root>
          </Stack>
        }
        mobileNavigation={[
          { label: 'Settings', prefix: <IconSettings /> },
          { label: 'Logout', prefix: <IconLogOut /> },
        ]}
      />
    </div>
  )
}
