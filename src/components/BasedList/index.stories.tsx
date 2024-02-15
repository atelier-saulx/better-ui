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

const meta: Meta<typeof BasedList> = {
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
      {/* <BasedList
        query={() => ({
          $language: 'en',
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
        // totalQuery={() => ({
        //   total: {
        //     $aggregate: {
        //       $function: 'count',
        //       $traverse: 'children',
        //       $filter: [
        //         {
        //           $field: 'type',
        //           $operator: '=',
        //           $value: ['todo', 'file'],
        //         },
        //       ],
        //     },
        //   },
        // })}
      /> */}
    </div>
  )
}

// export const Custom = () => {
//   return (
//     <div style={{ height: '50vh' }}>
//       <BasedList
//         fields={{ title: 'id' }}
//         query={() => ({
//           $language: 'en',
//           data: {
//             $all: true,
//             $list: {
//               $find: {
//                 $traverse: 'children',
//                 $filter: [{ $operator: '=', $field: 'type', $value: 'todo' }],
//               },
//             },
//           },
//         })}
//       />
//     </div>
//   )
// }
