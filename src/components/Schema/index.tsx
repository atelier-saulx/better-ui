import React, { useEffect } from 'react'
import { Stack } from '../Stack/index.js'
import { SchemaLeft } from './SchemaLeft/index.js'
import { SchemaMain } from './SchemaMain/index.js'
import { StateProvider } from '../../hooks/ContextState/index.js'
import { Style } from 'inlines'
import { SchemaConfirm } from './SchemaConfirm.js'
import { useClient } from '@based/react'
import { useContextState } from '../../hooks/ContextState/index.js'
import { deepCopy } from '@saulx/utils'
import { styled } from 'inlines'

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

  useEffect(() => {
    // fixes the type options
    setSchema(deepCopy(schemaInput))
  }, [schemaInput])

  const client = useClient()
  const [db] = useContextState('db', 'default')

  const onCancel = () => {
    setRenderCounter(renderCounter + 1)
    setSchema({ ...OgSchema })
    setSomethingChanged(false)
  }

  const onConfirm = async () => {
    setSomethingChanged(false)
    await client.call('db:set-schema', {
      db,
      mutate: true,
      schema: schema,
    })
  }

  return (
    <>
      <Stack style={{ ...style }} justify="start" align="start">
        <StateProvider values={values} onChange={onChange}>
          <SchemaLeft schema={schema} />
          {renderCounter && (
            <SchemaMain
              schema={schema}
              setSchema={setSchema}
              setSomethingChanged={setSomethingChanged}
              somethingChanged={somethingChanged}
              onCancel={onCancel}
              onConfirm={onConfirm}
            />
          )}
        </StateProvider>
      </Stack>
    </>
  )
}
