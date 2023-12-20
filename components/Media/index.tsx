import * as React from 'react'
import { styled, Style } from 'inlines'
import { BasedSchemaContentMediaType } from '@based/schema'
import { Video } from '../Video'
import { Folder, Paper } from '../Icons/extras'
import { textVariants } from '../Text'
import { color } from '../../utils/colors'

export type MediaProps = {
  variant?: 'cover' | 'contain'
  src?: string
  thumbnail?: string
  type?: BasedSchemaContentMediaType | 'directory'
  style?: Style
}

export function Media({
  variant = 'contain',
  src,
  thumbnail,
  type,
  style,
}: MediaProps) {
  const containerElem = React.useRef<HTMLDivElement | null>(null)
  const [size, setSize] = React.useState<'small' | 'medium' | 'large'>(null)

  const observer = React.useMemo(() => {
    return new ResizeObserver((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect()

      if (width < 100 || height < 100) {
        setSize('small')
        return
      }

      if (width < 400 || height < 400) {
        setSize('medium')
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
    [observer]
  )

  function renderContent() {
    if (!size) return null

    if (type.startsWith('image/')) {
      return (
        <img
          src={src}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
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
                objectFit: 'contain',
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
              objectFit: 'contain',
            }}
          />
        )
      }

      return <Video src={src} thumbnail={thumbnail} />
    }

    if (type === 'directory') {
      return (
        <div
          style={{
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

    return (
      <div
        style={{
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
            height: '60%',
            width: '60%',
            maxHeight: 128,
            maxWidth: 128,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...textVariants.bodyStrong,
            color: color('interactive', 'primary'),
            textTransform: 'uppercase',
            fontSize: size === 'small' ? 8 : size === 'medium' ? 14 : 24,
          }}
        >
          {type.split('/')[1] ?? src.split('.').pop()}
        </div>
      </div>
    )
  }

  return (
    <styled.div
      style={{ width: '100%', height: '100%', ...style }}
      ref={containerRef}
    >
      {renderContent()}
    </styled.div>
  )
}
