import * as React from 'react'
import { Modal, Button, TextInput, SelectInput } from '../../index.js'
import { styled } from 'inlines'

const meta = {
  title: 'Components/Modal',
  decorators: [
    (Story) => (
      <Modal.Provider>
        <Story />
      </Modal.Provider>
    ),
  ],
}

export default meta

export const Default = () => {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title
              title="Add custom view"
              description="This is your organisation’s name within Based. For example, you can use the name of your company or department."
            />
            <Modal.Body>
              <styled.div
                style={{
                  '& > * + *': {
                    marginTop: '24px',
                  },
                }}
              >
                <TextInput label="Name" />
                <SelectInput
                  label="Language"
                  options={[
                    { label: 'English', value: 'english', prefix: '🇺🇸' },
                    { label: 'Hungarian', value: 'hungarian', prefix: '🇭🇺' },
                  ]}
                />
              </styled.div>
            </Modal.Body>
            <Modal.Actions>
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
              <Button>Save</Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}

export const Nested = ({ level = 0 }) => {
  return (
    <Modal.Root>
      <Modal.Trigger>
        <Button>Open modal</Button>
      </Modal.Trigger>
      <Modal.Overlay>
        {({ close }) => (
          <>
            <Modal.Title title={`Modal #${level}`} />
            <Modal.Actions>
              <Nested level={level + 1} />
              <Button variant="neutral" onClick={close}>
                Cancel
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal.Overlay>
    </Modal.Root>
  )
}

export const List = ({ level = 0 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {Array.from({ length: 5 }).map(() => {
        return (
          <Modal.Root>
            <Modal.Trigger>
              <Button>Open modal</Button>
            </Modal.Trigger>
            <Modal.Overlay>
              {({ close }) => (
                <>
                  <Modal.Title title={`Modal #${level}`} />
                  <Modal.Actions>
                    <Nested level={level + 1} />
                    <Button variant="neutral" onClick={close}>
                      Cancel
                    </Button>
                  </Modal.Actions>
                </>
              )}
            </Modal.Overlay>
          </Modal.Root>
        )
      })}
    </div>
  )
}

export const Open = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={() => {
        modal.open(<Modal title="xxx">Imma body</Modal>)
      }}
    >
      Open
    </Button>
  )
}

export const Alert = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={() => {
        modal.alert('Hello')
      }}
    >
      Alert
    </Button>
  )
}

export const Prompt = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={async () => {
        const res = await modal.prompt('Hello?')
        if (res) {
          return modal.alert(res)
        }
      }}
    >
      Prompt
    </Button>
  )
}

export const Confirm = () => {
  const modal = Modal.useModal()

  return (
    <Button
      onClick={async () => {
        const res = await modal.confirm('Yes?')
        return modal.alert(res ? 'YES' : 'NO')
      }}
    >
      Confirm
    </Button>
  )
}
