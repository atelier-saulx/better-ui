import * as React from 'react'
import { Form, Modal } from '../../../index.js'

const meta = {
  title: 'Form/RichText',
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

export const RichTextEditor = () => {
  const [state, setState] = React.useState<any>({
    text: '',
  })

  React.useEffect(() => {
    const interval = setInterval(() => {
      setState((state) => ({ ...state, text: state.text + '<p>a</p>' }))
    }, 500)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Form
      variant="small"
      values={state}
      fields={{
        text: {
          type: 'text',
          format: 'html',
        },
        moreText: {
          type: 'text',
          format: 'html',
        },
      }}
      onChange={(values) => {
        setState(values)
      }}
    />
  )
}
