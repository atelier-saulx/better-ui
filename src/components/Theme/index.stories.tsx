import * as React from 'react'
import { ThemeProvider } from 'inlines'
import { styled } from 'inlines'

const meta = {
  title: 'Atoms/Theme',
  component: () => {},
}

export default meta

export function Default() {
  return (
    <ThemeProvider
      theme={{
        primary: 'blue',
        'primary:hover': 'lightblue',
      }}
    >
      <styled.button
        style={{
          background: 'primary',
          '&:hover': {
            background: 'primary:hover',
          },
        }}
      >
        Hello world
      </styled.button>
    </ThemeProvider>
  )
}
