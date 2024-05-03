import * as React from 'react'
import { Button, Stack, Table, useUpdate } from '../../index.js'
import based from '@based/client'
import { wait } from '@saulx/utils'
import { Provider, useQuery } from '@based/react'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const DataStuff = ({ Story }) => {
  const { data, loading } = useQuery('fakedata', {
    arraySize: 100,
    id: '',
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
  })

  if (loading) {
    return null
  }

  for (let i = 0; i < data.length; i++) {
    delete data[i].arraySize
    data[i].price = Number(data[i].price)
  }

  const dataSorted = [...data].sort(sortByPrice)

  return <Story data={data ?? []} dataSorted={dataSorted} />
}

const meta = {
  title: 'Components/Table',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider client={client}>
        <DataStuff Story={Story} />
      </Provider>
    ),
  ],
}

export default meta

export const Default = ({ data }) => {
  const r = React.useRef<Set<string>>(new Set(['*']))
  const update = useUpdate()

  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table
        onSelect={(v, all) => {
          if (all) {
            if (r.current.has('*')) {
              r.current.clear()
            } else {
              r.current.clear()
              r.current.add('*')
            }
            update()
            return
          }

          if (r.current.has(v.id)) {
            r.current.delete(v.id)
          } else {
            r.current.add(v.id)
          }
          update()
        }}
        selected={r.current}
        values={data}
        pagination
        sort
      />
    </div>
  )
}

export const LoadMore = ({ data }) => {
  const [dataFetch, setDataFetch] = React.useState({
    arraySize: 10,
    id: '',
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
  })

  const dataRef = React.useRef({
    data: [...data],
  })

  const { data: more } = useQuery('fakedata', {
    ...dataFetch,
  })

  const d = dataRef.current.data

  const update = useUpdate()

  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table
        values={d}
        pagination={{
          loadMore: async (p) => {
            await wait(Math.random() * 1000)

            setDataFetch({
              arraySize: Math.floor(Math.random() * 15) + 10,
              id: '',
              src: '',
              status: '',
              title: '',
              number: '',
              name: '',
              price: '',
              color: '',
              createdAt: '',
            })

            await dataRef.current.data.push(...more)
            update()
          },
          onPageChange: async (p) => {
            dataRef.current.data[p.start + 1].name = '$$$$$ ' + 'snurp'
            update()
          },
          total: d.length,
          type: 'scroll',
        }}
        sort
      />
    </div>
  )
}

export const Infinite = () => {
  const { data: dataLots, loading } = useQuery('fakedata', {
    arraySize: 1000,
    // nr: index, // check if all are numbers
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
  })

  if (loading) {
    return null
  }

  for (let i = 0; i < dataLots.length; i++) {
    delete dataLots[i].arraySize
    dataLots['nr'] = i
  }

  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table values={dataLots} pagination sort />
    </div>
  )
}

const sortByPrice = (a, b) => {
  return a.price * 1 > b.price * 1 ? -1 : a.price * 1 === b.price * 1 ? 0 : 1
}

export const CustomSort = ({ dataSorted }) => {
  const update = useUpdate()

  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table
        values={dataSorted}
        pagination
        sort={{
          sorted: { key: 'price', dir: 'desc' },
          include: new Set(['price']),
          onSort: (key, dir, sort) => {
            sort.sorted = { key, dir }
            dataSorted.sort((a, b) => {
              return sortByPrice(a, b) * (dir === 'asc' ? -1 : 1)
            })
            update()
          },
        }}
      />
    </div>
  )
}

export const EditableTable = () => {
  const { data: dataSmall, loading } = useQuery('fakedata', {
    arraySize: 10,
    id: '',
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
  })

  if (loading) {
    return null
  }

  return (
    <Table
      values={dataSmall}
      // @ts-ignore
      editable
      sortable
      field={{
        type: 'object',
        properties: {
          id: { type: 'string', format: 'basedId' },
          color: { type: 'string', format: 'rgbColor' },
          price: { type: 'number', display: 'euro' },
          createdAt: { type: 'timestamp' },
        },
      }}
    />
  )
}

export const EditableRefTable = () => {
  const editableRef = React.useRef({
    onChange(changed) {},
  })

  return (
    <>
      <Stack>
        <Button
          onClick={() => {
            // @ts-ignore
            editableRef.current.clear()
          }}
        >
          Apply
        </Button>
        <Button
          onClick={() => {
            // @ts-ignore
            editableRef.current.clear()
          }}
        >
          Discard
        </Button>
      </Stack>
      {/* @ts-ignore */}
      <Table editableRef={editableRef.current} />
    </>
  )
}

export const SmallTable = () => {
  const { data: dataSmall, loading } = useQuery('fakedata', {
    arraySize: 10,
    id: '',
    src: '',
    status: '',
    title: '',
    number: '',
    name: '',
    price: '',
    color: '',
    createdAt: '',
  })

  if (loading) {
    return null
  }

  return (
    <Table
      values={dataSmall}
      field={{
        type: 'object',
        properties: {
          id: { type: 'string', format: 'basedId' },
          color: { type: 'string', format: 'rgbColor' },
          price: { type: 'number', display: 'euro' },
        },
      }}
    />
  )
}

const s: any = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'basedId', width: 125, index: -1 },
  },
}

const q: any = { update: 1000, arraySize: 20, id: { type: 'id' } }
for (let i = 0; i < 200; i++) {
  q[i] = { type: 'number', value: { min: 5000, max: 5e6 } }
  s.properties[i] = { type: 'number', display: 'number', width: 125 }
}

export const AdvancedTable = () => {
  const { data, loading } = useQuery('fakedata', q)

  if (loading) {
    return null
  }

  // add this bit as an extra component maybe?
  return (
    <div
      style={{
        overflowX: 'scroll',
      }}
    >
      <div
        style={{
          width: 125 * 201,
        }}
      >
        <Table sort values={data} field={s} />
      </div>
    </div>
  )
}
