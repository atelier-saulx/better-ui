import * as React from 'react'
import type { Meta } from '@storybook/react'
import { BasedExplorer, BasedList } from '../../index.js'
import based from '@based/client'
import { Provider } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta: Meta<typeof BasedExplorer> = {
  title: 'Based/BasedList',
  component: BasedList,
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
    <div style={{ height: '50vh' }}>
      <BasedList
        query={() => ({
          data: {
            $all: true,
            $list: {
              $find: {
                $traverse: 'children',
                $filter: [{ $operator: '=', $field: 'type', $value: 'todo' }],
              },
            },
          },
        })}
      />
    </div>
  )
}
