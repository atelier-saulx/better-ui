import * as React from 'react'
import type { Meta } from '@storybook/react'
import { BasedExplorer, border } from '../../index.js'
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
        fields={{
          id: { type: 'string', format: 'basedId' },
          name: { title: 'Power name', type: 'string', display: 'capitalize' },
          updatedAt: { type: 'timestamp', display: 'time-precise' },
        }}
        query={({ limit, offset, sort, language }) => ({
          $language: language,
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
        totalQuery={() => ({
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
        })}
      />
    </div>
  )
}

export const FieldsFromQuery = () => {
  return (
    <div style={{ height: '50vh' }}>
      <BasedExplorer
        onItemClick={(item) => {
          alert('clicked item ' + item.id)
        }}
        query={({ limit, offset, sort, language }) => ({
          $language: language,
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
                $filter: [
                  {
                    $operator: '=',
                    $field: 'type',
                    $value: 'todo',
                    $or: {
                      $operator: '=',
                      $field: 'type',
                      $value: 'file',
                    },
                  },
                ],
              },
            },
          },
        })}
        totalQuery={() => ({
          total: {
            $aggregate: {
              $function: 'count',
              $traverse: 'children',
              $filter: [
                {
                  $field: 'type',
                  $operator: '=',
                  $value: ['todo', 'file'],
                },
              ],
            },
          },
        })}
      />
    </div>
  )
}

export const FieldsFromValues = () => {
  return (
    <div style={{ height: '50vh' }}>
      <BasedExplorer
        variant={'grid'}
        onItemClick={(item) => {
          alert('clicked item ' + item.id)
        }}
        queryEndpoint="fakedata"
        transformResults={(d) => {
          return { data: d }
        }}
        totalQuery={false}
        query={({ limit, offset, sort, language }) => ({
          offset,
          arraySize: limit,
          src: '',
          id: '',
          description: '',
          firstName: '',
          createdAt: '',
          lastUpdated: '',
          powerTime: '',
          city: '',
        })}
      />
    </div>
  )
}

export const Page = () => {
  return (
    <div style={{ height: 'calc(100vh - 200px)', border: border() }}>
      <BasedExplorer
        onItemClick={(item) => {
          alert('clicked item ' + item.id)
        }}
        variant={['table', 'grid', 'list', 'calendar']}
        header="Based Explorer"
        info
        onDrop={(f) => {
          console.log(f)
        }}
        onSelectItem={(selected, clearSelection) => {
          console.log(selected)
          return false
        }}
        selectItemsAction={{
          label: 'Change description',
          action: async (selected, clear) => {
            if (selected.type === 'include') {
              const randomEmoji = ['🍕', '🍔', '🍟', '🍦', '🍩', '🍪']
              selected.items.forEach((id) => {
                client.call('db:set', {
                  $language: 'en',
                  $id: id,
                  body:
                    'New description! ' +
                    randomEmoji[Math.floor(Math.random() * randomEmoji.length)],
                })
              })
              clear()
            }
          },
        }}
        filter
        select={[
          { value: 'article', label: 'Article' },
          { value: 'todo', label: 'Todo' },
          { value: 'file', label: 'File' },
        ]}
        addItem={async () => {
          alert('Add item')
        }}
        query={({
          limit,
          offset,
          sort,
          language,
          filter,
          selected = 'article',
        }) => ({
          $language: language,
          data: {
            $all: true,
            image: {
              src: true,
              mimeType: true,
              id: true,
            },
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
                $filter: filter
                  ? [
                      { $operator: 'includes', $field: 'name', $value: filter },
                      { $operator: '=', $field: 'type', $value: selected },
                    ]
                  : [{ $operator: '=', $field: 'type', $value: selected }],
              },
            },
          },
        })}
        sort={{ key: 'index', dir: 'asc' }}
      />
    </div>
  )
}
