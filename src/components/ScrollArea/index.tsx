import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../utils/colors.js'
import * as RxScrollArea from '@radix-ui/react-scroll-area'

export type ScrollAreaProps = {
  children: React.ReactNode
  style?: Style
  variant?: 'primary' | 'neutral' | 'informative' | 'warning' | 'error'
  display?: 'hover' | 'always'
  shape?: 'square' | 'round'
}

const StyledThumb = styled(RxScrollArea.Thumb, {
  flex: 1,
  position: 'relative',
})

const StyledScrollbar = styled(RxScrollArea.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  padding: 2,
  background: 'transparent',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: '44px',
    minHeight: '44px',
  },
})

export const ScrollArea = ({
  children,
  variant = 'primary',
  display = 'hover',
  shape,
  style,
}: ScrollAreaProps) => {
  const THUMB_COLOR =
    variant === 'neutral'
      ? getColor('background', 'inverted')
      : variant === 'informative'
      ? getColor('semantic-background', 'informative')
      : variant === 'warning'
      ? getColor('semantic-background', 'warning')
      : variant === 'error'
      ? getColor('semantic-background', 'error')
      : 'var(--border-default)'

  return (
    <RxScrollArea.Root type={display} style={{ width: '100%' }}>
      <RxScrollArea.Viewport
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          ...style,
        }}
      >
        {children}
      </RxScrollArea.Viewport>
      <StyledScrollbar orientation="vertical" style={{ width: 10 }}>
        <StyledThumb
          style={{
            borderRadius: shape === 'square' ? 0 : 5,
            background: THUMB_COLOR,
          }}
        />
      </StyledScrollbar>
      <StyledScrollbar
        orientation="horizontal"
        style={{ flexDirection: 'column', height: 10 }}
      >
        <StyledThumb
          style={{
            borderRadius: shape === 'square' ? 0 : 5,
            background: THUMB_COLOR,
          }}
        />
      </StyledScrollbar>
      <RxScrollArea.Corner />
    </RxScrollArea.Root>
  )
}
