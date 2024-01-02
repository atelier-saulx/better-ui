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
  const { confirm, alert } = Modal.useModal()

  return (
    <div>
      <Button
        onClick={async () => {
          const res = await confirm('Yes??')
          return alert(res ? 'YES' : 'NO')
        }}
      >
        Confirm
      </Button>
    </div>
  )
}

const Ctx = React.createContext(null)

const CtxModal = () => {
  const ctx = React.useContext(Ctx)
  return <div>My context is: {ctx}</div>
}

export const ModalCtx = () => {
  const { open } = Modal.useModal()
  const modal1 = Modal.useModal()
  const modal2 = Modal.useModal()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Button
        onClick={async () => {
          return open(<CtxModal />)
        }}
      >
        Open modal without context
      </Button>
      <Ctx.Provider value="total success 1">
        <modal1.Provider />
        <Button
          onClick={async () => {
            return modal1.open(<CtxModal />)
          }}
        >
          Open modal with context 1
        </Button>
      </Ctx.Provider>
      <Ctx.Provider value="total success 2">
        <modal2.Provider />
        <Button
          onClick={async () => {
            return modal2.open(<CtxModal />)
          }}
        >
          Open modal with context 2
        </Button>
      </Ctx.Provider>
    </div>
  )
}

export const ModalConfirm = () => {
  const { open } = Modal.useModal()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Button
        onClick={async () => {
          const result = await open(({ close }) => (
            <Modal
              onConfirm={() => {
                close('yay')
              }}
            >
              xxx
            </Modal>
          ))

          console.log({ result })
        }}
      >
        Open modal
      </Button>
      <Button
        onClick={async () => {
          const result = await open(({ close }) => (
            <Button
              onClick={() => {
                close('supercool')
              }}
            >
              cool stuff
            </Button>
          ))

          console.log({ result })
        }}
      >
        Open modal 2
      </Button>
    </div>
  )
}
