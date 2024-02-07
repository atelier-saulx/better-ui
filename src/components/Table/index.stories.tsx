import * as React from 'react'
import { Table, useUpdate } from '../../index.js'
import { faker } from '@faker-js/faker'
import based from '@based/client'
import { wait } from '@saulx/utils'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Components/Table',
  parameters: {
    layout: 'fullscreen',
  },
}
export default meta

const data = new Array(100).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

const dataSmall = new Array(10).fill(null).map(() => ({
  id: faker.string.uuid().slice(0, 8),
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

const dataLots = new Array(1000).fill(null).map((v, index) => ({
  nr: index, // check if all are numbers
  src: faker.image.avatar(),
  status: faker.lorem.words(1),
  title: faker.lorem.sentence(3),
  number: faker.number.int(10),
  name: faker.person.fullName(),
  price: faker.commerce.price(),
  color: faker.color.rgb(),
  createdAt: faker.date.soon().valueOf(),
}))

export const Default = () => {
  return (
    <div
      style={{
        height: 500,
      }}
    >
      <Table values={data} pagination sort />
    </div>
  )
}

export const LoadMore = () => {
  const dataRef = React.useRef({
    data: [...dataSmall],
  })

  const update = useUpdate()

  const d = dataRef.current.data

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
            await wait(Math.random() * 1e3)
            dataRef.current.data.push(
              ...new Array(p.pageSize).fill(null).map((_, i) => ({
                id: faker.string.uuid().slice(0, 8),
                src: faker.image.avatar(),
                status: faker.lorem.words(1),
                title: faker.lorem.sentence(3),
                number: i + dataRef.current.data.length,
                name: faker.person.fullName(),
                price: faker.commerce.price(),
                color: faker.color.rgb(),
                createdAt: faker.date.soon().valueOf(),
              })),
            )
            update()
          },
          onPageChange: async (p) => {
            dataRef.current.data[p.start + 1].name =
              '$$$$$ ' + faker.person.fullName()
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

const dataSorted = [...data].sort(sortByPrice)

export const CustomSort = () => {
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
  return <Table values={dataSmall} editable sortable />
}

// const InfiniteQueryContent = () => {
//   const [itemToDelete, setItemToDelete] = React.useState(null)
//   const { data, fetchMore, setVisibleElements } = useInfiniteQuery({
//     accessFn: (data) => data.files,
//     queryFn: (offset) => ({
//       $id: 'root',
//       files: {
//         $all: true,
//         $list: {
//           $sort: { $field: 'updatedAt', $order: 'desc' },
//           $offset: offset,
//           $limit: 25,
//           $find: {
//             $traverse: 'children',
//             $filter: {
//               $operator: '=',
//               $field: 'type',
//               $value: 'todo',
//             },
//           },
//         },
//       },
//     }),
//   })

//   return (
//     <>
//       <div style={{ height: '100svh' }}>
//         <Table
//           data={data}
//           onScrollToBottom={fetchMore}
//           onVisibleElementsChange={setVisibleElements}
//           rowAction={(row) => (
//             <Dropdown.Root>
//               <Dropdown.Trigger>
//                 <Button shape="square" variant="neutral-transparent">
//                   <IconMoreVertical />
//                 </Button>
//               </Dropdown.Trigger>
//               <Dropdown.Items>
//                 <Dropdown.Item icon={<IconCopy />}>Copy</Dropdown.Item>
//                 <Dropdown.Item
//                   icon={<IconDelete />}
//                   onClick={() => {
//                     setItemToDelete(row.id)
//                   }}
//                 >
//                   Delete
//                 </Dropdown.Item>
//               </Dropdown.Items>
//             </Dropdown.Root>
//           )}
//         />
//       </div>
//       {itemToDelete && (
//         <Modal.Root
//           open
//           onOpenChange={() => {
//             setItemToDelete(null)
//           }}
//         >
//           <Modal.Overlay>
//             {({ close }) => (
//               <>
//                 <Modal.Title description="Are you sure? This action cannot be undone.">
//                   Deleting item #{itemToDelete}
//                 </Modal.Title>
//                 <Modal.Actions>
//                   <Button onClick={close} variant="neutral">
//                     Cancel
//                   </Button>
//                   <Button onClick={close} variant="error">
//                     Delete
//                   </Button>
//                 </Modal.Actions>
//               </>
//             )}
//           </Modal.Overlay>
//         </Modal.Root>
//       )}
//     </>
//   )
// }

// export const InfiniteQuery = () => {
//   return (
//     <Provider client={client}>
//       <InfiniteQueryContent />
//     </Provider>
//   )
// }
