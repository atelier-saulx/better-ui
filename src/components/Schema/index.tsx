import React from 'react'
import { Stack } from '../Stack/index.js'
import { SchemaLeft } from './SchemaLeft/index.js'
import { SchemaMain } from './SchemaMain/index.js'
import { StateProvider } from '../../hooks/ContextState/index.js'
import { Style } from 'inlines'
import { SchemaConfirm } from './SchemaConfirm.js'
import { useClient } from '@based/react'
import { useContextState } from '../../hooks/ContextState/index.js'
import { deepCopy } from '@saulx/utils'

type SchemaProps = {
  schemaInput: {}
  style?: Style
  values?: { field: string[]; type: string; db: string }
  onChange?: (key: string, val: any) => void
}

export const Schema = ({
  schemaInput,
  style,
  values,
  onChange,
}: SchemaProps) => {
  const OgSchema = deepCopy(schemaInput)

  const [schema, setSchema] = React.useState(deepCopy(schemaInput))
  const [somethingChanged, setSomethingChanged] = React.useState(false)
  const [renderCounter, setRenderCounter] = React.useState(1)

  console.log('OG', OgSchema)
  console.log('SCHEMA INPUT', schemaInput)

  const client = useClient()
  const [db] = useContextState('db', 'default')

  const onCancel = () => {
    setRenderCounter(renderCounter + 1)
    setSchema({ ...OgSchema })
    setSomethingChanged(false)
  }

  const onConfirm = async () => {
    setSomethingChanged(false)
    console.log('CONFIRM THIS 🦧')
    await client.call('db:set-schema', {
      db,
      mutate: true,
      schema: schema,
    })
  }

  return (
    <>
      {somethingChanged && (
        <SchemaConfirm
          onCancel={onCancel}
          onConfirm={onConfirm}
          hasChanges={somethingChanged}
        />
      )}
      <Stack style={{ ...style }} justify="start" align="start">
        <StateProvider values={values} onChange={onChange}>
          <SchemaLeft schema={schema} />

          {renderCounter && (
            <SchemaMain
              schema={schema}
              setSchema={setSchema}
              setSomethingChanged={setSomethingChanged}
            />
          )}
        </StateProvider>
      </Stack>
    </>
  )
}
