import * as React from 'react'
import { ThemeProvider } from 'inlines'

const meta = {
  title: 'Atoms/Theme',
  component: () => {},
}

export default meta

export function Default() {
  return (
    <ThemeProvider theme={{}}>
      <div>asd</div>
    </ThemeProvider>
  )
}
