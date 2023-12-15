import * as React from 'react'
import { Form } from '.'
import { BasedSchemaField } from '@based/schema'
import { border } from '../../utils/colors'

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
        values={{
          src: 'https://i.imgur.com/t1bWmmC.jpeg',
        }}
        fields={{
          name: {
            title: 'Name',
            type: 'string',
            description: 'A name of someone',
          },
          shortnumber: {
            type: 'number',
            display: 'short',
            description: 'A short number',
          },
          date: {
            type: 'timestamp',
            description: 'A timestamp',
          },
          flap: {
            title: 'Flap',
            type: 'string',
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
  ratings: {
    title: 'Ratings',
    description: 'Rating of things',
    type: 'object',
    properties: {
      price: { type: 'string', title: 'Price' },
      quality: { type: 'string', title: 'Quality' },
      awards: { type: 'string', title: 'Awards' },
      powerful: { type: 'string', title: 'Power Level' },
    },
  },
  order: {
    title: 'Order',
    description: 'A nice order',
    type: 'object',
    properties: {
      orderId: { type: 'string' },
      price: { type: 'string' },
      email: { type: 'string' },
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
          quality: { type: 'string', title: 'Quality' },
          awards: { type: 'string', title: 'Awards' },
          powerful: { type: 'string', title: 'Power Level' },
        },
      },
      location: {
        title: 'Location',
        type: 'object',
        properties: {
          long: { type: 'string', title: 'Longitude' },
          lat: { type: 'string', title: 'Latiude' },
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
              flapflapflap: { type: 'string' },
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
            powerful: 9000,
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

export const Bare = () => {
  return (
    <div style={{ padding: 64 }}>
      <div style={{ borderRadius: 8, border: border() }}>
        <Form
          variant="bare"
          values={{
            ratings: {
              powerful: 9000,
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

// export const Flap = () => {
//   return (
//     <div style={{ padding: 64 }}>
//       <Form
//         values={{}}
//         fields={{
//           // // ------------------
//           // array: {
//           //   title: 'Array',
//           //   type: 'array',
//           //   description: 'An array with an object',
//           //   values: {
//           //     type: 'object',
//           //     properties: {
//           //       bla: { type: 'string' },
//           //       snurp: { type: 'string' },
//           //       src: { type: 'string', contentMediaType: '*/*' },
//           //     },
//           //   },
//           // },

//           // set: {
//           //   title: 'Set',
//           //   type: 'set',
//           //   description: 'A set',
//           //   items: { type: 'string' },
//           // },
//           // setFiles: {
//           //   title: 'Set',
//           //   type: 'set',
//           //   description: 'A set with files',
//           //   items: { type: 'string', contentMediaType: '*/*' },
//           // },

//           // healthRecord: {
//           //   title: 'Health Record',
//           //   type: 'object',
//           //   required: ['patientName', 'dateOfBirth', 'bloodType'],
//           //   properties: {
//           //     patientName: {
//           //       type: 'string',
//           //     },
//           //     dateOfBirth: {
//           //       type: 'timestamp',
//           //       display: 'date',
//           //     },
//           //     bloodType: {
//           //       type: 'string',
//           //     },
//           //     allergies: {
//           //       type: 'array',
//           //       values: {
//           //         type: 'string',
//           //       },
//           //     },
//           //     conditions: {
//           //       type: 'array',
//           //       values: {
//           //         type: 'string',
//           //       },
//           //     },
//           //     medications: {
//           //       type: 'array',
//           //       values: {
//           //         type: 'string',
//           //       },
//           //     },
//           //   },
//           // },

//           arraynest: {
//             title: 'Nested Array',
//             type: 'array',
//             description: 'An array with an object',
//             values: {
//               type: 'object',
//               properties: {
//                 bla: { type: 'string' },
//                 snurp: { type: 'string' },
//                 src: { type: 'string', contentMediaType: '*/*' },
//                 values: {
//                   type: 'object',
//                   properties: {
//                     bla: { type: 'string' },
//                     snurp: { type: 'string' },
//                     src: { type: 'string', contentMediaType: '*/*' },
//                   },
//                 },
//               },
//             },
//           },

//           arraySimple: {
//             title: 'Simple Array',
//             type: 'array',
//             description: 'An array with a string',
//             values: {
//               type: 'string',
//             },
//           },

//           record: {
//             title: 'Record',
//             type: 'record',
//             values: {
//               type: 'object',
//               properties: {
//                 bla: { type: 'string' },
//                 snurp: { type: 'string' },
//                 flap: { type: 'string' },
//               },
//             },
//           },

//           recordPrimitive: {
//             title: 'Primtive record',
//             type: 'record',
//             values: {
//               type: 'string',
//             },
//           },

//           recordExtra: {
//             title: 'Primtive record (number)',
//             type: 'record',
//             values: {
//               type: 'number',
//             },
//           },

//           recordObject: {
//             title: 'Object record',
//             type: 'record',
//             values: {
//               type: 'object',
//               properties: {
//                 postOfficeBox: {
//                   type: 'string',
//                 },
//                 extendedAddress: {
//                   type: 'string',
//                 },
//                 streetAddress: {
//                   type: 'string',
//                 },
//                 locality: {
//                   type: 'string',
//                 },
//                 region: {
//                   type: 'string',
//                 },
//                 postalCode: {
//                   type: 'string',
//                 },
//                 countryName: {
//                   type: 'string',
//                 },
//               },
//             },
//           },

//           object: {
//             title: 'Restaurant',
//             description: 'Restaurant of the form',
//             type: 'object',
//             properties: {
//               isItDope: {
//                 type: 'boolean',
//               },

//               bla: {
//                 type: 'reference',
//                 bidirectional: {
//                   fromField: 'bla',
//                 },
//                 allowedTypes: ['root'],
//               },

//               contact: {
//                 title: 'Contact',
//                 type: 'object',
//                 properties: {
//                   name: { type: 'string' },
//                   phone: { type: 'string', format: 'mobilePhone' },
//                   email: { type: 'string', format: 'email' },
//                   picture: { type: 'string', contentMediaType: '*/*' },
//                 },
//               },

//               ratings: {
//                 title: 'Ratings',
//                 type: 'object',
//                 properties: {
//                   price: { type: 'string', title: 'Price' },
//                   quality: { type: 'string', title: 'Quality' },
//                   awards: { type: 'string', title: 'Awards' },
//                   powerful: { type: 'string', title: 'Power Level' },
//                 },
//               },

//               location: {
//                 title: 'Location',
//                 type: 'object',
//                 properties: {
//                   long: { type: 'string', title: 'Longitude' },
//                   lat: { type: 'string', title: 'Latiude' },
//                 },
//               },

//               flap: {
//                 type: 'record',
//                 values: {
//                   type: 'object',
//                   properties: {
//                     bla: { type: 'string' },
//                     snurp: { type: 'string' },
//                     flap: { type: 'string' },
//                   },
//                 },
//               },
//             },
//           },
//         }}
//         onChange={(values) => {
//           console.log(values)
//         }}
//         // selectReferences={}
//       />
//     </div>
//   )
// }
