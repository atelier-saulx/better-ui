import * as React from 'react'
import { FileInput } from '.'
import { useUploadFile } from '../../utils/hooks/useUploadFile'
import { Provider } from '@based/react'
import based from '@based/client'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Atoms/Inputs/FileInput',
}
export default meta

export const Default = () => {
  return (
    <FileInput
      onChange={(file) => {
        console.log('file', file)
      }}
    />
  )
}

export const Small = () => {
  return (
    <FileInput
      variant="small"
      onChange={(file) => {
        console.log('file', file)
      }}
    />
  )
}

export const Error = () => {
  return <FileInput status="error" />
}

const RealUploadContent = () => {
  const { handleFileInputChange, status, progress } = useUploadFile()

  return (
    <FileInput
      label="Avatar"
      status={status}
      progress={progress}
      onChange={handleFileInputChange((file) => {
        console.log('uploaded file', file)
      })}
    />
  )
}

export const RealUpload = () => {
  return (
    <Provider client={client}>
      <RealUploadContent />
    </Provider>
  )
}
