import { BasedSchemaField } from '@based/schema'

export const objectField: { [key: string]: BasedSchemaField } = {
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
          doink: {
            type: 'reference',
            bidirectional: {
              fromField: 'bla',
            },
            title: 'Doink',
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
