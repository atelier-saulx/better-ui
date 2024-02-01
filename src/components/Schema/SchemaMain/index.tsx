import React from 'react'
import { Text, Page, CheckboxInput } from '../../../index.js'
import { useContextState } from '../../../hooks/ContextState/index.js'
import { Header } from './Header.js'

export const SchemaMain = ({ schema }) => {
  const [type] = useContextState('type', '')

  console.log('schema from MAIN 🌝, ', schema)
  const description = schema.types[type]?.description

  if (!type) {
    return (
      <Page>
        <Text>Select a type!</Text>
      </Page>
    )
  }

  return (
    <Page>
      <Header description={description} />
      <CheckboxInput label="Show system fields" style={{ marginBottom: 16 }} />
      FEILDS
    </Page>
  )
}
