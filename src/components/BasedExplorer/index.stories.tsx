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

// total seperate q
// sort

export const Default = () => {
  return (
    <div style={{ height: 500 }}>
      <BasedExplorer
        query={({ limit, offset, sort }) => {
          console.log('sort on the query fn', {
            $field: sort?.key ?? 'index',
            $order: sort?.dir ?? 'asc',
          })

          return {
            data: {
              $all: true,
              $list: {
                $limit: limit,
                $offset: offset,
                $sort: {
                  $field: sort?.key ?? 'index',
                  $order: sort?.dir ?? 'asc',
                },
                $find: {
                  $traverse: 'children',
                  $filter: [{ $operator: '=', $field: 'type', $value: 'todo' }],
                },
              },
            },
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
          }
        }}
      />
    </div>
  )
}
