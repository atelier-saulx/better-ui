import * as React from 'react'
import { Style, styled } from 'inlines'
import { color as getColor } from '../../utils/colors.js'
import 'overlayscrollbars/overlayscrollbars.css'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import './bars.css'

export type ScrollAreaProps = {
  children: React.ReactNode
  style?: Style
  variant?: 'primary' | 'neutral' | 'informative' | 'warning' | 'error'
  display?: 'hover' | 'always'
  shape?: 'square' | 'round'
  onScroll?: React.UIEventHandler<HTMLDivElement>
}

// const StyledThumb = styled(RxScrollArea.Thumb, {
//   flex: 1,
//   position: 'relative',
// })

// const StyledScrollbar = styled(RxScrollArea.Scrollbar, {
//   display: 'flex',
//   userSelect: 'none',
//   touchAction: 'none',
//   padding: 2,
//   background: 'transparent',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '100%',
//     height: '100%',
//     minWidth: '44px',
//     minHeight: '44px',
//   },
// })

export const ScrollArea = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      display = 'hover',
      shape,
      style,
      onScroll,
    }: ScrollAreaProps,
    ref,
  ) => {
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
      <styled.div
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '100%',
        }}
        ref={ref}
      >
        <OverlayScrollbarsComponent
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            overflow: 'auto',

            borderRadius: 'inherit',
            ...style,
          }}
          options={{
            scrollbars: {
              theme: 'os-theme-dark',
            },
          }}
          defer
          events={{
            scroll: (a, e) => {
              if (onScroll) {
                // @ts-ignore
                onScroll(e)
              }
            },
          }}
        >
          {children}
        </OverlayScrollbarsComponent>
      </styled.div>
    )
  },
)
