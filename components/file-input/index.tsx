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
import { color } from '../../utils/vars'
import { Text } from '../text'
import { Stack } from '../layout'

type Status = 'initial' | 'uploading' | 'success' | 'error'

export type FileInputProps = {
  onChange?: (file?: File) => void
  formName?: string
  label?: string
  status?: Status
  progress?: number
  allowedType?: BasedSchemaContentMediaType
  value?: string
  variant?: 'minimal' | 'extended'
}

// add drop

export function FileInput({
  onChange,
  label,
  status: statusProp,
  progress: progressProp,
  allowedType,
  value,
  variant = 'extended',
}: FileInputProps) {
  const [file, setFile] = React.useState<File | null>(null)
  const [filePreview, setFilePreview] = React.useState<string | null>(null)
  const [internalStatus, setInternalStatus] = React.useState<Status>('initial')
  const [internalProgress, setInternalProgress] = React.useState(0)
  const status = statusProp ?? internalStatus
  const progress = progressProp ?? internalProgress
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const { listeners, hover } = useHover()

  // state for drop

  // elipsis

  // add value

  // add allowedtype

  // value object { name?, mime?, src string }

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

        // color: color('content', hover ? 'primary' : 'secondary'),
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
        {status === 'initial' && (
          <Stack gap={12} justify="start">
            <Upload />
            <Text>Upload file</Text>
          </Stack>
        )}
        {status === 'uploading' && (
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
            <div
              style={{ fontSize: '14px', lineHeight: '24px', fontWeight: 500 }}
            >
              Uploading...
            </div>
          </styled.div>
        )}
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
      </styled.div>
      <input
        ref={inputRef}
        type="file"
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
