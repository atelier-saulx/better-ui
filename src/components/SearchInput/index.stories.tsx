import { SearchInput, Stack, Button } from '../../index.js'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

const meta: Meta<typeof SearchInput> = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
}

export default meta

export const Default: StoryObj<typeof SearchInput> = {
  args: {
    placeholder: 'Placeholder text',
  },
}

export const WithButton = () => {
  return (
    <Stack justify="start" gap={16}>
      <SearchInput />
      <Button>Bla</Button>
    </Stack>
  )
}
