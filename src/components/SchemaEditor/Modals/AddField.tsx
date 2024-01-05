import * as React from 'react'
import { Button } from '../../Button/index.js'
import { IconPlus } from '../../Icons/index.js'
import { Modal } from '../../Modal/index.js'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Container } from '../../Container/index.js'
import { Thumbnail } from '../../Thumbnail/index.js'
import { FieldModal } from './FieldModal.js'

export const AddField = ({}) => {
  const [searchValue, setSearchValue] = React.useState('')
  const { open } = Modal.useModal()

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button size="small">
          <IconPlus /> Add Field
        </Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <div style={{ padding: 24, overflow: 'overlay' }}>
            <Text>Add a new field to your schema type</Text>
            <TextInput
              placeholder="Search for a field"
              onChange={(v) => setSearchValue(v)}
              style={{ marginBottom: 12 }}
            />
            {SCHEMA_FIELDS.filter(
              (item) =>
                item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            ).map((item, idx) => (
              <Container
                key={idx}
                title={item.label}
                description={item.description}
                prefix={<Thumbnail text={item.label} color="auto-muted" />}
                style={{ marginBottom: 8 }}
                onClick={async () => {
                  close()
                  const result = await open(({ close }) => (
                    <Modal
                      onConfirm={() => {
                        close('close this')
                      }}
                    >
                      <FieldModal fieldType={item.label} />
                    </Modal>
                  ))
                  console.log({ result })
                }}
              />
            ))}
          </div>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}

export const SCHEMA_FIELDS = [
  {
    label: 'String',
    description: 'Non internationalized string',
    //   icon: <IconQuote />,
    //   color: 'brand',
  },
  {
    label: 'Text',
    description: 'Text with formatting',
  },
  {
    label: 'Rich Text',
    description: 'Stored as JSON and seperate field for HTML ',
  },
  {
    label: 'Number',
    description: 'A Float',
  },
  {
    label: 'Int',
    description: 'Whole numbers',
  },
  {
    label: 'Enum',
    description: 'Set of named constants',
  },
  {
    label: 'Boolean',
    description: 'True or False',
  },
  {
    label: 'Timestamp',
    description: 'Timestamp',
  },
  {
    label: 'Array',
    description: 'A collection of similar types',
  },
  {
    label: 'Object',
    description: 'Multiple types',
  },
  {
    label: 'Record',
    description: 'Fixed collection',
  },
  {
    label: 'Set',
    description: 'Collection of unique values',
  },
  {
    label: 'JSON',
    description: 'A JSON object',
  },
  {
    label: 'Reference',
    description: 'Single Ref',
  },
  {
    label: 'References',
    description: 'Multiple Refs',
  },
  {
    label: 'Cardinality',
    description: 'From math',
  },
]
