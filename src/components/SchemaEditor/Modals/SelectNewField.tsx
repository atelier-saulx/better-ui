import * as React from 'react'
import { Button } from '../../Button/index.js'
import { IconPlus } from '../../Icons/index.js'
import { Modal } from '../../Modal/index.js'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Container } from '../../Container/index.js'
import { Thumbnail } from '../../Thumbnail/index.js'
import { AddField } from './AddField.js'
import { SemanticVariant, color } from '../../../utils/colors.js'
import { SCHEMA_FIELDS } from '../constants.js'

const filterOutTheseFields = ['id', 'type', 'email', 'digest', 'url']

type SelectNewFieldProps = {
  typeName: string
  fieldItem?: {}
}

export const SelectNewField = ({
  typeName,
  fieldItem,
}: SelectNewFieldProps) => {
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
          maxWidth: 736,
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
                borderRadius: 8,
                background: color('semantic-background', 'neutral-muted'),
                border: '1px solid transparent !important',
              }}
            />
            <div>
              {Object.keys(SCHEMA_FIELDS)
                .filter((item) => !filterOutTheseFields.includes(item))
                .filter(
                  (item) =>
                    SCHEMA_FIELDS[item].label
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    SCHEMA_FIELDS[item].description
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                )
                .map((item, idx) => (
                  <Container
                    style={{
                      maxWidth: 334,
                      width: '48%',
                      display: 'inline-block',
                      margin: '1%',
                    }}
                    key={idx}
                    title={SCHEMA_FIELDS[item].label}
                    description={SCHEMA_FIELDS[item].description}
                    prefix={
                      <Thumbnail
                        icon={SCHEMA_FIELDS[item].icon}
                        color={SCHEMA_FIELDS[item].color as SemanticVariant}
                        style={{ marginRight: 4 }}
                      />
                    }
                    onClick={async () => {
                      close()
                      setSearchValue('')

                      const fieldMeta = await open(({ close }) => (
                        <AddField
                          fieldType={SCHEMA_FIELDS[item].label}
                          typeName={typeName}
                          onConfirm={close}
                          // if nested
                          fieldItem={fieldItem}
                        />
                      ))

                      console.log('BBBB', fieldMeta)
                      // console.log('ClosedFLAP', result)
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
