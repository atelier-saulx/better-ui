import * as React from 'react'
import { styled, Style } from 'inlines'
import { BasedSchemaContentMediaType } from '@based/schema'
import {
  Video,
  textVariants,
  color,
  getMimeType,
  IconAttachment,
} from '../../index.js'
import { Folder, Paper } from '../Icons/extras.js'

export type MediaProps = {
  src?: string
  thumbnail?: string
  type?: BasedSchemaContentMediaType | 'directory'
  style?: Style
  variant?: 'cover' | 'contain'
  // add video option no controls auto play
}

const MediaInner = ({
  size,
  src,
  type = '*/*',
  thumbnail,
  variant,
}: {
  size?: 'small' | 'regular' | 'large'
  src?: string
  type?: string
  thumbnail?: string
  variant: 'cover' | 'contain'
}) => {
  if (!size) return null

  if (type.startsWith('image/')) {
    return (
      <>
        <img
          key={src}
          src={src}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: variant,
          }}
        />
      </>
    )
  }

  if (type.startsWith('video/')) {
    // if size is small video is not interactive, we just show a thumbnail
    // and if there is no thumbnail then as a best effort
    // we render a native video element without controls which will render the first frame of the vid
    if (size === 'small') {
      if (thumbnail) {
        return (
          <img
            src={thumbnail}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: variant,
            }}
          />
        )
      }
      return (
        <video
          src={src}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: variant,
          }}
        />
      )
    }

    return <Video src={src} thumbnail={thumbnail} />
  }

  const padding = size === 'small' ? 8 : 16

  if (type === 'directory') {
    return (
      <div
        style={{
          padding,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Folder
          style={{
            height: '60%',
            width: '60%',
            maxHeight: 128,
            maxWidth: 128,
          }}
        />
      </div>
    )
  }

  let fileText =
    type && type !== '*/*'
      ? type?.split('/')[1]
      : src?.split('.').pop() ?? (
          <IconAttachment
            style={{
              width: '15%',
              height: '15%',
              maxWidth: 32,
              maxHeight: 32,
              minWidth: 10,
              minHeight: 10,
              opacity: 0.8,
              color: color('semantic-color', 'informative-muted'),
            }}
          />
        )

  if (typeof fileText === 'string' && fileText.length > 4) {
    fileText = fileText.slice(-4)
  }

  return (
    <styled.div
      style={{
        padding,
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Paper
        style={{
          height: '50%',
          width: '50%',
          maxHeight: 128,
          maxWidth: 128,
        }}
      />
      <styled.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...textVariants['body-strong'],
          color: color('interactive', 'primary'),
          textTransform: 'uppercase',
          fontSize: size === 'small' ? 7 : size === 'regular' ? 14 : 24,
        }}
      >
        {fileText}
      </styled.div>
    </styled.div>
  )
}

export function Media({
  variant = 'contain',
  src,
  thumbnail,
  type,
  style,
}: MediaProps) {
  const containerElem = React.useRef<HTMLDivElement | null>(null)
  const [size, setSize] = React.useState<'small' | 'regular' | 'large'>(null)

  if ((!type || type === '*/*') && src) {
    type = getMimeType(src)
  }

  const observer = React.useMemo(() => {
    return new ResizeObserver((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect()

      if (width < 100 || height < 100) {
        setSize('small')
        return
      }

      if (width < 400 || height < 400) {
        setSize('regular')
        return
      }

      setSize('large')
    })
  }, [])

  const containerRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (containerElem.current === null) {
        containerElem.current = node
        observer.observe(node)
      } else {
        observer.unobserve(containerElem.current)
        containerElem.current = null
      }
    },
    [observer],
  )

  return (
    <styled.div
      style={{
        width: '100%',
        height: '100%',
        ...style,
        overflow: 'hidden',
      }}
      ref={containerRef}
    >
      <MediaInner
        variant={variant}
        src={src}
        type={type}
        size={size}
        thumbnail={thumbnail}
      />
    </styled.div>
  )
}
