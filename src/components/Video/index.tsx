import * as React from 'react'
import Hls from 'hls.js'
import { textVariants } from '~'
import { styled } from 'inlines'

export type VideoProps = {
  thumbnail?: string
  src: string
}

export function Video({ src, thumbnail }: VideoProps) {
  const [playing, setPlaying] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [percentage, setPercentage] = React.useState(0)
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const progressBarRef = React.useRef<HTMLDivElement | null>(null)
  const shouldRestartVideoAfterDragEnd = React.useRef(false)
  const [mouseDown, setMouseDown] = React.useState(false)

  function handleMouseMove(e: MouseEvent) {
    if (!progressBarRef.current) return

    const { left, width } = progressBarRef.current.getBoundingClientRect()
    setPercentage(Math.min(1, Math.max(0, (e.clientX - left) / width)))
  }

  function handleMouseUp(e: MouseEvent) {
    if (!videoRef.current || !progressBarRef.current) return

    const { left, width } = progressBarRef.current.getBoundingClientRect()
    const p = Math.min(1, Math.max(0, (e.clientX - left) / width))
    setPercentage(p)

    videoRef.current.currentTime = p * videoRef.current.duration
    if (shouldRestartVideoAfterDragEnd.current) {
      videoRef.current.play()
    }
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    setMouseDown(false)
  }

  React.useEffect(() => {
    if (!videoRef.current) return

    if (src.split('.').pop() === 'm3u8') {
      if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src
        // @ts-ignore
      } else if (Hls.isSupported()) {
        // @ts-ignore
        var hls = new Hls()
        hls.loadSource(src)
        hls.attachMedia(videoRef.current)
      }
    } else {
      videoRef.current.src = src
    }
  }, [src])

  return (
    <styled.div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        cursor: 'pointer',
        ...(mouseDown && {
          '& .dimmer': {
            display: 'flex !important',
          },
        }),
        '&:hover .dimmer': {
          display: 'flex !important',
        },
      }}
    >
      <video
        style={{
          display: 'block',
          verticalAlign: 'middle',
          height: '100%',
          width: '100%',
          objectFit: 'contain',
        }}
        ref={videoRef}
        poster={thumbnail}
        preload="metadata"
        loop={false}
        onPlay={() => {
          setPlaying(true)
        }}
        onPause={() => {
          setPlaying(false)
        }}
        onTimeUpdate={(e) => {
          const { currentTime, duration } = e.target as HTMLVideoElement
          setPercentage(currentTime / duration)
        }}
        onDurationChange={(e) => {
          const { duration } = e.target as HTMLVideoElement
          setDuration(duration)
        }}
        onClick={() => {
          if (!videoRef.current) return

          if (videoRef.current.ended) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
            return
          }

          if (videoRef.current.paused) {
            videoRef.current.play()
          } else {
            videoRef.current.pause()
          }
        }}
      />
      <div
        className="dimmer"
        style={{
          pointerEvents: 'none',
          display: 'none',
          background: '#00000066',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {playing ? (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="6" width="6" height="28" rx="3" fill="white" />
            <rect x="21" y="6" width="6" height="28" rx="3" fill="white" />
          </svg>
        ) : (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.7882 6.17965C11.2737 5.91792 11.8636 5.94373 12.3244 6.24688L31.3244 18.7469C31.7461 19.0243 32 19.4952 32 20C32 20.5048 31.7461 20.9757 31.3244 21.2531L12.3244 33.7531C11.8636 34.0563 11.2737 34.0821 10.7882 33.8204C10.3027 33.5586 10 33.0516 10 32.5V7.5C10 6.94845 10.3027 6.44139 10.7882 6.17965Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 12,
          bottom: 12,
          color: '#ffffff',
          ...textVariants.bodyBold,
        }}
      >
        {formatSeconds(percentage * duration) + ' / ' + formatSeconds(duration)}
      </div>
      <styled.div
        ref={progressBarRef}
        style={{
          background: '#ffffff33',
          height: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          userSelect: 'none',
          ...(mouseDown && {
            '& .dot': {
              display: 'block !important',
            },
          }),
          '&:hover .dot': {
            display: 'block !important',
          },
        }}
        onMouseDown={() => {
          if (!videoRef.current) return

          setMouseDown(true)
          shouldRestartVideoAfterDragEnd.current = !videoRef.current.paused
          videoRef.current.pause()

          window.addEventListener('mousemove', handleMouseMove)
          window.addEventListener('mouseup', handleMouseUp)
        }}
      >
        <div
          style={{
            height: 8,
            background: '#917EF1',
            width: `${percentage * 100}%`,
          }}
        />
        <div
          className="dot"
          style={{
            display: 'none',
            position: 'absolute',
            height: 16,
            width: 16,
            background: '#917EF1',
            top: -4,
            borderRadius: 9999,
            left: `calc(${percentage * 100}% - 8px)`,
          }}
        />
      </styled.div>
    </styled.div>
  )
}

function formatSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  let s = remainingSeconds.toString().padStart(2, '0')

  if (hours !== 0) {
    s = hours.toString() + ':' + minutes.toString().padStart(2, '0') + ':' + s
  } else {
    s = minutes.toString() + ':' + s
  }

  return s
}
