import React from 'react'
import { Text, Page } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'

export const SchemaMain = () => {
  const [type] = useContextState('type', '')

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  return <div>{type}</div>
}
