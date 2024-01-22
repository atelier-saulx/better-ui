import * as React from 'react'
import { Form, border, Modal } from '../../../index.js'
import { wait } from '@saulx/utils'

const meta = {
  title: 'Form/Default',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

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

const fileUpload = async ({ value }, updateProgress) => {
  if (!value) {
    return undefined
  }
  let p = 0
  while (p < 100) {
    p += 10
    updateProgress(p)
    await wait(100)
  }
  return 'https://i.imgur.com/DRmh6S9.jpeg'
}

export const Default = () => {
  const [cnt, setCnt] = React.useState<number>(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCnt((cnt) => cnt + 1)
    }, 100)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div style={{ padding: 64 }}>
      <Form
        checksum={cnt}
        onFileUpload={fileUpload}
        values={{
          src: 'https://i.imgur.com/t1bWmmC.jpeg',
          code: ts,
          json: JSON.stringify(
            { y: 1, x: 1, z: 1, someThing: 'great' },
            null,
            2,
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
          number: cnt,
        }}
        fields={{
          name: {
            title: 'Name',
            type: 'string',
            description: 'A name of someone',
          },
          dope: {
            title: 'Is it dope?',
            type: 'boolean',
            description: 'Dope or nah',
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
        onChange={(values, changed, checksum) => {
          console.log(
            'values:',
            values,
            'changed:',
            changed,
            'checksum:',
            checksum,
          )
        }}
      />
    </div>
  )
}

export const SmallForm = () => {
  return (
    <div style={{ padding: 64 }}>
      <Form
        variant="small"
        fields={{
          options: {
            title: 'Options',
            description: 'Select some options',
            enum: ['Snurp', 'Merp', 'Dakkie', 'Lurp'],
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
          fields={{
            address: {
              title: 'Address',
              description:
                'An address similar to http://microformats.org/wiki/h-card',
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
          }}
          onChange={(values) => {
            console.log(values)
          }}
        />
      </div>
    </div>
  )
}
