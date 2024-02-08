import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BasedExplorer } from '../../index.js'

const meta: Meta<typeof BasedExplorer> = {
  title: 'Based/BasedExplorer',
  component: BasedExplorer,
}

export default meta

export const Toggle: StoryObj<typeof BasedExplorer> = {
  args: {},
}
