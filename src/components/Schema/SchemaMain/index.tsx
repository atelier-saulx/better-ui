import React from 'react'
import { Text, Page } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { Header } from './Header.js'

export const SchemaMain = () => {
  const [type] = useContextState('type', '')

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  return (
    <Page>
      <Header />
    </Page>
  )
}
