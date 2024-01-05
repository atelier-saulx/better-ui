import * as React from 'react'
import { Text } from '../../Text/index.js'
import { TextInput } from '../../TextInput/index.js'
import { TextAreaInput } from '../../TextAreaInput/index.js'
import { Stack } from '../../Stack/index.js'
import { Button } from '../../Button/index.js'
import { Modal } from '../../Modal/index.js'
import { IconPlus } from '../../Icons/index.js'

export const AddType = () => {
  const { open } = Modal.useModal()

  type typeObjProps = {
    name?: string
    meta: { name?: string; displayName?: string; description?: string }
  }

  // todo @yves fix typescript any here
  const [typeObj, setTypeObj] = React.useState<typeObjProps | any>({
    meta: {},
  })

  return (
    <Button
      style={{ marginBottom: '32px' }}
      onClick={async () => {
        const result = await open(({ close }) => (
          <Modal
            onConfirm={() => {
              close(typeObj)
            }}
          >
            <Stack gap={12} grid>
              <div>
                <Text variant="bodyBold">Create a new type</Text>
                <Text color="secondary">
                  Add your own custom type to the schema.
                </Text>
              </div>
              <TextInput
                label="Type name"
                onChange={(v) => {
                  setTypeObj((typeObj.name = v))
                  setTypeObj((typeObj.meta.name = v))
                }}
                value={typeObj.name}
              />
              <TextInput
                label="Display name (plural)"
                onChange={(v) => setTypeObj((typeObj.meta.displayName = v))}
              />
              <TextAreaInput
                label="Description"
                onChange={(v) => setTypeObj((typeObj.meta.description = v))}
              />
            </Stack>
          </Modal>
        ))
        console.log({ result })
      }}
      variant="neutral"
    >
      <IconPlus />
      Add a new type
    </Button>
  )
}
