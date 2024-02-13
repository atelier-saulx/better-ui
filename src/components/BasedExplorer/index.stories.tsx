import * as React from 'react'
import type { Meta } from '@storybook/react'
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

export const Default = () => {
  return (
    <div style={{ height: '50vh' }}>
      <BasedExplorer
        onItemClick={(item) => {
          alert('clicked item ' + item.id)
        }}
        query={({ limit, offset, sort }) => ({
          data: {
            $all: true,
            $list: {
              $limit: limit,
              $offset: offset,
              ...(sort && {
                $sort: {
                  $field: sort.key,
                  $order: sort.dir,
                },
              }),
              $find: {
                $traverse: 'children',
                $filter: [{ $operator: '=', $field: 'type', $value: 'todo' }],
              },
            },
          },
        })}
        totalQuery={{
          total: {
            $aggregate: {
              $function: 'count',
              $traverse: 'children',
              $filter: [
                {
                  $field: 'type',
                  $operator: '=',
                  $value: 'todo',
                },
              ],
            },
          },
        }}
      />
    </div>
  )
}
