import * as React from 'react'
import { styled } from 'inlines'
import {
  Attachment,
  Delete,
  Download,
  MoreHorizontal,
  OpenInNew,
  Upload,
} from '../icons'
import { Dropdown } from '../dropdown'
import { BasedSchemaContentMediaType } from '@based/schema'
import { useHover } from '../../utils/hooks/use-hover'
import { Text } from '../text'
import { Stack } from '../layout'

type Status = 'initial' | 'uploading' | 'success' | 'error'
type Variant = 'minimal' | 'extensive'

// Global file upload hook to based to see upload progress
export type FileInputProps = {
  onChange?: (file?: File) => void
  // FIXME: do we rly want label and formname>?
  formName?: string
  label?: string
  // FIXME: should this not update with a listener? - dont waant to add the status...
  status?: Status
  progress?: number
  mimeType?: BasedSchemaContentMediaType
  value?: {
    name?: string
    mimeType?: BasedSchemaContentMediaType
    src?: string
  }
  variant?: Variant
}

// ADD DROP OVER

export function FileInput({
  onChange,
  label,
  status: statusProp,
  progress: progressProp,
  mimeType,
  value,
  variant = 'extensive',
}: FileInputProps) {
  // Allow paste of url as well...

  // controlled
  const [file, setFile] = React.useState<File | null>()

  const [filePreview, setFilePreview] = React.useState<string | null>(null)
  const [internalStatus, setInternalStatus] = React.useState<Status>('initial')
  const [internalProgress, setInternalProgress] = React.useState(0)
  const status = statusProp ?? internalStatus
  const progress = progressProp ?? internalProgress
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (value?.src) {
      console.log('VALUE', value?.src)

      fetch(value?.src)
        .then((r) => r.blob())
        .then((blob) => {
          const end = value.src?.split('/') ?? []
          const n: string = end[end.length - 1] ?? ''
          const extension = (n.split('.')[1] ?? '').toLowerCase()
          setInternalStatus('success')
          const mime =
            value.mimeType ??
            (extension === 'jpg' ||
              extension === 'jpeg' ||
              extension === 'png' ||
              extension === 'gif')
              ? `image/${extension}`
              : ''

          const file = new File([blob], value.name ?? n, {
            type: mime,
          })

          if (blob.size && mime.startsWith('image/')) {
            const objectURL = URL.createObjectURL(file)
            setFilePreview(objectURL)
          }
          setFile(file)
        })
      // make this better ofc
    }
  }, [value?.src])

  const { listeners, hover } = useHover()

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      {...listeners}
      // onDrop={(e) => {
      //   e.preventDefault()
      // }}
    >
      {label && (
        <span
          style={{
            marginBottom: 8,
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      )}
      {
        <Status
          variant={variant}
          status={status}
          progress={progress}
          filePreview={filePreview}
          file={file}
          hover={hover}
          setInternalStatus={setInternalStatus}
          setFile={setFile}
          setFilePreview={setFilePreview}
          setInternalProgress={setInternalProgress}
          onChange={onChange}
          inputRef={inputRef}
        />
      }
      <input
        ref={inputRef}
        type="file"
        accept={mimeType}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return
          try {
            setInternalStatus('uploading')
            setFile(file)
            if (file.type.includes('image/')) {
              const objectURL = URL.createObjectURL(file)
              setFilePreview(objectURL)
            }
            setInternalProgress(100)
            setInternalStatus('success')
            onChange?.(file)
          } catch {
            setInternalStatus('error')
            setFile(null)
            setFilePreview(null)
            setInternalProgress(0)
            if (inputRef.current) {
              inputRef.current.value = ''
            }
          }
        }}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          borderWidth: '0',
        }}
      />
    </label>
  )
}

// ------------- STATUS -------------------
function StyledStatus({
  variant,
  status,
  children,
}: {
  variant: Variant
  status: Status
  children: React.ReactNode
}) {
  return (
    <styled.div
      style={
        variant === 'minimal'
          ? {}
          : {
              padding: '8px 12px',
              borderRadius: 'var(--radius-small)',
              ...(status === 'initial' && {
                cursor: 'pointer',
                border: '1px dashed var(--interactive-secondary)',
                '&:hover': {
                  border: '1px dashed var(--interactive-secondary-hover)',
                },
              }),
              ...(status === 'uploading' && {
                border: '1px solid var(--interactive-secondary)',
              }),
              ...(status === 'success' && {
                border: '1px solid var(--interactive-secondary)',
              }),
              ...(status === 'error' && {
                cursor: 'pointer',
                border: '1px dashed var(--sentiment-negative)',
                '&:hover': {
                  border: '1px dashed var(--sentiment-negative-hover)',
                },
              }),
            }
      }
    >
      {children}
    </styled.div>
  )
}

function Status({
  variant,
  status,
  progress,
  filePreview,
  file,
  hover,
  setInternalStatus,
  setFile,
  setFilePreview,
  setInternalProgress,
  onChange,
  inputRef,
}: {
  variant: Variant
  status: Status
  progress: number
  filePreview: string | null
  file: File | null | undefined
  hover: boolean
  // tmp
  setInternalStatus: React.Dispatch<React.SetStateAction<Status>>
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>
  setFilePreview: React.Dispatch<React.SetStateAction<string | null>>
  setInternalProgress: React.Dispatch<React.SetStateAction<number>>
  onChange: ((file?: File) => void) | undefined
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}) {
  return (
    <StyledStatus variant={variant} status={status}>
      {status === 'initial' && (
        <Stack gap={12} justify="start">
          <Upload />
          <Text>Upload file</Text>
        </Stack>
      )}
      {status === 'uploading' && <UploadingStatus progress={progress} />}
      {status === 'success' && (
        <styled.div
          style={{
            display: 'flex',
            justifyContent: variant === 'minimal' ? 'start' : 'center',
            alignItems: 'center',
            '& > * + *': { marginLeft: '8px' },
          }}
        >
          {filePreview ? (
            <img
              src={filePreview}
              style={{
                height: variant === 'minimal' ? 32 : 48,
                width: variant === 'minimal' ? 32 : 48,
                borderRadius: 'var(--radius-small)',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Attachment />
          )}
          <div
            style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500 }}
          >
            {file?.name}
          </div>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <styled.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: hover ? 1 : 0,
                  outline: 'none',
                  background: 'transparent',
                  padding: '2px',
                  borderRadius: 4,
                  marginLeft: 'auto',
                  transition: 'opacity 0.1s',
                  cursor: 'pointer',
                  color: 'var(--content-primary)',
                  '&:hover': {
                    background: 'var(--background-neutral)',
                  },
                }}
              >
                <MoreHorizontal />
              </styled.div>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item
                icon={<OpenInNew />}
                onClick={() => {
                  if (!file) return
                  const url = URL.createObjectURL(file)
                  window.open(url, '_blank', 'noopener,noreferrer')
                }}
              >
                Open in new tab
              </Dropdown.Item>
              <Dropdown.Item
                icon={<Download />}
                onClick={() => {
                  if (!file) return

                  const url = URL.createObjectURL(file)
                  const link = document.createElement('a')
                  link.download = file.name
                  link.href = url
                  link.click()
                }}
              >
                Download
              </Dropdown.Item>
              <Dropdown.Item
                icon={<Delete />}
                onClick={() => {
                  setInternalStatus('initial')
                  setFile(null)
                  setFilePreview(null)
                  setInternalProgress(0)
                  onChange?.()
                  if (inputRef.current) {
                    inputRef.current.value = ''
                  }
                }}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        </styled.div>
      )}
      {status === 'error' && (
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
            '& > * + *': { marginLeft: '8px' },
          }}
        >
          <Upload />
          <div
            style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500 }}
          >
            An error has occured
          </div>
        </styled.div>
      )}
    </StyledStatus>
  )
}

function UploadingStatus({ progress }: { progress: number }) {
  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        '& > * + *': { marginLeft: '8px' },
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ transform: 'rotate(270deg)' }}
      >
        <circle
          cx="10"
          cy="10"
          r="7"
          stroke="var(--interactive-secondary)"
          strokeWidth="2"
        />
        <circle
          cx="10"
          cy="10"
          r="7"
          stroke="var(--interactive-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - (5 + progress * 0.95)}
        />
      </svg>
      <div style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500 }}>
        Uploading...
      </div>
    </styled.div>
  )
}
