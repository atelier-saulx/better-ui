import * as React from 'react'
import { Button } from '../../Button/index.js'
import {
  IconFormatBold,
  IconPlus,
  IconQuote,
  IconText,
} from '../../Icons/index.js'
import { Modal } from '../../Modal/index.js'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Container } from '../../Container/index.js'
import { Thumbnail } from '../../Thumbnail/index.js'
import { FieldModal } from './FieldModal.js'
import { color } from '../../../utils/colors.js'

export const AddField = ({}) => {
  const [searchValue, setSearchValue] = React.useState('')
  const { open } = Modal.useModal()

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button size="small" variant="primary-transparent">
          <IconPlus style={{ marginRight: 8 }} /> Add Field
        </Button>
      </Modal.Trigger>
      <Modal.Overlay
        style={{
          width: 'calc(100vw - 48px)',
          maxWidth: 750,
        }}
      >
        {({ close }) => (
          <div style={{ padding: 24, overflow: 'overlay' }}>
            <Text variant="title-modal" style={{ marginBottom: 16 }}>
              Add a new field to your schema type
            </Text>
            <TextInput
              placeholder="Search for a field"
              value={searchValue}
              onChange={(v) => setSearchValue(v)}
              style={{
                marginBottom: 16,
                '& input': {
                  background: color('semantic-background', 'neutral-muted'),
                  border: '1px solid transparent !important',
                },
              }}
            />
            <div>
              {SCHEMA_FIELDS.filter(
                (item) =>
                  item.label
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                  item.description
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              ).map((item, idx) => (
                <Container
                  style={{
                    maxWidth: 334,
                    width: '48%',
                    display: 'inline-block',
                    margin: '1%',
                  }}
                  key={idx}
                  title={item.label}
                  description={item.description}
                  prefix={
                    <Thumbnail
                      icon={item?.icon}
                      color={item?.color}
                      style={{ marginRight: 4 }}
                    />
                  }
                  onClick={async () => {
                    close()
                    setSearchValue('')
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
          </div>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}

// ;'neutral' |
//   'informative' |
//   'positive' |
//   'warning' |
//   'error' |
//   'auto-muted' |
//   'neutral-muted' |
//   'informative-muted' |
//   'positive-muted' |
//   'warning-muted' |
//   'error-muted'

export const SCHEMA_FIELDS = [
  {
    label: 'String',
    description: 'Non internationalized string',
    icon: <IconQuote />,
    color: 'informative-muted',
  },
  {
    label: 'Text',
    description: 'Text with formatting',
    icon: <IconText />,
    color: 'informative-muted',
  },
  {
    label: 'Rich Text',
    description: 'Texteditor with styling controls',
    icon: <IconFormatBold />,
    color: 'informative-muted',
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
