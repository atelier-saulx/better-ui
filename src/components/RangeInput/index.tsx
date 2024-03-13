import React, { useState, useRef, useEffect, TouchEventHandler } from 'react'
import { Style, styled } from 'inlines'
import {
  useControllableState,
  Text,
  color,
  border,
  useWindowResize,
} from '../../index.js'

type RangeInputProps = {
  placeholder?: string
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  checksum?: number
  formName?: string
  label?: string
  step?: number
  min?: number
  max?: number
  variant?: 'regular' | 'small'
  error?: boolean
  autoFocus?: boolean
  description?: string
  disabled?: boolean
  style?: Style
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onStartSliding?: () => void
  onEndSliding?: () => void
  items?: Items
  alwaysShowLabel?: boolean
  showMinMaxNumber?: boolean
}

const Cursor = styled('div', {
  alignItems: 'flex-start',
  right: 0,
  top: -30,
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'absolute',
  left: -3,
  marginBottom: 4,
})

const CursorLabel = styled('div', {
  padding: '5px 8px',
  color: color('content', 'inverted'),
  transform: 'translate3d(-50%,0px,0px)',
  borderRadius: '4px',
  backgroundColor: color('background', 'inverted'),
  border: border(),
})

const CursorArrowContainer = styled('div', {
  paddingLeft: 2,
  width: 12,
  transform: 'translate3d(-50%,0px,0px)',
  position: 'relative',
})

const CursorArrow = styled('div', {
  width: 16,
  borderRadius: 3,
  height: 16,
  left: -2,
  right: 0,
  background: color('background', 'inverted'),
  transform: 'rotateZ(-45deg) translateX(-50%)',
  position: 'absolute',
  bottom: '-30px',
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
  transform: 'translate3d(0px,0px,0px)',
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

export const RangeInput = (
  {
    placeholder,
    value,
    defaultValue: defaultValueProp,
    onChange,
    checksum,
    formName,
    label,
    step = 1,
    min = 0,
    max,
    variant = 'regular',
    error,
    autoFocus,
    description,
    disabled,
    style,
    prefix,
    suffix,
    items,
    alwaysShowLabel,
    onStartSliding,
    onEndSliding,
    showMinMaxNumber,
  }: RangeInputProps,
  ref,
) => {
  // const [value = '', setValue] = useControllableState<number>({
  //   value: valueProp,
  //   defaultValue: defaultValueProp,
  //   onChange,
  //   checksum,
  // })

  const [containerWidth, setContainerWidth] = useState(0)
  //  const [leftContainerSide, setLeftContainerSide] = useState(0)
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
        onChange(index)
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
      {label && <Text style={{ marginBottom: 8 }}>{label}</Text>}

      {/* PUT RANGE SLIDER  */}
      <styled.div
        style={{
          width: '100%',
          position: 'relative',
          marginTop: alwaysShowLabel ? 48 : 0,
        }}
      >
        {prefix && prefix}
        <Cursor
          ref={refCursor}
          style={{
            transform: `translate3d(${percentageX}%,0,0)`,
            opacity: alwaysShowLabel || isUpdating ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        >
          <CursorArrowContainer
            style={{ transform: `translate3d(-${percentageX}%,0,0)` }}
          >
            <CursorArrow />
          </CursorArrowContainer>
          <CursorLabel>
            {items
              ? // (
                //   <Labels
                //     index={index}
                //     value={items ? items[index] : (percentageX * max) / 100}
                //     max={max}
                //     min={min}
                //   />
                // ) : items ?
                items[index]?.title
              : Math.floor((percentageX * max) / 100)}
            {/* {Math.floor((percentageX * max) / 100)} */}
          </CursorLabel>
        </Cursor>

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
                backgroundColor: color('background', 'screen'),
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
              style={{ borderColor: color('interactive', 'primary') }}
            />
          </SliderContainer>
        </RangeContainer>

        {items && showMinMaxNumber ? (
          <Labels>
            <Text>{items[0]?.title}</Text>
            <Text>{items[items.length - 1]?.title}</Text>
          </Labels>
        ) : null}
      </styled.div>
    </Wrapper>
  )
}
