import * as React from 'react'
import { styled, Style } from 'inlines'
import { BasedSchemaContentMediaType } from '@based/schema'
import {
  IconDelete,
  IconDownload,
  IconMoreHorizontal,
  IconOpenInNew,
  IconUpload,
  Dropdown,
  useHover,
  Text,
  Stack,
  borderRadius,
  color,
  Media,
  border,
} from '../../index.js'

import { FileDrop } from 'react-file-drop'

// add detached variant that you get access to the file

type Status = 'initial' | 'uploading' | 'success' | 'error'
type Variant = 'regular' | 'small' | 'no-preview'

// global file upload hook to based to see upload progress
export type FileInputProps = {
  onChange?: (file: File | void, updateProgress: (p: number) => void) => void
  // FIXME: do we rly want label and formname>?
  formName?: string
  label?: string
  description?: string
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
  disabled?: boolean
  style?: Style
}

export function FileInput({
  onChange,
  label,
  description,
  status: statusProp,
  progress: progressProp,
  mimeType,
  value,
  variant = 'regular',
  disabled,
  style,
}: FileInputProps) {
  // Allow paste of url as well...

  // controlled
  const [file, setFile] = React.useState<File | null>()

  const [internalStatus, setInternalStatus] = React.useState<Status>('initial')
  const [internalProgress, setInternalProgress] = React.useState(0)
  const status = statusProp ?? internalStatus
  const progress = progressProp ?? internalProgress
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  // can be a bit nicer
  React.useEffect(() => {
    if (value?.src) {
      fetch(value.src)
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

          setFile(file)
        })
        .catch((e) => {})
    }
  }, [value?.src])

  const { listeners, hover } = useHover()
  const [dragOver, setDragOver] = React.useState(false)

  return (
    <styled.label
      style={{
        opacity: disabled ? 0.6 : 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingLeft: variant === 'small' && dragOver ? 4 : null,
        backgroundColor:
          dragOver && variant !== 'small'
            ? color('background', 'neutral')
            : null,
        // cursor: disabled ? 'not-allowed' : 'default',
        pointerEvents: disabled ? 'none' : 'auto',
        overflow: 'hidden',
        ...style,
      }}
      {...listeners}
    >
      <FileDrop
        onDrop={(files) => {
          if (files) {
            setFile(files[0])
            setInternalStatus('success')
          }
          setDragOver(false)
        }}
        onDragOver={() => {
          setDragOver(true)
        }}
        onDragLeave={() => {
          setDragOver(false)
        }}
      >
        {label && (
          <Text
            singleLine
            variant="body-bold"
            style={{
              marginBottom: 8,
            }}
          >
            {label}
          </Text>
        )}
        {
          <Status
            variant={variant}
            status={status}
            progress={progress}
            file={file}
            hover={hover}
            setInternalStatus={setInternalStatus}
            setFile={setFile}
            setInternalProgress={setInternalProgress}
            onChange={onChange}
            inputRef={inputRef}
          />
        }
        <styled.input
          tabIndex={disabled ? '-1' : 0}
          ref={inputRef}
          type="file"
          accept={mimeType}
          onChange={(e: any) => {
            const file = e.target.files?.[0]
            if (!file) return
            try {
              setInternalStatus('uploading')
              setFile(file)
              onChange?.(file, (p) => {
                setInternalProgress(p)
                if (p === 100) {
                  setInternalStatus('success')
                }
              })
            } catch (e) {
              setInternalStatus('error')
              setFile(null)
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
      </FileDrop>
      {description !== undefined ? (
        <Text color="secondary" variant="body-bold" style={{ marginTop: 8 }}>
          {description}
        </Text>
      ) : null}
    </styled.label>
  )
}

// ------------- STATUS -------------------
// TODO: refactor a bit better
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
        variant === 'small'
          ? {}
          : {
              padding: '8px 12px',
              borderRadius: borderRadius('small'),
              ...(status === 'initial' && {
                cursor: 'pointer',
                border: `1px dashed ${color('interactive', 'secondary')} `,
                '&:hover': {
                  border: `1px dashed ${color('interactive', 'secondary-hover')} `,
                },
              }),
              ...(status === 'uploading' && {
                border: border(),
              }),
              ...(status === 'success' && {
                border: border(),
              }),
              ...(status === 'error' && {
                cursor: 'pointer',
                border: `1px dashed ${color('semantic-background', 'error')} `,
                '&:hover': {
                  border: `1px dashed ${color('semantic-background', 'error-hover')}`,
                },
              }),
            }
      }
    >
      {children}
    </styled.div>
  )
}

// TODO ugly make it better....
function Status({
  variant,
  status,
  progress,
  file,
  hover,
  setInternalStatus,
  setFile,
  setInternalProgress,
  onChange,
  inputRef,
}: {
  variant: Variant
  status: Status
  progress: number
  file: File | null | undefined
  hover: boolean
  setInternalStatus: React.Dispatch<React.SetStateAction<Status>>
  setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>
  setInternalProgress: React.Dispatch<React.SetStateAction<number>>
  onChange:
    | ((file: File | void, updateProgress: (p: number) => void) => void)
    | undefined
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}) {
  const [filePreview, setFilePreview] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (file) {
      if (file.type.startsWith('image/') && file.size) {
        const objectURL = URL.createObjectURL(file)
        setFilePreview(objectURL)
      }
    } else {
      setFilePreview(null)
    }
  }, [file])

  return (
    <StyledStatus variant={variant} status={status}>
      {status === 'initial' && (
        <Stack gap={12} justify="start">
          <IconUpload />
          <Text singleLine>Upload file</Text>
        </Stack>
      )}
      {status === 'uploading' && <UploadingStatus progress={progress} />}
      {status === 'success' && (
        <Stack gap={12} justify={variant === 'small' ? 'start' : 'between'}>
          <Stack
            gap={12}
            justify={'start'}
            style={{
              flexGrow: variant === 'small' ? null : 1,
              width: 'auto',
            }}
          >
            <styled.div
              style={{
                height: variant === 'small' ? 32 : 48,
                width: variant === 'small' ? 32 : 48,
                backgroundColor: color('background', 'neutral'),
                borderRadius: borderRadius('small'),
              }}
            >
              <Media
                type={file?.type as BasedSchemaContentMediaType}
                src={filePreview}
                variant="cover"
              />
            </styled.div>

            <Text
              style={{ maxWidth: variant === 'small' ? 200 : undefined }}
              singleLine
            >
              {file?.name}
            </Text>
          </Stack>
          <Dropdown.Root>
            <Dropdown.Trigger>
              <styled.div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: hover ? 1 : variant === 'small' ? 0 : 0.5,
                  outline: 'none',
                  background: 'transparent',
                  padding: '2px',
                  borderRadius: 4,
                  transition: 'opacity 0.1s',
                  cursor: 'pointer',
                  color: color('content', 'primary'),
                  '&:hover': {
                    background: color('background', 'neutral'),
                  },
                }}
              >
                <IconMoreHorizontal />
              </styled.div>
            </Dropdown.Trigger>
            <Dropdown.Items>
              <Dropdown.Item
                icon={<IconOpenInNew />}
                onClick={() => {
                  if (!file) return
                  const url = URL.createObjectURL(file)
                  global.open(url, '_blank', 'noopener,noreferrer')
                }}
              >
                <Text singleLine>Open in new tab</Text>
              </Dropdown.Item>
              <Dropdown.Item
                icon={<IconDownload />}
                onClick={() => {
                  if (!file) return
                  const url = URL.createObjectURL(file)
                  const link = document.createElement('a')
                  link.download = file.name
                  link.href = url
                  link.click()
                }}
              >
                <Text>Download</Text>
              </Dropdown.Item>
              <Dropdown.Item
                icon={<IconDelete />}
                onClick={() => {
                  setInternalStatus('initial')
                  setFile(null)
                  setInternalProgress(0)
                  onChange?.(undefined, setInternalProgress)
                  if (inputRef.current) {
                    inputRef.current.value = ''
                  }
                }}
              >
                <Text>Delete</Text>
              </Dropdown.Item>
            </Dropdown.Items>
          </Dropdown.Root>
        </Stack>
      )}
      {status === 'error' && (
        <styled.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <IconUpload />
          <Text singleLine style={{ marginLeft: '8px' }}>
            An error has occured
          </Text>
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
        <circle cx="10" cy="10" r="7" stroke="#04294421" strokeWidth="2" />
        <circle
          cx="10"
          cy="10"
          r="7"
          stroke="#634eca"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 - (5 + progress * 0.95)}
        />
      </svg>
      <Text singleLine>Uploading...</Text>
    </styled.div>
  )
}
