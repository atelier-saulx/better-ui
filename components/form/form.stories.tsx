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
        values={{
          src: 'https://i.imgur.com/t1bWmmC.jpeg',
          set: ['a', 'b', 'c'],
          arraySimple: ['a', 'b', 'c'],
          array: [
            {
              bla: 'snurp',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
          ],
          arraynest: [
            {
              bla: 'snurp',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            {
              bla: 'flap',
              snurp: 'hello snuf',
              src: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
          ],
          setFiles: [
            'https://i.imgur.com/t1bWmmC.jpeg',
            'https://i.imgur.com/t1bWmmC.jpeg',
          ],
          record: {
            bla: {
              bla: 'flap',
              snurp: 'hello snuf',
              flap: 'gurt',
            },
            snurp: {
              bla: 'flap',
              snurp: 'hello snuf snuf snuf',
              flap: 'gurt',
            },
          },
          recordPrimitive: {
            x: 'flap',
            y: 'flup',
          },

          recordObject: {
            x: { countryName: 'fun' },
            y: { countryName: 'fun' },
          },

          address: {
            postOfficeBox: '123',
            streetAddress: '456 Main St',
            locality: 'Cityville',
            region: 'State',
            postalCode: '12345',
            countryName: 'Country',
          },

          order: {
            orderId: 'ed1213',
          },

          object: {
            bla: 'hello!',
            snurp: 'derp!',
            src: 'https://i.imgur.com/t1bWmmC.jpeg',
            contact: {
              name: 'snurp',
              picture: 'https://i.imgur.com/t1bWmmC.jpeg',
            },
            location: {
              long: '12312312.123123123',
              lat: '23123.213123',
            },
            ratings: {},
            flap: {
              bla: {
                bla: 'flap',
                snurp: 'hello snuf',
                flap: 'gurt',
              },
              bla2: {
                bla: 'flap',
                snurp: 'hello snuf',
                flap: 'gurt',
              },
              bla3: {
                bla: 'flap',
                snurp: 'hello snuf',
                flap: 'gurt',
              },
            },
          },
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
          },
          flap: {
            title: 'Flap',
            type: 'string',
          },
          src: {
            title: 'Source',
            type: 'string',
            contentMediaType: '*/*',
          },

          set: {
            title: 'Set',
            type: 'set',
            description: 'A set',
            items: { type: 'string' },
          },
          setFiles: {
            title: 'Set',
            type: 'set',
            description: 'A set with files',
            items: { type: 'string', contentMediaType: '*/*' },
          },

          order: {
            title: 'Order',
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

          healthRecord: {
            title: 'Health Record',
            type: 'object',
            required: ['patientName', 'dateOfBirth', 'bloodType'],
            properties: {
              patientName: {
                type: 'string',
              },
              dateOfBirth: {
                type: 'timestamp',
                display: 'date',
              },
              bloodType: {
                type: 'string',
              },
              allergies: {
                type: 'array',
                values: {
                  type: 'string',
                },
              },
              conditions: {
                type: 'array',
                values: {
                  type: 'string',
                },
              },
              medications: {
                type: 'array',
                values: {
                  type: 'string',
                },
              },
            },
          },

          address: {
            title: 'Address',
            description:
              'An address similar to http://microformats.org/wiki/h-card',
            type: 'object',
            properties: {
              postOfficeBox: {
                type: 'string',
              },
              extendedAddress: {
                type: 'string',
              },
              streetAddress: {
                type: 'string',
              },
              locality: {
                type: 'string',
              },
              region: {
                type: 'string',
              },
              postalCode: {
                type: 'string',
              },
              countryName: {
                type: 'string',
              },
            },
          },

          array: {
            title: 'Array',
            type: 'array',
            description: 'An array with an object',
            values: {
              type: 'object',
              properties: {
                bla: { type: 'string' },
                snurp: { type: 'string' },
                src: { type: 'string', contentMediaType: '*/*' },
              },
            },
          },

          // arraynest: {
          //   title: 'Nested Array',
          //   type: 'array',
          //   description: 'An array with an object',
          //   values: {
          //     type: 'object',
          //     properties: {
          //       bla: { type: 'string' },
          //       snurp: { type: 'string' },
          //       src: { type: 'string', contentMediaType: '*/*' },
          //       values: {
          //         type: 'object',
          //         properties: {
          //           bla: { type: 'string' },
          //           snurp: { type: 'string' },
          //           src: { type: 'string', contentMediaType: '*/*' },
          //         },
          //       },
          //     },
          //   },
          // },

          arraySimple: {
            title: 'Simple Array',
            type: 'array',
            description: 'An array with a string',
            values: {
              type: 'string',
            },
          },

          record: {
            title: 'Record',
            type: 'record',
            values: {
              type: 'object',
              properties: {
                bla: { type: 'string' },
                snurp: { type: 'string' },
                flap: { type: 'string' },
              },
            },
          },

          recordPrimitive: {
            title: 'Primtive record',
            type: 'record',
            values: {
              type: 'string',
            },
          },

          recordExtra: {
            title: 'Primtive record (number)',
            type: 'record',
            values: {
              type: 'number',
            },
          },

          recordObject: {
            title: 'Object record',
            type: 'record',
            values: {
              type: 'object',
              properties: {
                postOfficeBox: {
                  type: 'string',
                },
                extendedAddress: {
                  type: 'string',
                },
                streetAddress: {
                  type: 'string',
                },
                locality: {
                  type: 'string',
                },
                region: {
                  type: 'string',
                },
                postalCode: {
                  type: 'string',
                },
                countryName: {
                  type: 'string',
                },
              },
            },
          },

          objectSimple: {
            title: 'Seller',
            description: 'Seller of the form',
            type: 'object',
            properties: {
              name: { type: 'string' },
              country: { type: 'string' },
              email: { type: 'string', format: 'email' },
              picture: { type: 'string', contentMediaType: '*/*' },
            },
          },

          object: {
            title: 'Restaurant',
            description: 'Restaurant of the form',
            type: 'object',
            properties: {
              isItDope: {
                type: 'boolean',
              },

              bla: {
                type: 'reference',
                bidirectional: {
                  fromField: 'bla',
                },
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

              nested: {
                type: 'object',
                properties: {
                  x: { type: 'string' },
                  contact: {
                    type: 'object',
                    properties: {
                      x: { type: 'string' },
                      y: { type: 'string' },
                      z: { type: 'string' },
                    },
                  },
                  location: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      flightpath: {
                        type: 'object',
                        properties: {
                          x: { type: 'string' },
                          y: { type: 'string' },
                          z: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              },

              flap: {
                type: 'record',
                values: {
                  type: 'object',
                  properties: {
                    bla: { type: 'string' },
                    snurp: { type: 'string' },
                    flap: { type: 'string' },

                    // nested: {
                    //   type: 'record',
                    //   values: {
                    //     type: 'object',
                    //     properties: {
                    //       x: { type: 'string' },
                    //       y: { type: 'string' },
                    //       z: { type: 'string' },
                    //       nested: {
                    //         type: 'object',
                    //         properties: {
                    //           x: { type: 'string' },
                    //           y: { type: 'string' },
                    //           z: { type: 'string' },
                    //           nested: {
                    //             type: 'object',
                    //             properties: {
                    //               x: { type: 'string' },
                    //               y: { type: 'string' },
                    //               z: { type: 'string' },
                    //               nested: {
                    //                 type: 'object',
                    //                 properties: {
                    //                   x: { type: 'string' },
                    //                   y: { type: 'string' },
                    //                   z: { type: 'string' },
                    //                 },
                    //               },
                    //             },
                    //           },
                    //         },
                    //       },
                    //     },
                    //   },
                    // },
                  },
                },
              },
            },
          },
        }}
        onChange={(values) => {
          console.log(values)
        }}
        // selectReferences={}
      />
    </div>
  )
}
