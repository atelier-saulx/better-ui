import * as React from 'react'
import type { Meta } from '@storybook/react'
import { BasedForm } from '../../index.js'
import based from '@based/client'
import { Provider } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof BasedForm> = {
  title: 'Based/BasedForm',
  component: BasedForm,
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  return (
    <div>
      <BasedForm id="1001532335" />
    </div>
  )
}
