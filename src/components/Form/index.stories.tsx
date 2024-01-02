import * as React from 'react'
import { Form, border } from '../../index.js'
import { BasedSchemaField } from '@based/schema'

const meta = {
  title: 'Components/Form',
  parameters: {
    layout: 'fullscreen',
  },
}

const ts = `import * as React from 'react'

export function Svg({ style, width = 20, height = 20 }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="a b c"
      />
    </svg>
  )
}
`

export default meta

export const Default = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        values={{
          src: 'https://i.imgur.com/t1bWmmC.jpeg',
          code: ts,
          json: JSON.stringify(
            { y: 1, x: 1, z: 1, someThing: 'great' },
            null,
            2
          ),
          category: 'id12345',
          categoryNamed: {
            id: 'id12345',
            title: 'Mr category',
          },
          logo: {
            name: 't1bWmmC.jpeg',
            id: 'idxyz',
            src: 'https://i.imgur.com/t1bWmmC.jpeg',
          },
        }}
        fields={{
          name: {
            title: 'Name',
            type: 'string',
            description: 'A name of someone',
          },
          number: {
            title: 'Number',
            type: 'number',
            minimum: 10,
            maximum: 10,
          },
          createdAt: {
            type: 'timestamp',
          },
          logo: {
            title: 'Logo',
            description: 'This is a logo',
            type: 'reference',
            allowedTypes: ['file'],
          },
          logoEmpty: {
            title: 'Logo empty',
            description: 'This is a logo',
            type: 'reference',
            allowedTypes: ['file'],
          },
          category: {
            title: 'Category',
            description: 'This is a category',
            type: 'reference',
            allowedTypes: ['category'],
            bidirectional: { fromField: 'flap' },
          },
          categoryNamed: {
            title: 'Category with a name',
            description: 'This is a category',
            type: 'reference',
            allowedTypes: ['category'],
            bidirectional: { fromField: 'flap' },
          },
          bgColor: {
            title: 'Background color',
            type: 'string',
            format: 'rgbColor',
          },
          options: {
            title: 'Options',
            description: 'Select some options',
            enum: ['Snurp', 'Merp', 'Dakkie', 'Lurp'],
          },
          json: {
            title: 'Some JSON',
            description: 'This is some json',
            type: 'json',
          },
          code: {
            title: 'Some Code',
            description: 'This is some Code',
            type: 'string',
            format: 'code',
          },
          shortnumber: {
            title: 'A short number',
            type: 'number',
            display: 'short',
            description: 'A short number',
          },
          date: {
            title: 'A date',
            type: 'timestamp',
            description: 'A timestamp',
          },
          flap: {
            title: 'Flap',
            type: 'string',
            description: 'A flap',
          },
          mutliLineText: {
            title: 'Multiline Text',
            type: 'string',
            multiline: true,
            description: 'A flap',
          },
          src: {
            title: 'Source',
            type: 'string',
            contentMediaType: '*/*',
            description: 'A src',
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}

export const Set = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        values={{
          set: ['a', 'b', 'c'],
          setNumber: [1, 3, 4, 5],
          object: {
            a: ['a', 'b', 'c'],
            b: [1, 3, 4, 5],
          },
        }}
        fields={{
          set: {
            title: 'Set',
            type: 'set',
            description: 'A set with strings',
            items: { type: 'string' },
          },
          setNumber: {
            title: 'Set Numbers',
            type: 'set',
            description: 'A set with numbers',
            items: { type: 'number' },
          },
          object: {
            title: 'Set in an object',
            type: 'object',
            description: 'A set with numbers',
            properties: {
              a: {
                title: 'Set',
                type: 'set',
                description: 'A set with strings',
                items: { type: 'string' },
              },
              b: {
                title: 'Set Numbers',
                type: 'set',
                description: 'A set with numbers',
                items: { type: 'number' },
              },
            },
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}

const objectField: { [key: string]: BasedSchemaField } = {
  multiLineRatings: {
    title: 'Multiline Ratings',
    description: 'Rating of things',
    type: 'object',
    properties: {
      price: { title: 'Price', type: 'number' },
      text: { title: 'Multiline text', type: 'string', multiline: true },
    },
  },
  ratings: {
    title: 'Ratings',
    description: 'Rating of things',
    type: 'object',
    properties: {
      price: { type: 'number', title: 'Price' },
      quality: { type: 'string', title: 'Quality' },
      time: { type: 'timestamp', title: 'Time' },
      powerful: { type: 'string', title: 'Power Level', format: 'rgbColor' },
    },
  },
  order: {
    title: 'Order',
    description: 'A nice order',
    type: 'object',
    properties: {
      orderId: { type: 'string' },
      price: { type: 'number' },
      email: { type: 'string' },
      multiLineText: { type: 'string', multiline: true },
      isItDope: {
        type: 'boolean',
      },
    },
  },
  orderWithDescription: {
    title: 'Order Described',
    description: 'A nice order',
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        description: 'ID of the order',
        title: 'ID',
      },
      price: {
        type: 'string',
        description: 'The most important',
        title: 'Price',
      },
      quality: {
        enum: ['Snurp', 'Merp', 'Dakkie', 'Lurp'],
        title: 'Quality',
        description: 'Is it snurp or dakkie?',
      },
      email: {
        type: 'string',
        description: 'Email for comms',
        title: 'Email',
      },
      isItDope: {
        title: 'Is it dope?',
        description: 'Determines the dopeness',
        type: 'boolean',
      },
      json: {
        title: 'Some JSON',
        description: 'This is some json',
        type: 'json',
      },
      code: {
        title: 'Some Code',
        description: 'This is some Code',
        type: 'string',
        format: 'code',
      },
    },
  },
  address: {
    title: 'Address',
    description: 'An address similar to http://microformats.org/wiki/h-card',
    type: 'object',
    properties: {
      picture: {
        title: 'Picture',
        type: 'string',
        contentMediaType: '*/*',
      },
      postOfficeBox: {
        title: 'PO Box',
        type: 'string',
      },
      extendedAddress: {
        title: 'Address extended',
        description: 'An address similar to flap',
        type: 'string',
      },
      streetAddress: {
        title: 'Street',
        type: 'string',
      },
      locality: {
        title: 'Locality',
        type: 'string',
      },
      region: {
        title: 'Region',
        type: 'string',
      },
      postalCode: {
        title: 'PostalCode',
        type: 'string',
      },
      countryName: {
        title: 'Country',
        type: 'string',
      },
    },
  },
  object: {
    title: 'Restaurant',
    description: 'Restaurant of the form',
    type: 'object',
    properties: {
      name: { type: 'string', title: 'Name' },
      isItDope: {
        title: 'Dopeness',
        type: 'boolean',
      },
      bla: {
        type: 'reference',
        bidirectional: {
          fromField: 'bla',
        },
        title: 'Bla',
        allowedTypes: ['root'],
      },
      contact: {
        title: 'Contact',
        type: 'object',
        properties: {
          name: { type: 'string' },
          phone: { type: 'string', format: 'mobilePhone' },
          email: { type: 'string', format: 'email' },
          picture: { type: 'string', contentMediaType: '*/*' },
        },
      },

      ratings: {
        title: 'Ratings',
        type: 'object',
        properties: {
          price: { type: 'string', title: 'Price' },
          quality: {
            enum: ['Snurp', 'Merp', 'Dakkie', 'Lurp'],
            title: 'Quality',
          },
          dinky: {
            type: 'reference',
            bidirectional: {
              fromField: 'bla',
            },
            title: 'Dinky',
            allowedTypes: ['thing'],
          },
          powerful: { type: 'string', title: 'Power Level' },
        },
      },
      location: {
        title: 'Location',
        type: 'object',
        properties: {
          snurp: {
            type: 'reference',
            bidirectional: {
              fromField: 'bla',
            },
            title: 'Snurp',
            allowedTypes: ['thing'],
          },
          lat: { type: 'string', title: 'Latitude' },
        },
      },
    },
  },

  nestedObject: {
    title: 'Nested object',
    description: 'Nested large objects',
    type: 'object',
    properties: {
      contact: {
        title: 'Nested object',
        description: 'Nested large objects',
        type: 'object',
        properties: {
          contact: {
            title: 'Contact',
            type: 'object',
            properties: {
              name: { type: 'string' },
              phone: { type: 'string', format: 'mobilePhone' },
              email: { type: 'string', format: 'email' },
              picture: { type: 'string', contentMediaType: '*/*' },
            },
          },
          flap: {
            title: 'Deep Nested object',
            type: 'object',
            properties: {
              name: { type: 'string' },
              flapflapflap: { type: 'json' },
              phone: { type: 'string', format: 'mobilePhone' },
              email: { type: 'string', format: 'email' },
              picture: { type: 'string', contentMediaType: '*/*' },
            },
          },
        },
      },
    },
  },
}

export const Object = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        variant="small"
        values={{
          ratings: {
            powerful: 'rgb(78,56,188)',
          },
          object: {
            location: {
              snurp: { id: 'flap', src: 'https://i.imgur.com/t1bWmmC.jpeg' },
            },
          },
          orderWithDescription: {
            code: ts,
            json: JSON.stringify(
              { y: 1, x: 1, z: 1, someThing: 'great' },
              null,
              2
            ),
          },
        }}
        fields={objectField}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}

export const Record = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        variant="small"
        values={{
          record: {
            flap: 'flap',
            snurp: 'derp',
          },
          ratings: {
            powerful: 'rgb(78,56,188)',
          },
          recordObject: {
            flap: { price: 200 },
            flup: { price: 50 },
          },
          recordObjectBig: {
            big: {},
            blap: {},
          },
        }}
        fields={{
          record: {
            title: 'Fun record',
            type: 'record',
            values: {
              type: 'string',
            },
          },
          recordObject: {
            title: 'Nested record',
            type: 'record',
            values: objectField.ratings,
          },
          recordObjectBig: {
            title: 'Nested big record',
            type: 'record',
            values: objectField.object,
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}

export const Array = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        values={{
          simpleArray: ['hello'],
          array: [
            {
              powerful: 'rgb(78,56,188)',
            },
            {
              powerful: 'rgb(78,56,188)',
            },
            {
              powerful: 'rgb(78,56,188)',
            },
          ],
          nestedArray: [
            [
              {
                powerful: 'rgb(78,56,188)',
              },
              {
                powerful: 'rgb(78,56,188)',
              },
              {
                powerful: 'rgb(78,56,188)',
              },
            ],
            [
              {
                powerful: 'rgb(78,56,188)',
              },
            ],
            [
              {
                powerful: 'rgb(78,56,188)',
              },
            ],
          ],
          arrayAutoTitle: [
            {
              name: 'fun',
            },
            {
              name: 'flap',
            },
            {
              name: 'Snurpie',
            },
          ],
          nestedArrayBig: [
            [
              {
                name: 'fun',
              },
            ],
          ],
        }}
        fields={{
          simpleArray: {
            type: 'array',
            values: {
              type: 'string',
            },
          },
          array: {
            title: 'Things',
            description: 'some things',
            type: 'array',
            values: objectField.ratings,
          },
          nestedArray: {
            title: 'Nested things',
            description: 'some things, nested',
            type: 'array',
            values: {
              description: 'some things',
              type: 'array',
              values: objectField.ratings,
            },
          },
          nestedArrayBig: {
            title: 'Nested things large',
            description: 'some things, nested',
            type: 'array',
            values: {
              description: 'some things',
              type: 'array',
              values: objectField.object,
            },
          },
          arrayAutoTitle: {
            title: 'Auto title',
            description: 'some things',
            type: 'array',
            values: objectField.object,
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
      />
    </div>
  )
}

export const Bare = () => {
  return (
    <div style={{ padding: 64 }}>
      <div style={{ borderRadius: 8, border: border() }}>
        <Form
          variant="bare"
          values={{
            ratings: {
              powerful: 'rgb(78,56,188)',
            },
          }}
          fields={{ object: objectField.address }}
          onChange={(values) => {
            console.log(values)
          }}
        />
      </div>
    </div>
  )
}