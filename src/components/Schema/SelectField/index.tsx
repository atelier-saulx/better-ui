import * as React from 'react'
import { Button } from '../../Button/index.js'
import { IconPlus } from '../../Icons/index.js'
import { Modal } from '../../Modal/index.js'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { Thumbnail } from '../../Thumbnail/index.js'
import { AddField } from '../Modals/AddField.js'
import { NonSemanticColor, color } from '../../../utils/colors.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { SCHEMA_FIELDS } from '../constants.js'
import { Stack } from '../../Stack/index.js'
import { styled } from 'inlines'

const filterOutTheseFields = ['id', 'type', 'email', 'digest', 'url']

type SelectNewFieldProps = {
  light?: boolean
  path?: string[]
  setSchema?: ({}) => void
  schema?: {}
  setSomethingChanged?: (v: boolean) => boolean
}

export const SelectField = ({
  light,
  path,
  setSchema,
  schema,
  setSomethingChanged,
}: SelectNewFieldProps) => {
  const [searchValue, setSearchValue] = React.useState('')
  const { open } = Modal.useModal()

  const [type, setType] = useContextState('type')

  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button
          variant={light ? 'neutral-transparent' : 'neutral-transparent'}
          size={light ? 'small' : 'regular'}
          prefix={<IconPlus />}
        >
          Add Field
        </Button>
      </Modal.Trigger>
      <Modal.Overlay
        style={{
          width: 'calc(100vw - 48px)',
          maxWidth: 676,
        }}
      >
        {({ close }) => (
          <div style={{ padding: 24 }}>
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
                background: color('background', 'muted'),
                '& input': {
                  border: '1px solid transparent !important',
                },
              }}
            />
            <Stack grid={300} gap={8}>
              {Object.keys(SCHEMA_FIELDS)
                .filter((item) => !filterOutTheseFields.includes(item))
                .filter(
                  (item) =>
                    SCHEMA_FIELDS[item].label
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()) ||
                    SCHEMA_FIELDS[item].description
                      .toLowerCase()
                      .includes(searchValue.toLowerCase()),
                )
                .map((item, idx) => (
                  <Stack
                    justify="start"
                    style={{
                      padding: '4px 8px',
                      borderRadius: 8,
                      '&:hover': {
                        backgroundColor: color('background', 'neutral'),
                      },
                    }}
                    gap={16}
                    key={idx}
                    onClick={async () => {
                      close()
                      setSearchValue('')

                      const fieldMeta = await open(({ close }) => (
                        <AddField
                          fieldType={SCHEMA_FIELDS[item].label}
                          typeTitle={type}
                          onConfirm={close}
                          path={path}
                          setSchema={setSchema}
                          schema={schema}
                          setSomethingChanged={setSomethingChanged}
                        />
                      ))
                    }}
                  >
                    <Thumbnail
                      icon={SCHEMA_FIELDS[item].icon}
                      outline
                      color={SCHEMA_FIELDS[item].color as NonSemanticColor}
                      style={{
                        '& svg': {
                          width: 16,
                          height: 16,
                        },
                      }}
                      size="small"
                    />

                    <styled.div>
                      <Text variant="body-bold">
                        {SCHEMA_FIELDS[item].label}
                      </Text>
                      <Text
                        variant="body-light"
                        style={{ fontSize: 12, lineHeight: '16px' }}
                      >
                        {SCHEMA_FIELDS[item].description}
                      </Text>
                    </styled.div>
                  </Stack>
                ))}
            </Stack>
          </div>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}
