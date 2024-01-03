import * as React from 'react'
import { styled, Style } from 'inlines'
import { color as getColor } from '../../index.js'

export type ScrollAreaProps = {
  children: React.ReactNode
  style?: Style
  variant?: 'primary' | 'neutral' | 'informative' | 'warning' | 'error'
  display?: 'hover' | 'always'
  size?: 'large' | 'medium' | 'small'
  shape?: 'square' | 'round'
}

export const ScrollArea = React.forwardRef<HTMLElement, ScrollAreaProps>(
  ({ children, style }, ref) => {
    const [showScrollbar, setShowScrollbar] = React.useState(false)

    console.log(children)

    const scrollAreaRef = React.useRef<HTMLElement>()

    console.log(scrollAreaRef)

    return (
      <styled.div
        ref={ref}
        style={{
          overflowX: 'overlay',
          overflowY: 'overlay',
          boxSizing: 'border-box',
          position: 'relative',
          '&::-webkit-scrollbar': {
            // display: 'none',
          },
          ...style,
        }}
        onMouseEnter={(e) => {
          console.log(scrollAreaRef.current?.clientHeight)
          setShowScrollbar(true)
        }}
        onMouseLeave={(e) => {
          setShowScrollbar(false)
        }}
        onScroll={(e) => {
          console.log(e)
        }}
      >
        {showScrollbar && (
          <styled.div
            style={{
              position: 'absolute',
              width: 12,
              background: 'rgba(255,0,255,0.33)',
              border: '1px solid red',
              top: 0,
              right: 0,
              bottom: 0,
              height: scrollAreaRef.current
                ? scrollAreaRef.current?.clientHeight
                : '100%',
            }}
          ></styled.div>
        )}
        <styled.div ref={scrollAreaRef}>{children}</styled.div>
      </styled.div>
    )
  }
)

// export const ScrollArea = React.forwardRef<HTMLElement, ScrollAreaProps>(
//   (
//     {
//       children,
//       style,
//       variant = 'primary',
//       display = 'always',
//       size = 'medium',
//       shape = 'round',
//     },
//     ref
//   ) => {
//     const SCROLLBAR_WIDTH_HEIGHT =
//       size === 'large' ? 10 : size === 'small' ? 4 : 7

//     const THUMB_WIDTH = 32
//     const THUMB_HEIGHT = 32
//     const THUMB_RADIUS = shape === 'round' ? SCROLLBAR_WIDTH_HEIGHT / 2 : 0
//     const THUMB_COLOR =
//       variant === 'neutral'
//         ? getColor('background', 'inverted')
//         : variant === 'informative'
//         ? getColor('semantic-background', 'informative')
//         : variant === 'warning'
//         ? getColor('semantic-background', 'warning')
//         : variant === 'error'
//         ? getColor('semantic-background', 'error')
//         : 'var(--border-default)'

//     return React.createElement(styled['div'], {
//       children,
//       ref,
//       style: {
//         scrollbarGutter: 'stable',
//         overflowY: 'overlay',
//         overflowX: 'overlay',
//         scrollbarColor: `${THUMB_COLOR} transparent`,
//         // scrollbarWidth: 'none',
//         '&::-webkit-scrollbar:vertical': {
//           width: `${SCROLLBAR_WIDTH_HEIGHT}px`,
//         },
//         '&::-webkit-scrollbar:horizontal': {
//           height: `${SCROLLBAR_WIDTH_HEIGHT}px`,
//         },
//         '&::-webkit-scrollbar': {
//           visibilty: display === 'hover' ? 'hidden !important' : 'visible',
//           scale: 'none',
//         },
//         '&::-webkit-scrollbar-thumb': {
//           backgroundColor: display === 'hover' ? 'transparent' : THUMB_COLOR,
//           borderRadius: `${THUMB_RADIUS}px`,
//         },

//         '&:hover': {
//           '&::-webkit-scrollbar': {
//             visibility: 'visible',
//           },
//           '&::-webkit-scrollbar-thumb': {
//             backgroundColor: THUMB_COLOR,
//             borderRadius: `${THUMB_RADIUS}px`,
//           },
//           '&::-webkit-scrollbar-thumb:vertical': {
//             borderRight: `2px solid ${THUMB_COLOR} transparent`,
//             minHeight: `${THUMB_HEIGHT}px`,
//           },
//           '&::-webkit-scrollbar-thumb:horizontal': {
//             borderBottom: `2px solid ${THUMB_COLOR} transparent`,
//             minWidth: `${THUMB_WIDTH}px`,
//           },
//         },
//         ...style,
//       },
//     })
//   }
// )
