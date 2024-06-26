import * as React from 'react'
import { useUploadFile, FileInput } from '../../index.js'
import { Provider } from '@based/react'
import based from '@based/client'

const client = based({
  org: 'saulx',
  project: 'based-ui',
  env: 'production',
})

const meta = {
  title: 'Inputs/FileInput',
}
export default meta

export const Default = () => {
  return (
    <FileInput
      onChange={(file) => {}}
      label="upload some file"
      description="drop a file in here"
    />
  )
}

export const Small = () => {
  return <FileInput variant="small" onChange={(file) => {}} />
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
      onChange={handleFileInputChange((file) => {})}
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
