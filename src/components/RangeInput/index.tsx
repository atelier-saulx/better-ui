import React, { useState, useRef, useEffect, TouchEventHandler } from 'react'
import { Style, styled } from 'inlines'
import {
  useControllableState,
  Text,
  color,
  border,
  useWindowResize,
} from '../../index.js'

const CursorLine = styled('div', {
  width: 2,
  height: 16,
  background: 'transparent',
  position: 'absolute',
})

const CursorLabel = styled('div', {
  padding: '5px 8px',
  borderRadius: '4px',
  backgroundColor: color('background', 'inverted'),
  border: border(),
})

const CursorArrow = styled('div', {
  width: 16,
  borderRadius: 3,
  height: 16,
  background: color('background', 'inverted'),
  transform: 'rotateZ(-45deg)',
  position: 'absolute',
  marginRight: 'auto',
  marginLeft: 'auto',
  top: 24,
  zIndex: 0,
})

const RangeContainer = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  paddingTop: '20px',
  paddingBottom: '20px',
  paddingLeft: 8,
  cursor: 'pointer',
  overFlowX: 'hidden',
})

const SliderContainer = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
})

const LeftPart = styled('div', {
  //   fallback color for in tally edit modal
  backgroundColor: color('interactive', 'primary'),
  width: '20%',
  height: '6px',
  borderRadius: '4px',
  opacity: 1,
})

const Thumb = styled('div', {
  width: 16,
  height: 16,
  marginLeft: -9,
  backgroundColor: color('background', 'screen'),
  borderRadius: '8px',
  border: `5px solid ${color('interactive', 'primary')}`,
})

const Labels = styled('div', {
  marginTop: 4,
  display: 'flex',
  justifyContent: 'space-between',
})

type Item = { id: string; title: string; index: number }

type Items = Item[]

const preventBehavior = (e: Event) => {
  e.preventDefault()
}

const preventBodyScroll = () => {
  document.addEventListener('touchmove', preventBehavior, {
    passive: false,
  })
}

const getClosestIndex = (
  xPosArray: number[],
  newPercentage: number,
): number => {
  for (let i = 0; i < xPosArray.length; i++) {
    const val = xPosArray[i]
    const next = xPosArray[i + 1]
    if (newPercentage === val) {
      return i
    } else if (newPercentage < next && newPercentage > val) {
      const valDiff = Math.abs(val - newPercentage)
      const nextDiff = Math.abs(next - newPercentage)
      if (valDiff <= nextDiff) {
        return i
      } else {
        return i + 1
      }
    }
  }
  return 0
}

type RangeInputProps = {
  alwaysShowLabel?: boolean
  checksum?: number
  defaultValue?: number
  description?: string
  disabled?: boolean
  items?: Items
  label?: string
  max?: number
  min?: number
  onChange?: (value: number | string) => void
  onEndSliding?: () => void
  onStartSliding?: () => void
  prefix?: React.ReactNode
  showMinMaxNumber?: boolean
  step?: number
  style?: Style
  value?: number
}

export const RangeInput = (
  {
    alwaysShowLabel,
    checksum,
    description,
    disabled,
    items,
    label,
    max,
    min = 0,
    onChange,
    onEndSliding,
    onStartSliding,
    prefix,
    showMinMaxNumber,
    step = 1,
    style,
    value,
    defaultValue,
  }: RangeInputProps,
  ref,
) => {
  const [state = '', setState] = useControllableState({
    value,
    defaultValue,
    onChange,
    checksum,
  })

  const [containerWidth, setContainerWidth] = useState(0)
  const [isUpdating, setIsUpdating] = useState(false)
  const [index, setIndex] = useState(value || 0)
  const [percentageX, setPercentageX] = useState(0)

  // get some containers variables  // could make shorter
  const refRangeContainer = useRef(null)
  const refLeftPart = useRef(null)
  const refThumb = useRef(null)
  const refCursor = useRef(null)

  const windowSize = useWindowResize()

  // change on window resize
  useEffect(() => {
    setContainerWidth(
      refRangeContainer.current?.getBoundingClientRect().width || 0,
    )
  }, [windowSize])

  if (step && max === undefined) {
    max = 10
  }

  if (step !== 1 && !items) {
    items = []
    let counter = 0
    for (let i = min; i <= max; i += step) {
      items.push({ id: `blah${i}`, index: counter, title: i.toString() })
      counter++
    }
  }

  // split number of items
  const splitUpRange = items ? 100 / (items.length - 1) : max - min
  const xPosArray = []

  if (items) {
    for (let i = 0; i < items.length; i++) {
      xPosArray.push(items[i].index * splitUpRange)
    }
  }

  // make percentages
  const percentage = containerWidth / 100

  useEffect(() => {
    if (max) {
      if (value !== undefined && !isUpdating) {
        setPercentageX((value / max) * 100)
      }
    } else if (value !== undefined && !isUpdating) {
      setPercentageX(xPosArray[index])
    }
  }, [isUpdating, value, max])

  useEffect(() => {
    if (xPosArray.length) {
      setIndex(getClosestIndex(xPosArray, percentageX))
    }
  }, [xPosArray, percentageX])

  const setValue = (newPercentage: number, snap?: boolean) => {
    if (xPosArray.length) {
      if (snap) {
        refLeftPart.current.style.transition = 'width 0.4s ease'
        if (refCursor.current) {
          refCursor.current.style.transition =
            'transform 0.4s ease, opacity 0.2s'
        }
      }
      const index = getClosestIndex(xPosArray, newPercentage)
      setPercentageX(snap ? xPosArray[index] : newPercentage)
      if (value !== index) {
        if (items && step === 1) {
          onChange(items[index].title)
        } else if (items && step !== 1) {
          onChange(+items[index].title)
        } else {
          onChange(index)
        }
      }
    } else {
      setPercentageX(newPercentage)
      const newValue = (newPercentage * (max - min)) / 100 + min
      if (value !== newValue) {
        onChange(Math.trunc(newValue))
      }
    }
  }

  const moveHandler = (x: number) => {
    refRangeContainer.current.style.cursor = 'grabbing'
    refThumb.current.style.cursor = 'grabbing'
    refLeftPart.current.style.transition = 'width 0s'
    if (refCursor.current) {
      refCursor.current.style.transition = 'transform 0s, opacity 0.2s'
    }

    if (x > 0 && x < containerWidth) {
      refRangeContainer.current.style.cursor = 'pointer'

      setValue(Math.round(x / percentage))
    }
  }

  const mouseMoveHandler = (e) => {
    moveHandler(
      e.clientX - refRangeContainer.current?.getBoundingClientRect().left,
    )
  }

  const mouseUpHandler = () => {
    refRangeContainer.current.style.cursor = 'pointer'
    refThumb.current.style.cursor = 'pointer'
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('mouseup', mouseUpHandler)

    setContainerWidth(
      refRangeContainer.current?.getBoundingClientRect().width || 0,
    )

    setIsUpdating(false)
    if (onEndSliding) {
      onEndSliding()
    }
  }

  const onMouseDownHandler = () => {
    setIsUpdating(true)

    if (onStartSliding) {
      onStartSliding()
    }
    refRangeContainer.current.style.cursor = 'grabbing'
    window.addEventListener('mouseup', mouseUpHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
  }

  const onTouchStart = () => {
    preventBodyScroll()
    setIsUpdating(true)
    if (onStartSliding) {
      onStartSliding()
    }
  }

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    document.removeEventListener('touchmove', preventBehavior)
    setIsUpdating(false)
    if (onEndSliding) {
      onEndSliding()
    }
    onClickSnap(e)
  }

  // Touch functions
  const onTouchMoveHandler: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    moveHandler(
      e.touches[0].clientX -
        refRangeContainer.current?.getBoundingClientRect().left,
    )
  }

  const onClickSnap = (e) => {
    const correctedMouseXPos =
      e.clientX - refRangeContainer.current?.getBoundingClientRect().left
    if (correctedMouseXPos > 0 && correctedMouseXPos < containerWidth) {
      setValue(Math.round(correctedMouseXPos / percentage), true)
    }
  }

  return (
    <Wrapper label={label} disabled={disabled} style={style}>
      {label && (
        <Text style={{ marginBottom: description ? 0 : 8 }}>{label}</Text>
      )}
      {description && (
        <Text variant="body-light" style={{ marginBottom: 8 }}>
          {description}
        </Text>
      )}
      {/* PUT RANGE SLIDER  */}
      <styled.div
        style={{
          width: '100%',
          position: 'relative',
          marginTop: alwaysShowLabel ? 28 : 0,
        }}
      >
        {prefix && prefix}

        <RangeContainer
          onMouseDown={onMouseDownHandler}
          onClick={onClickSnap}
          ref={refRangeContainer}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMoveHandler}
          onTouchEnd={onTouchEnd}
        >
          <SliderContainer>
            <div
              style={{
                backgroundColor: color('background', 'primary2'),
                zIndex: -1,
                width: '100%',
                height: '6px',
                position: 'absolute',
                borderRadius: '4px',
              }}
            />
            <LeftPart
              ref={refLeftPart}
              style={{
                width: `${percentageX}%`,
                backgroundColor: color('interactive', 'primary'),
              }}
            />

            <Thumb
              ref={refThumb}
              style={{
                borderColor: color('interactive', 'primary'),
                position: 'relative',
              }}
            >
              <CursorLine style={{ right: 2, top: '-60px', display: 'flex' }}>
                <styled.div
                  style={{
                    opacity: alwaysShowLabel || isUpdating ? 1 : 0,
                    position: 'relative',
                    display: 'block',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <CursorLabel
                    style={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Text singleLine variant="body-bold" color="inverted">
                      {items
                        ? items[index]?.title
                        : Math.floor((percentageX * max) / 100)}
                    </Text>

                    <CursorArrow style={{ marginBottom: '-20px' }} />
                  </CursorLabel>
                </styled.div>
              </CursorLine>
            </Thumb>
          </SliderContainer>
        </RangeContainer>

        {items && showMinMaxNumber ? (
          <Labels>
            <Text variant="body-light">{items[0]?.title}</Text>
            <Text variant="body-light">{items[items.length - 1]?.title}</Text>
          </Labels>
        ) : showMinMaxNumber ? (
          <Labels>
            <Text variant="body-light">{min}</Text>
            <Text variant="body-light">{max}</Text>
          </Labels>
        ) : null}
      </styled.div>
    </Wrapper>
  )
}

const Wrapper = ({
  label,
  children,
  disabled,
  style,
}: {
  label?: string
  children: React.ReactNode
  disabled?: boolean
  style?: Style
}) => {
  if (label) {
    return (
      <styled.label
        style={
          label
            ? {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                opacity: disabled ? 0.6 : 1,
                cursor: disabled ? 'not-allowed' : 'default',
                pointerEvents: disabled ? 'none' : 'auto',
              }
            : undefined
        }
        onClick={(e) => (disabled ? e.preventDefault() : null)}
      >
        {children}
      </styled.label>
    )
  }

  return (
    <styled.div
      style={{
        width: '100%',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        ...style,
      }}
      onClick={(e) => (disabled ? e.preventDefault() : null)}
    >
      {children}
    </styled.div>
  )
}
