import { Preview } from '@storybook/react'

import '../styles/reset.css'
import '../styles/variables.css'
import '../styles/fonts.css'
import '../styles/keyframes.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    layout: 'centered',
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
  },
}

export default preview
