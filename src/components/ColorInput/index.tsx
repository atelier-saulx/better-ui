import * as React from 'react'
import {
  useControllableState,
  border,
  borderRadius,
  color,
  boxShadow,
} from '../../index.js'
import * as Popover from '@radix-ui/react-popover'
import { styled, Style } from 'inlines'

export type ColorInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  label?: string
  variant?: 'regular' | 'small'
  error?: boolean
  style?: Style
}

// as per https://github.com/regexhq
const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
const rgbaRegex =
  /^rgba\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/

const hexRegex = /^#[a-f0-9]{6}\b$/i

export function ColorInput({
  label,
  variant = 'regular',
  error,
  value: valueProp,
  defaultValue: defaultValueProp,
  onChange,
  style,
}: ColorInputProps) {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange,
  })
  const [hue, setHue] = React.useState(0)
  const [alpha, setAlpha] = React.useState(1)
  const [position, setPosition] = React.useState<{
    x: number
    y: number
  } | null>(null)
  const [mouseDown, setMouseDown] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const positionDivRef = React.useRef<HTMLDivElement | null>(null)

  function handleMouseMove(event: MouseEvent) {
    if (!positionDivRef.current) return

    const { clientX, clientY } = event
    const { left, width, top, height } =
      positionDivRef.current.getBoundingClientRect()
    setPosition({
      x: Math.min(1, Math.max(0, (clientX - left) / width)),
      y: Math.min(1, Math.max(0, (clientY - top) / height)),
    })
  }

  function handleMouseUp() {
    setMouseDown(false)
  }

  React.useEffect(() => {
    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [mouseDown])

  React.useEffect(() => {
    if (!position || !inputRef.current) return

    const rgb = hslToRGB(hue, 100, 50)
      .map((v) => (v + (255 - v) * (1 - position.x)) * (1 - position.y))
      .map((v) => Math.round(v))

    setValue(`rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`)
    inputRef.current.value = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`
  }, [position, hue, alpha])

  return (
    <styled.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        '&[data-state="open"] > div': {
          border: '1px solid var(--interactive-primary) !important',
          boxShadow:
            '0 0 0 2px color-mix(in srgb, var(--interactive-primary) 20%, transparent) !important',
        },
        ...(error && {
          '&[data-state="open"] > div': {
            border: border('error'),
            boxShadow: boxShadow('error'),
          },
        }),
        ...style,
      }}
    >
      {label && (
        <styled.span
          style={{
            marginBottom: 8,
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
          }}
        >
          {label}
        </styled.span>
      )}
      <div style={{ position: 'relative' }}>
        <styled.input
          ref={inputRef}
          defaultValue={value}
          onChange={(e) => {
            const newRawValue = e.target.value

            if (rgbRegex.test(newRawValue)) {
              const newRGBA = rgbToRgba(newRawValue)
              setValue(newRGBA)
              inputRef.current.value = newRGBA
            } else if (rgbaRegex.test(newRawValue)) {
              setValue(newRawValue)
              inputRef.current.value = newRawValue
            } else if (hexRegex.test(newRawValue)) {
              const newRGBA = hexToRGBA(newRawValue)
              setValue(newRGBA)
              inputRef.current.value = newRGBA
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
            width: '100%',
            minHeight: variant === 'regular' ? 42 : 32,
            padding:
              variant === 'regular' ? '8px 12px 8px 44px' : '3px 10px 3px 34px',
            borderRadius:
              variant === 'regular'
                ? borderRadius('small')
                : borderRadius('tiny'),
            border: variant === 'small' ? '1px solid transparent' : border(),
            '&:hover': {
              border:
                variant === 'small' ? '1px solid transparent' : border('hover'),
            },
            '&:focus, &:focus:hover': {
              border: '1px solid var(--interactive-primary)',
              boxShadow: boxShadow('focus'),
            },
            ...(error && {
              border: border('error'),
              '&:hover': {
                border: border('error'),
              },
              '&:focus, &:focus:hover': {
                border: border('error'),
                boxShadow: boxShadow('error'),
              },
            }),
          }}
        />
        <Popover.Root>
          <Popover.Trigger asChild>
            <div>
              {value && (
                <div
                  style={{
                    top: variant === 'regular' ? 9 : 6,
                    left: variant === 'regular' ? 12 : 8,
                    position: 'absolute',
                    height: variant === 'regular' ? 24 : 20,
                    width: variant === 'regular' ? 24 : 20,
                    borderRadius: borderRadius('tiny'),
                    background:
                      'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=") left center',
                    backgroundPosition: '0 -1px',
                  }}
                />
              )}
              <div
                style={{
                  top: variant === 'regular' ? 9 : 6,
                  left: variant === 'regular' ? 12 : 8,
                  position: 'absolute',
                  height: variant === 'regular' ? 24 : 20,
                  width: variant === 'regular' ? 24 : 20,
                  borderRadius: borderRadius('tiny'),
                  background: value,
                  border: `1px solid rgba(4,41,68,.13)`,
                }}
              />
            </div>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              sideOffset={8}
              style={{
                background: color('background', 'screen'),
                maxHeight:
                  'calc(var(--radix-popover-content-available-height) - 8px)',
                width: 500,
                maxWidth:
                  'calc(var(--radix-popover-content-available-width) - 8px)',
                padding: 8,
                border: border(),
                borderRadius: borderRadius('small'),
                overflowY: 'auto',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: 200,
                  borderRadius: borderRadius('tiny'),
                }}
                ref={positionDivRef}
                onMouseDown={() => {
                  setMouseDown(true)
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: borderRadius('tiny'),
                    background: `hsl(${hue}, 100%, 50%)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: borderRadius('tiny'),
                    background:
                      'linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: borderRadius('tiny'),
                    background:
                      'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
                  }}
                />
                {position && (
                  <div
                    style={{
                      position: 'absolute',
                      left: `${position.x * 100}%`,
                      top: `${position.y * 100}%`,
                      transform: `translate3d(-50%,-50%,0)`,
                      width: 8,
                      height: 8,
                      border: '2px solid var(--background-screen)',
                      boxShadow:
                        '0px 0px 2px var(--content-primary), inset 0px 0px 2px var(--content-primary)',
                      borderRadius: 9999,
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  marginTop: 8,
                  position: 'relative',
                  height: 24,
                  width: '100%',
                  borderRadius: borderRadius('tiny'),
                  background:
                    'linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)',
                }}
              >
                <input
                  type="range"
                  style={{ width: '100%', height: '100%', opacity: 0 }}
                  value={hue}
                  max="360"
                  onChange={(e) => {
                    setHue(parseInt(e.target.value))
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: 10,
                    top: 2,
                    left: `max(2px, calc(${(hue / 360) * 100}% - 2px))`,
                    transform: `translate3d(-${(hue / 360) * 100}%,0,0)`,
                    height: 20,
                    backgroundColor: color('background', 'screen'),
                    boxShadow: '0px 0px 1px rgba(0,0,0,0.4)',
                    borderRadius: 2,
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 8,
                  height: 24,
                  width: '100%',
                  borderRadius: borderRadius('tiny'),
                  background:
                    'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAADFJREFUOE9jZGBgEGHAD97gk2YcNYBhmIQBgWSAP52AwoAQwJvQRg1gACckQoC2gQgAIF8IscwEtKYAAAAASUVORK5CYII=") left center',
                  backgroundPosition: '0 -8px',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: borderRadius('tiny'),
                    background: `linear-gradient(to right, transparent, hsl(${hue}, 100%, 50%) 100%)`,
                  }}
                >
                  <input
                    type="range"
                    style={{ width: '100%', height: '100%', opacity: 0 }}
                    value={alpha}
                    step="0.01"
                    max="1"
                    onChange={(e) => {
                      setAlpha(parseFloat(e.target.value))
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      width: 10,
                      top: 2,
                      left: `max(2px, calc(${alpha * 100}% - 2px))`,
                      transform: `translate3d(-${alpha * 100}%,0,0)`,
                      height: 20,
                      backgroundColor: color('background', 'screen'),
                      boxShadow: '0px 0px 1px rgba(0,0,0,0.4)',
                      borderRadius: 2,
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </styled.div>
  )
}

const hslToRGB = (h: number, s: number, l: number) => {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}

function hexToRGBA(hex, alpha = 1) {
  var r = parseInt(hex.slice(1, 3), 16)
  var g = parseInt(hex.slice(3, 5), 16)
  var b = parseInt(hex.slice(5, 7), 16)

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
}

function rgbToRgba(rgb, alpha = 1) {
  var rgbValues = rgb.slice(4, -1).split(',')
  var r = parseInt(rgbValues[0])
  var g = parseInt(rgbValues[1])
  var b = parseInt(rgbValues[2])

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
}
