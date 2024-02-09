import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BasedExplorer } from '../../index.js'
import based from '@based/client'
import { Provider } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof BasedExplorer> = {
  title: 'Based/BasedExplorer',
  component: BasedExplorer,
  decorators: [
    (Story) => (
      <Provider client={client}>
        <Story />
      </Provider>
    ),
  ],
}

export default meta

export const Default: StoryObj<typeof BasedExplorer> = {
  args: {
    query: ({ limit, offset }) => ({
      data: {
        $all: true,
        $list: {
          $limit: limit,
          $offset: offset,
          $find: {
            $traverse: 'children',
            // perf opt check if this has a type
            // $filter: [{ $operator: '=', $field: 'type', $value: 'todo' }],
          },
        },
      },
      // total: {} TODO add optional aggregate query
    }),
  },
}
