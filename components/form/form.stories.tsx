import * as React from 'react'
import { Form } from './'

const meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        // defaultValues={{
        //   name: 'name',
        //   select: 'hu',
        //   nested_stuff: {
        //     something: 'asd',
        //     somethingElse: 'usa',
        //   },
        // }}
        fields={{
          name: {
            title: 'Name',
            type: 'string',
            description: 'A name of someone',
          },
          set: {
            title: 'Set',
            type: 'set',
            description: 'A set',
            items: { type: 'string' },
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}
